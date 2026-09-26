import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getById } from '../../services/itunes';
import { addToWatchlist, removeFromWatchlist, isBookmarked } from '../../services/watchlist';

export default function DetailScreen() {
  const { id: idParam } = useLocalSearchParams();
  const id = Number(idParam);

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [data, bookmarkStatus] = await Promise.all([getById(id), isBookmarked(id)]);
        if (!cancelled) {
          setItem(data);
          setBookmarked(bookmarkStatus);
        }
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  async function toggleBookmark() {
    if (!item) return;
    if (bookmarked) {
      await removeFromWatchlist(id);
      setBookmarked(false);
    } else {
      await addToWatchlist(item);
      setBookmarked(true);
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#A65E4D" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (!item) return null;

  const year = (item.releaseDate || '').slice(0, 4);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {item.artwork && <Image source={{ uri: item.artwork }} style={styles.poster} />}
      <Text style={styles.eyebrow}>{item.mediaType === 'tv' ? 'TV SERIES' : 'FILM'}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.meta}>
        {year ? `${year} · ` : ''}
        {item.mediaType === 'tv' ? 'TV Show' : 'Movie'}
        {item.genre ? ` · ${item.genre}` : ''}
      </Text>
      {item.artistName ? <Text style={styles.meta}>{item.artistName}</Text> : null}

      <Pressable
        style={[styles.bookmarkButton, bookmarked && styles.bookmarkButtonActive]}
        onPress={toggleBookmark}
      >
        <Text style={[styles.bookmarkButtonText, bookmarked && styles.bookmarkButtonTextActive]}>
          {bookmarked ? '✓ In Watchlist' : '+ Add to Watchlist'}
        </Text>
      </Pressable>

      {item.description ? (
        <Text style={styles.overview}>{item.description}</Text>
      ) : (
        <Text style={styles.overviewMuted}>No description available.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F5F1' },
  content: { padding: 22, paddingTop: 28, alignItems: 'center' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F6F5F1' },
  error: { color: '#A13E35', paddingHorizontal: 24, textAlign: 'center', lineHeight: 21 },
  poster: { width: 210, height: 315, borderRadius: 4, backgroundColor: '#E8E7E1' },
  eyebrow: {
    color: '#A65E4D',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginTop: 22,
  },
  title: {
    color: '#252A26',
    fontFamily: 'Georgia',
    fontSize: 27,
    lineHeight: 34,
    marginTop: 7,
    textAlign: 'center',
  },
  meta: { fontSize: 14, color: '#686C66', marginTop: 6, textAlign: 'center', lineHeight: 20 },
  bookmarkButton: {
    marginTop: 20,
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#A65E4D',
  },
  bookmarkButtonActive: { backgroundColor: '#A65E4D' },
  bookmarkButtonText: { color: '#8E4D40', fontWeight: '600', fontSize: 14 },
  bookmarkButtonTextActive: { color: '#FFFFFF' },
  overview: {
    width: '100%',
    maxWidth: 620,
    fontSize: 15,
    lineHeight: 23,
    marginTop: 24,
    color: '#454943',
    textAlign: 'left',
  },
  overviewMuted: { fontSize: 14, marginTop: 24, color: '#777A74' },
});