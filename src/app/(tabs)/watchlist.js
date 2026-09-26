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
          keyExtractor={(item) => `${item.mediaType}-${item.id}`}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={items.length === 0 ? styles.emptyContent : styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Your list is empty.</Text>
              <Text style={styles.emptySubtext}>
                Save a film or series from its details page and it will appear here.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <Pressable
              style={styles.row}
              accessibilityRole="button"
              accessibilityLabel={`Open ${item.title}`}
              onPress={() => router.push(`/movie/${item.id}?mediaType=${item.mediaType}`)}
            >
              {item.artwork ? (
                <Image source={{ uri: item.artwork }} style={styles.poster} />
              ) : (
                <View style={[styles.poster, styles.posterPlaceholder]} />
              )}
              <View style={styles.rowText}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>
                  {(item.mediaType || 'movie') === 'tv' ? 'TV series' : 'Film'}
                  {item.releaseDate ? ` · ${item.releaseDate.slice(0, 4)}` : ''}
                </Text>
              </View>
              <Pressable
                hitSlop={10}
                onPress={() => handleRemove(item.id)}
                style={styles.removeButton}
                accessibilityRole="button"
                accessibilityLabel={`Remove ${item.title} from watchlist`}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </Pressable>
            </Pressable>
          )}
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
  heading: { color: '#252A26', fontFamily: 'Georgia', fontSize: 30, lineHeight: 36, marginTop: 8 },
  intro: { color: '#686C66', fontSize: 15, lineHeight: 22, marginTop: 6 },
  listContent: { paddingBottom: 20 },
  emptyContent: { flexGrow: 1 },
  emptyContainer: { paddingTop: 18, maxWidth: 340 },
  emptyText: { color: '#252A26', fontFamily: 'Georgia', fontSize: 20, marginBottom: 7 },
  emptySubtext: { color: '#686C66', fontSize: 14, lineHeight: 21 },
  separator: { height: 1, backgroundColor: '#E4E2DC' },
  row: { flexDirection: 'row', paddingVertical: 12, alignItems: 'center' },
  poster: { width: 62, height: 90, borderRadius: 4, backgroundColor: '#E8E7E1' },
  posterPlaceholder: {},
  rowText: { marginLeft: 14, flex: 1 },
  title: { color: '#252A26', fontSize: 16, fontWeight: '600', lineHeight: 21 },
  subtitle: { fontSize: 13, color: '#777A74', marginTop: 5 },
  removeButton: { paddingHorizontal: 4, paddingVertical: 10 },
  removeButtonText: { color: '#9B5748', fontSize: 13, fontWeight: '600' },
});