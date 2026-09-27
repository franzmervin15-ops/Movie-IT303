import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { searchTitles } from '../../services/itunes';
import { addToWatchlist, getWatchlist, removeFromWatchlist } from '../../services/watchlist';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [mediaFilter, setMediaFilter] = useState('all');
  const [savedIds, setSavedIds] = useState([]);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      getWatchlist().then((list) => {
        if (!cancelled) setSavedIds(list.map((item) => item.id));
      });
      return () => {
        cancelled = true;
      };
    }, [])
  );

  // Debounced search whenever the query changes. No trending/default list —
  // the iTunes Search API doesn't expose one — so we just show a prompt
  // until the user types something.
  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      setHasSearched(false);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    const timeoutId = setTimeout(async () => {
      try {
        const data = await searchTitles(query.trim());
        if (!cancelled) {
          setResults(data);
          setHasSearched(true);
        }
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 400);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [query]);

  async function toggleSaved(item) {
    const isSaved = savedIds.includes(item.id);
    const updated = isSaved
      ? await removeFromWatchlist(item.id)
      : await addToWatchlist(item);
    setSavedIds(updated.map((savedItem) => savedItem.id));
  }

  const visibleResults = results.filter(
    (item) => mediaFilter === 'all' || item.mediaType === mediaFilter
  );

  const renderItem = useCallback(({ item }) => {
    const year = (item.releaseDate || '').slice(0, 4);
    const isSaved = savedIds.includes(item.id);

    return (
      <View style={styles.card}>
        <Pressable
          style={styles.cardMain}
          accessibilityRole="button"
          accessibilityLabel={`${item.title}, ${item.mediaType === 'tv' ? 'TV series' : 'film'}${year ? `, ${year}` : ''}`}
          onPress={() => router.push(`/movie/${item.id}?mediaType=${item.mediaType}`)}
        >
          {item.artwork ? (
            <Image source={{ uri: item.artwork }} style={styles.poster} />
          ) : (
            <View style={[styles.poster, styles.posterPlaceholder]}>
              <Text style={styles.posterPlaceholderText}>No artwork</Text>
            </View>
          )}
          <View style={styles.rowText}>
            <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>
              {item.mediaType === 'tv' ? 'Series' : 'Film'}{year ? ` · ${year}` : ''}
            </Text>
          </View>
        </Pressable>
        <Pressable
          style={[styles.saveButton, isSaved && styles.saveButtonActive]}
          accessibilityRole="button"
          accessibilityLabel={isSaved ? `Remove ${item.title} from watchlist` : `Add ${item.title} to watchlist`}
          accessibilityState={{ checked: isSaved }}
          onPress={() => toggleSaved(item)}
        >
          <Text style={[styles.saveButtonText, isSaved && styles.saveButtonTextActive]}>
            {isSaved ? 'Saved' : '+ Add to list'}
          </Text>
        </Pressable>
      </View>
    );
  }, [savedIds]);

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>MOVIE EXPLORER</Text>
          <Text style={styles.heading}>Find something to watch.</Text>
          <Text style={styles.intro}>Search films and television by title.</Text>
        </View>

        <View style={styles.searchBox}>
          <TextInput
            style={styles.input}
            placeholder="Search movies and series"
            placeholderTextColor="#82919C"
            value={query}
            onChangeText={setQuery}
            autoCorrect={false}
            clearButtonMode="while-editing"
            returnKeyType="search"
            accessibilityLabel="Search films and television"
          />
          {query.length > 0 && (
            <Pressable
              style={styles.clearButton}
              accessibilityRole="button"
              accessibilityLabel="Clear search"
              onPress={() => setQuery('')}
            >
              <Text style={styles.clearButtonText}>Clear</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.filters} accessibilityRole="tablist">
          {[
            { key: 'all', label: 'All' },
            { key: 'movie', label: 'Films' },
            { key: 'tv', label: 'TV' },
          ].map((filter) => {
            const active = mediaFilter === filter.key;
            return (
              <Pressable
                key={filter.key}
                style={[styles.filterButton, active && styles.filterButtonActive]}
                accessibilityRole="tab"
                accessibilityState={{ selected: active }}
                onPress={() => setMediaFilter(filter.key)}
              >
                <Text style={[styles.filterText, active && styles.filterTextActive]}>
                  {filter.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {loading && <ActivityIndicator color="#20D5E7" style={styles.spinner} />}
        {error && <Text style={styles.error}>{error}</Text>}

        {!loading && !error && !hasSearched && (
          <Text style={styles.prompt}>Start with a title you already love.</Text>
        )}
        {!loading && !error && hasSearched && visibleResults.length === 0 && (
          <Text style={styles.empty}>
            {results.length === 0 ? 'No titles found. Try another search.' : 'No titles match this filter.'}
          </Text>
        )}

        <FlatList
          style={styles.results}
          contentContainerStyle={styles.resultsContent}
          data={visibleResults}
          numColumns={2}
          keyExtractor={(item) => `${item.mediaType}-${item.id}`}
          renderItem={renderItem}
          columnWrapperStyle={styles.resultColumns}
          ItemSeparatorComponent={() => <View style={styles.resultGap} />}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#090D12' },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: 640,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  header: { paddingTop: 34, paddingBottom: 22 },
  eyebrow: { color: '#26D6E7', fontSize: 11, fontWeight: '700', letterSpacing: 1.5 },
  heading: {
    color: '#F1F6F7',
    fontFamily: 'Georgia',
    fontSize: 30,
    lineHeight: 36,
    marginTop: 8,
  },
  intro: { color: '#A1AFB9', fontSize: 15, lineHeight: 22, marginTop: 6 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#151E28',
    borderColor: '#263540',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    minHeight: 48,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 16,
    color: '#F1F6F7',
  },
  clearButton: { paddingHorizontal: 14, paddingVertical: 12 },
  clearButtonText: { color: '#20D5E7', fontSize: 13, fontWeight: '600' },
  filters: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  filterButton: {
    minWidth: 58,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: '#151E28',
    borderWidth: 1,
    borderColor: '#263540',
  },
  filterButtonActive: { backgroundColor: '#20D5E7', borderColor: '#20D5E7' },
  filterText: { color: '#A1AFB9', fontSize: 13, fontWeight: '600' },
  filterTextActive: { color: '#071014' },
  spinner: { marginVertical: 18 },
  error: { color: '#FF8C85', marginVertical: 12, fontSize: 14 },
  prompt: { color: '#82919C', marginTop: 16, fontSize: 14 },
  empty: { color: '#A1AFB9', marginTop: 16, fontSize: 14 },
  results: { flex: 1 },
  resultsContent: { paddingBottom: 24 },
  resultColumns: { justifyContent: 'space-between', gap: 14 },
  resultGap: { height: 14 },
  card: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#141C25',
    borderColor: '#202C36',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
  cardMain: { flex: 1 },
  poster: { width: '100%', height: 220, borderRadius: 5, backgroundColor: '#202B35' },
  posterPlaceholder: { justifyContent: 'center', alignItems: 'center', padding: 4 },
  posterPlaceholderText: { fontSize: 10, color: '#82919C', textAlign: 'center' },
  rowText: { paddingTop: 10, paddingBottom: 7 },
  title: { color: '#F1F6F7', fontSize: 15, fontWeight: '600', lineHeight: 20 },
  subtitle: { fontSize: 12, color: '#82919C', marginTop: 5 },
  saveButton: {
    minHeight: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#2B4650',
    backgroundColor: '#172630',
  },
  saveButtonActive: { backgroundColor: '#20D5E7', borderColor: '#20D5E7' },
  saveButtonText: { color: '#5EE3ED', fontSize: 12, fontWeight: '700' },
  saveButtonTextActive: { color: '#071014' },
});