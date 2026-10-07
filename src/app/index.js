import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import BottomNav from "../components/BottomNav";
import EmptyState from "../components/EmptyState";
import GenreFilter from "../components/GenreFilter";
import MovieCard from "../components/MovieCard";
import MovieDetails from "../components/MovieDetails";
import SearchBar from "../components/SearchBar";
import { colors } from "../constants/colors";
import { genres, movies } from "../data/Movies";

// The screen only holds the state and decides what to show.
// The pieces themselves live in /components.
export default function MoviePrototype() {
  const [page, setPage] = useState("Discover"); // which tab is open
  const [searchText, setSearchText] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [savedIds, setSavedIds] = useState([]); // ids of movies in the watchlist
  const [selectedMovie, setSelectedMovie] = useState(null); // null = no details open

  const visibleMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesGenre =
      selectedGenre === "All" || movie.genre === selectedGenre;
    const matchesPage = page === "Discover" || savedIds.includes(movie.id);
    return matchesSearch && matchesGenre && matchesPage;
  });

  function toggleSaved(movieId) {
    if (savedIds.includes(movieId)) {
      setSavedIds(savedIds.filter((id) => id !== movieId));
    } else {
      setSavedIds([...savedIds, movieId]);
    }
  }

  // Switching tabs resets details, search and genre so each tab starts clean
  function showPage(nextPage) {
    setSelectedMovie(null);
    setSearchText("");
    setSelectedGenre("All");
    setPage(nextPage);
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.page}>
          {/* Top bar: shown on all pages */}
          <View style={styles.topLine}>
            <Text style={styles.brand}>
              Movie<Text style={styles.brandAccent}>Explorer</Text>
            </Text>
            <Text style={styles.offlineLabel}>BSIT3-A</Text>
          </View>

          {selectedMovie ? (
            <MovieDetails
              movie={selectedMovie}
              backLabel={page}
              isSaved={savedIds.includes(selectedMovie.id)}
              onBack={() => setSelectedMovie(null)}
              onToggleSave={() => toggleSaved(selectedMovie.id)}
            />
          ) : (
            <>
              {/* Heading: both tabs, different text */}
              <View style={styles.hero}>
                <Text style={styles.eyebrow}>
                  {page === "Discover"
                    ? "A SMALL COLLECTION, PICKED FOR TONIGHT"
                    : "YOUR PERSONAL SHORTLIST"}
                </Text>
                <Text style={styles.heading}>
                  {page === "Discover"
                    ? "Find your next\nfavorite story."
                    : "Keep the good ones\nclose by."}
                </Text>
                <Text style={styles.subheading}>
                  {page === "Discover"
                    ? "Twelve films. No sign-in, no internet, just something good to watch."
                    : `${savedIds.length} ${savedIds.length === 1 ? "film" : "films"} saved for later.`}
                </Text>
              </View>

              {/* Discover only: search box and genre buttons */}
              {page === "Discover" && (
                <>
                  <SearchBar value={searchText} onChangeText={setSearchText} />
                  <GenreFilter
                    genres={genres}
                    selected={selectedGenre}
                    onSelect={setSelectedGenre}
                  />
                </>
              )}

              {/* Section title and film count */}
              <View style={styles.sectionHeading}>
                <Text style={styles.sectionTitle}>
                  {page === "Discover" ? "THE COLLECTION" : "SAVED FILMS"}
                </Text>
                <Text style={styles.resultCount}>
                  {visibleMovies.length} FILMS
                </Text>
              </View>

              {/* Movie grid, or the empty state when nothing matches */}
              {visibleMovies.length > 0 ? (
                <View style={styles.movieGrid}>
                  {visibleMovies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      isSaved={savedIds.includes(movie.id)}
                      onOpen={() => setSelectedMovie(movie)}
                      onToggleSave={() => toggleSaved(movie.id)}
                    />
                  ))}
                </View>
              ) : (
                <EmptyState
                  page={page}
                  onExplore={() => showPage("Discover")}
                />
              )}
            </>
          )}
        </View>
      </ScrollView>

      <BottomNav
        page={page}
        savedCount={savedIds.length}
        detailsOpen={selectedMovie !== null}
        onChange={showPage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  scrollContent: { flexGrow: 1 },
  page: {
    width: "100%",
    maxWidth: 820,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
  },
  topLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  brand: { color: colors.text, fontSize: 14, fontWeight: "900" },
  brandAccent: { color: colors.accent },
  offlineLabel: { color: colors.textMuted, fontSize: 9, fontWeight: "700" },
  hero: { paddingTop: 28, paddingBottom: 23 },
  eyebrow: {
    color: colors.accent,
    fontSize: 10,
    fontWeight: "700",
    lineHeight: 16,
  },
  heading: {
    color: colors.text,
    fontFamily: "Georgia",
    fontSize: 34,
    lineHeight: 39,
    marginTop: 10,
  },
  subheading: {
    color: colors.textSoft,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 10,
    maxWidth: 420,
  },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 13,
  },
  sectionTitle: { color: colors.text, fontSize: 12, fontWeight: "800" },
  resultCount: { color: colors.textMuted, fontSize: 10, fontWeight: "700" },
  movieGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 18,
  },
});
