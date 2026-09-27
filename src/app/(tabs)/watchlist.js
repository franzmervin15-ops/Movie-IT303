import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Image, Pressable, StyleSheet } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { getWatchlist, removeFromWatchlist } from '../../services/watchlist';

export default function WatchlistScreen() {
  const [items, setItems] = useState([]);

  // Reload every time this tab comes into focus, so items added from the
  // details screen show up without a manual refresh.
  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      (async () => {
        const list = await getWatchlist();
        if (!cancelled) setItems(list);
      })();
      return () => {
        cancelled = true;
      };
    }, [])
  );

  async function handleRemove(id) {
    const updated = await removeFromWatchlist(id);
    setItems(updated);
  }

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>YOUR LIBRARY</Text>
          <Text style={styles.heading}>Watchlist</Text>
          <Text style={styles.intro}>
            {items.length === 1 ? '1 saved title' : `${items.length} saved titles`}
          </Text>
        </View>
        <FlatList
          data={items}
          numColumns={2}
          keyExtractor={(item) => `${item.mediaType}-${item.id}`}
          columnWrapperStyle={styles.columns}
          ItemSeparatorComponent={() => <View style={styles.rowGap} />}
          contentContainerStyle={items.length === 0 ? styles.emptyContent : styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Your list is empty.</Text>
              <Text style={styles.emptySubtext}>
                Save a film or series from its details page and it will appear here.
              </Text>
              <Pressable
                style={styles.browseButton}
                accessibilityRole="button"
                onPress={() => router.push('/')}
              >
                <Text style={styles.browseButtonText}>Browse titles</Text>
              </Pressable>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Pressable
                style={styles.cardMain}
                accessibilityRole="button"
                accessibilityLabel={`Open ${item.title}`}
                onPress={() => router.push(`/movie/${item.id}?mediaType=${item.mediaType}`)}
              >
                {item.artwork ? (
                  <Image source={{ uri: item.artwork }} style={styles.poster} />
                ) : (
                  <View style={[styles.poster, styles.posterPlaceholder]} />
                )}
                <View style={styles.cardText}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.subtitle}>
                    {(item.mediaType || 'movie') === 'tv' ? 'TV series' : 'Film'}
                    {item.releaseDate ? ` · ${item.releaseDate.slice(0, 4)}` : ''}
                  </Text>
                </View>
              </Pressable>
              <Pressable
                hitSlop={10}
                onPress={() => handleRemove(item.id)}
                style={styles.removeButton}
                accessibilityRole="button"
                accessibilityLabel={`Remove ${item.title} from watchlist`}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </Pressable>
            </View>
          )}
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
  heading: { color: '#F1F6F7', fontFamily: 'Georgia', fontSize: 30, lineHeight: 36, marginTop: 8 },
  intro: { color: '#A1AFB9', fontSize: 15, lineHeight: 22, marginTop: 6 },
  listContent: { paddingBottom: 24 },
  emptyContent: { flexGrow: 1 },
  emptyContainer: { padding: 20, maxWidth: 380, backgroundColor: '#141C25', borderColor: '#202C36', borderWidth: 1, borderRadius: 8 },
  emptyText: { color: '#F1F6F7', fontFamily: 'Georgia', fontSize: 20, marginBottom: 7 },
  emptySubtext: { color: '#A1AFB9', fontSize: 14, lineHeight: 21 },
  browseButton: {
    alignSelf: 'flex-start',
    marginTop: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#20D5E7',
  },
  browseButtonText: { color: '#071014', fontSize: 13, fontWeight: '700' },
  columns: { justifyContent: 'space-between', gap: 14 },
  rowGap: { height: 14 },
  card: { flex: 1, backgroundColor: '#141C25', borderColor: '#202C36', borderWidth: 1, borderRadius: 8, padding: 8 },
  cardMain: { flex: 1 },
  poster: { width: '100%', height: 220, borderRadius: 5, backgroundColor: '#202B35' },
  posterPlaceholder: {},
  cardText: { paddingTop: 10, paddingBottom: 3 },
  title: { color: '#F1F6F7', fontSize: 15, fontWeight: '600', lineHeight: 20 },
  subtitle: { fontSize: 12, color: '#82919C', marginTop: 5 },
  removeButton: { alignSelf: 'flex-start', paddingHorizontal: 4, paddingVertical: 8 },
  removeButtonText: { color: '#20D5E7', fontSize: 12, fontWeight: '600' },
});