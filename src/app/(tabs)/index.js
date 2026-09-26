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
import { router } from 'expo-router';
import { searchTitles } from '../../services/itunes';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

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

  const renderItem = useCallback(({ item }) => {
    const year = (item.releaseDate || '').slice(0, 4);

    return (
      <Pressable
        style={styles.row}
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
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>
            {item.mediaType === 'tv' ? 'TV series' : 'Film'}{year ? ` · ${year}` : ''}
          </Text>
        </View>
      </Pressable>
    );
  }, []);

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
            placeholder="Search by title"
            placeholderTextColor="#858780"
            value={query}
            onChangeText={setQuery}
            autoCorrect={false}
            clearButtonMode="while-editing"
            returnKeyType="search"
            accessibilityLabel="Search films and television"
          />
        </View>

        {loading && <ActivityIndicator color="#A65E4D" style={styles.spinner} />}
        {error && <Text style={styles.error}>{error}</Text>}

        {!loading && !error && !hasSearched && (
          <Text style={styles.prompt}>Try a title you already love.</Text>
        )}
        {!loading && !error && hasSearched && results.length === 0 && (
          <Text style={styles.empty}>No titles found. Try another search.</Text>
        )}

        <FlatList
          style={styles.results}
          contentContainerStyle={styles.resultsContent}
          data={results}
          keyExtractor={(item) => `${item.mediaType}-${item.id}`}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F6F5F1' },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
    paddingHorizontal: 22,
  },
  header: { paddingTop: 30, paddingBottom: 22 },
  eyebrow: { color: '#A65E4D', fontSize: 11, fontWeight: '700', letterSpacing: 1.2 },
  heading: {
    color: '#252A26',
    fontFamily: 'Georgia',
    fontSize: 30,
    lineHeight: 36,
    marginTop: 8,
  },
  intro: { color: '#686C66', fontSize: 15, lineHeight: 22, marginTop: 6 },
  searchBox: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E1DA',
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 12,
  },
  input: {
    minHeight: 48,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 16,
    color: '#252A26',
  },
  spinner: { marginVertical: 18 },
  error: { color: '#A13E35', marginVertical: 12, fontSize: 14 },
  prompt: { color: '#777A74', marginTop: 16, fontSize: 14 },
  empty: { color: '#686C66', marginTop: 16, fontSize: 14 },
  results: { flex: 1 },
  resultsContent: { paddingBottom: 20 },
  separator: { height: 1, backgroundColor: '#E4E2DC' },
  row: { flexDirection: 'row', paddingVertical: 12, alignItems: 'center' },
  poster: { width: 62, height: 90, borderRadius: 4, backgroundColor: '#E8E7E1' },
  posterPlaceholder: { justifyContent: 'center', alignItems: 'center', padding: 4 },
  posterPlaceholderText: { fontSize: 10, color: '#777A74', textAlign: 'center' },
  rowText: { marginLeft: 14, flex: 1 },
  title: { color: '#252A26', fontSize: 16, fontWeight: '600', lineHeight: 21 },
  subtitle: { fontSize: 13, color: '#777A74', marginTop: 5 },
});