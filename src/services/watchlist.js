import AsyncStorage from '@react-native-async-storage/async-storage';

const WATCHLIST_KEY = '@movie_explorer/watchlist';

export async function getWatchlist() {
  try {
    const raw = await AsyncStorage.getItem(WATCHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('Failed to read watchlist from storage', e);
    return [];
  }
}

export async function isBookmarked(id) {
  const list = await getWatchlist();
  return list.some((item) => item.id === id);
}

// item: { id, media_type, title, poster_path, release_date }
export async function addToWatchlist(item) {
  const list = await getWatchlist();
  if (list.some((existing) => existing.id === item.id)) return list;
  const updated = [...list, item];
  await AsyncStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
  return updated;
}

export async function removeFromWatchlist(id) {
  const list = await getWatchlist();
  const updated = list.filter((item) => item.id !== id);
  await AsyncStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
  return updated;
}