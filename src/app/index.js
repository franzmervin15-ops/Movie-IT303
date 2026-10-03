import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { genres, movies } from '../data/movies';

export default function MoviePrototype() {
  const [page, setPage] = useState('Discover');
  const [searchText, setSearchText] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [savedIds, setSavedIds] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const visibleMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || movie.genre === selectedGenre;
    const matchesPage = page === 'Discover' || savedIds.includes(movie.id);
    return matchesSearch && matchesGenre && matchesPage;
  });

  function toggleSaved(movieId) {
    if (savedIds.includes(movieId)) {
      setSavedIds(savedIds.filter((id) => id !== movieId));
    } else {
      setSavedIds([...savedIds, movieId]);
    }
  }

  function showPage(nextPage) {
    setSelectedMovie(null);
    setSearchText('');
    setSelectedGenre('All');
    setPage(nextPage);
  }

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.page}>
          <View style={styles.topLine}>
            <Text style={styles.brand}>Movie<Text style={styles.brandAccent}>Explorer</Text></Text>
            <Text style={styles.offlineLabel}>BSIT3-A</Text>
          </View>

          {selectedMovie ? (
            <View style={styles.detailPage}>
              <Pressable style={styles.backButton} onPress={() => setSelectedMovie(null)}>
                <Text style={styles.backButtonText}>{'<  BACK TO '}{page.toUpperCase()}</Text>
              </Pressable>
              <Poster movie={selectedMovie} large />
              <View style={styles.detailMetaRow}>
                <Text style={styles.detailGenre}>{selectedMovie.genre.toUpperCase()}</Text>
                <Text style={styles.detailMeta}>{selectedMovie.year}  |  {selectedMovie.runtime}  |  {selectedMovie.rating}</Text>
              </View>
              <Text style={styles.detailTitle}>{selectedMovie.title}</Text>
              <Text style={styles.detailDescription}>{selectedMovie.description}</Text>
              <Pressable
                style={[styles.primaryButton, savedIds.includes(selectedMovie.id) && styles.savedButton]}
                onPress={() => toggleSaved(selectedMovie.id)}
              >
                <Text style={[styles.primaryButtonText, savedIds.includes(selectedMovie.id) && styles.savedButtonText]}>
                  {savedIds.includes(selectedMovie.id) ? 'SAVED TO YOUR LIST  ✓' : 'ADD TO WATCHLIST  +'}
                </Text>
              </Pressable>
            </View>
          ) : (
            <>
              <View style={styles.hero}>
                <Text style={styles.eyebrow}>{page === 'Discover' ? 'A SMALL COLLECTION, PICKED FOR TONIGHT' : 'YOUR PERSONAL SHORTLIST'}</Text>
                <Text style={styles.heading}>{page === 'Discover' ? 'Find your next\nfavorite story.' : 'Keep the good ones\nclose by.'}</Text>
                <Text style={styles.subheading}>
                  {page === 'Discover'
                    ? 'Twelve films. No sign-in, no internet, just something good to watch.'
                    : `${savedIds.length} ${savedIds.length === 1 ? 'film' : 'films'} saved for later.`}
                </Text>
              </View>

              {page === 'Discover' && (
                <>
                  <View style={styles.searchBox}>
                    <Text style={styles.searchIcon}>FIND</Text>
                    <TextInput
                      style={styles.searchInput}
                      placeholder="Search this collection"
                      placeholderTextColor="#8D9A91"
                      value={searchText}
                      onChangeText={setSearchText}
                      autoCorrect={false}
                      accessibilityLabel="Search movies"
                    />
                    {searchText.length > 0 && (
                      <Pressable onPress={() => setSearchText('')} accessibilityRole="button" accessibilityLabel="Clear search">
                        <Text style={styles.clearText}>CLEAR</Text>
                      </Pressable>
                    )}
                  </View>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreScroll} contentContainerStyle={styles.genreRow}>
                    {genres.map((genre) => (
                      <Pressable
                        key={genre}
                        style={[styles.genreButton, selectedGenre === genre && styles.genreButtonActive]}
                        onPress={() => setSelectedGenre(genre)}
                      >
                        <Text style={[styles.genreText, selectedGenre === genre && styles.genreTextActive]}>{genre}</Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                </>
              )}

              <View style={styles.sectionHeading}>
                <Text style={styles.sectionTitle}>{page === 'Discover' ? 'THE COLLECTION' : 'SAVED FILMS'}</Text>
                <Text style={styles.resultCount}>{visibleMovies.length} FILMS</Text>
              </View>

              {visibleMovies.length > 0 ? (
                <View style={styles.movieGrid}>
                  {visibleMovies.map((movie) => (
                    <View key={movie.id} style={styles.movieCard}>
                      <Pressable onPress={() => setSelectedMovie(movie)} accessibilityRole="button" accessibilityLabel={`View ${movie.title}`}>
                        <Poster movie={movie} />
                        <View style={styles.movieInfo}>
                          <Text style={styles.movieTitle} numberOfLines={2}>{movie.title}</Text>
                          <Text style={styles.movieMeta}>{movie.year}  |  {movie.genre}</Text>
                        </View>
                      </Pressable>
                      <Pressable
                        style={styles.saveControl}
                        onPress={() => toggleSaved(movie.id)}
                        accessibilityRole="button"
                        accessibilityLabel={savedIds.includes(movie.id) ? `Remove ${movie.title} from watchlist` : `Add ${movie.title} to watchlist`}
                      >
                        <Text style={[styles.saveControlText, savedIds.includes(movie.id) && styles.saveControlActive]}>
                          {savedIds.includes(movie.id) ? 'SAVED  *' : '+  SAVE'}
                        </Text>
                      </Pressable>
                    </View>
                  ))}
                </View>
              ) : (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyTitle}>{page === 'Watchlist' ? 'Nothing saved yet.' : 'No films found.'}</Text>
                  <Text style={styles.emptyText}>
                    {page === 'Watchlist' ? 'Visit Discover and save a film to see it here.' : 'Try another title or choose a different genre.'}
                  </Text>
                  {page === 'Watchlist' && (
                    <Pressable style={styles.textButton} onPress={() => showPage('Discover')}>
                      <Text style={styles.textButtonLabel}>EXPLORE THE COLLECTION  &gt;</Text>
                    </Pressable>
                  )}
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <Pressable style={styles.navItem} onPress={() => showPage('Discover')} accessibilityRole="button">
          <Text style={[styles.navLabel, page === 'Discover' && !selectedMovie && styles.navLabelActive]}>DISCOVER</Text>
          {page === 'Discover' && !selectedMovie && <View style={styles.navIndicator} />}
        </Pressable>
        <Pressable style={styles.navItem} onPress={() => showPage('Watchlist')} accessibilityRole="button">
          <Text style={[styles.navLabel, page === 'Watchlist' && !selectedMovie && styles.navLabelActive]}>
            WATCHLIST  <Text style={styles.navCount}>{savedIds.length}</Text>
          </Text>
          {page === 'Watchlist' && !selectedMovie && <View style={styles.navIndicator} />}
        </Pressable>
      </View>
    </View>
  );
}

function Poster({ movie, large = false }) {
  return (
    <View style={[styles.poster, large && styles.posterLarge, { backgroundColor: movie.color }]}>
      <View style={styles.posterTopLine}>
        <Text style={styles.posterSmallText}>FRAME  /  {movie.year}</Text>
        <Text style={styles.posterSmallText}>NO. {movie.id.slice(0, 2).toUpperCase()}</Text>
      </View>
      <View style={styles.posterCenter}>
        <View style={[styles.posterMark, large && styles.posterMarkLarge, { borderColor: movie.accent }]}>
          <Text style={[styles.posterInitials, large && styles.posterInitialsLarge, { color: movie.accent }]}>{movie.initials}</Text>
        </View>
        <Text style={[styles.posterTitle, large && styles.posterTitleLarge]}>{movie.posterTitle}</Text>
        <Text style={styles.posterGenre}>{movie.genre.toUpperCase()}</Text>
      </View>
      <View style={styles.posterBottomLine}>
        <Text style={styles.posterSmallText}>A FILM FOR YOUR LIST</Text>
        <Text style={[styles.posterDot, { color: movie.accent }]}>*</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#111816' },
  scrollContent: { flexGrow: 1 },
  page: { width: '100%', maxWidth: 820, alignSelf: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 32 },
  topLine: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: '#29332D' },
  brand: { color: '#F1F1E9', fontSize: 14, fontWeight: '900' },
  brandAccent: { color: '#D4E86A' },
  offlineLabel: { color: '#8D9A91', fontSize: 9, fontWeight: '700' },
  hero: { paddingTop: 28, paddingBottom: 23 },
  eyebrow: { color: '#D4E86A', fontSize: 10, fontWeight: '700', lineHeight: 16 },
  heading: { color: '#F1F1E9', fontFamily: 'Georgia', fontSize: 34, lineHeight: 39, marginTop: 10 },
  subheading: { color: '#A9B3A9', fontSize: 14, lineHeight: 21, marginTop: 10, maxWidth: 420 },
  searchBox: { minHeight: 49, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, backgroundColor: '#1A241F', borderWidth: 1, borderColor: '#344239', borderRadius: 5 },
  searchIcon: { color: '#D4E86A', fontSize: 10, fontWeight: '700', marginRight: 10 },
  searchInput: { flex: 1, minHeight: 47, color: '#F1F1E9', fontSize: 14 },
  clearText: { color: '#D4E86A', fontSize: 10, fontWeight: '700', paddingLeft: 10 },
  genreScroll: { flexGrow: 0, marginTop: 13, marginBottom: 23 },
  genreRow: { flexDirection: 'row', gap: 8, paddingRight: 20 },
  genreButton: { paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: '#344239', borderRadius: 4 },
  genreButtonActive: { backgroundColor: '#D4E86A', borderColor: '#D4E86A' },
  genreText: { color: '#A9B3A9', fontSize: 12, fontWeight: '600' },
  genreTextActive: { color: '#172019' },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 13 },
  sectionTitle: { color: '#F1F1E9', fontSize: 12, fontWeight: '800' },
  resultCount: { color: '#8D9A91', fontSize: 10, fontWeight: '700' },
  movieGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 18 },
  movieCard: { width: '48.5%', marginBottom: 3 },
  poster: { height: 190, padding: 10, justifyContent: 'space-between', overflow: 'hidden', borderRadius: 3 },
  posterLarge: { height: 350, width: '100%', maxWidth: 360, alignSelf: 'center', padding: 17 },
  posterTopLine: { flexDirection: 'row', justifyContent: 'space-between' },
  posterSmallText: { color: '#F5F0DE', fontSize: 8, fontWeight: '700', opacity: 0.85 },
  posterCenter: { alignItems: 'center' },
  posterMark: { width: 52, height: 52, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 26, marginBottom: 12 },
  posterMarkLarge: { width: 78, height: 78, borderRadius: 39, marginBottom: 18 },
  posterInitials: { fontFamily: 'Georgia', fontSize: 18 },
  posterInitialsLarge: { fontSize: 27 },
  posterTitle: { color: '#F5F0DE', fontFamily: 'Georgia', fontSize: 15, fontWeight: '700', textAlign: 'center' },
  posterTitleLarge: { fontSize: 25 },
  posterGenre: { color: '#F5F0DE', fontSize: 8, fontWeight: '700', marginTop: 7, opacity: 0.8 },
  posterBottomLine: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  posterDot: { fontSize: 11 },
  movieInfo: { paddingTop: 9, minHeight: 54 },
  movieTitle: { color: '#F1F1E9', fontSize: 14, fontWeight: '700', lineHeight: 18 },
  movieMeta: { color: '#8D9A91', fontSize: 11, marginTop: 4 },
  saveControl: { alignSelf: 'flex-start', paddingVertical: 7 },
  saveControlText: { color: '#A9B3A9', fontSize: 10, fontWeight: '800' },
  saveControlActive: { color: '#D4E86A' },
  bottomNav: { minHeight: 58, flexDirection: 'row', justifyContent: 'center', backgroundColor: '#17211B', borderTopWidth: 1, borderTopColor: '#29332D' },
  navItem: { minWidth: 140, alignItems: 'center', justifyContent: 'center', paddingTop: 4 },
  navLabel: { color: '#8D9A91', fontSize: 10, fontWeight: '800' },
  navLabelActive: { color: '#D4E86A' },
  navCount: { color: '#D4E86A' },
  navIndicator: { position: 'absolute', bottom: 0, height: 2, width: 42, backgroundColor: '#D4E86A' },
  detailPage: { paddingTop: 18, paddingBottom: 12 },
  backButton: { alignSelf: 'flex-start', paddingVertical: 10, marginBottom: 12 },
  backButtonText: { color: '#D4E86A', fontSize: 10, fontWeight: '800' },
  detailMetaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 18 },
  detailGenre: { color: '#D4E86A', fontSize: 10, fontWeight: '800' },
  detailMeta: { color: '#A9B3A9', fontSize: 11 },
  detailTitle: { color: '#F1F1E9', fontFamily: 'Georgia', fontSize: 29, lineHeight: 35, marginTop: 9 },
  detailDescription: { color: '#B7C0B7', fontSize: 15, lineHeight: 24, marginTop: 13 },
  primaryButton: { alignItems: 'center', justifyContent: 'center', minHeight: 48, marginTop: 22, backgroundColor: '#D4E86A', borderRadius: 4 },
  primaryButtonText: { color: '#172019', fontSize: 11, fontWeight: '900' },
  savedButton: { backgroundColor: '#26352B', borderWidth: 1, borderColor: '#52623E' },
  savedButtonText: { color: '#D4E86A' },
  emptyState: { paddingVertical: 24, borderTopWidth: 1, borderTopColor: '#29332D' },
  emptyTitle: { color: '#F1F1E9', fontFamily: 'Georgia', fontSize: 21 },
  emptyText: { color: '#A9B3A9', fontSize: 13, lineHeight: 20, marginTop: 7 },
  textButton: { alignSelf: 'flex-start', paddingVertical: 14 },
  textButtonLabel: { color: '#D4E86A', fontSize: 10, fontWeight: '800' },
});
