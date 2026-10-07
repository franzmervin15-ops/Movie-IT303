import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";
import Poster from "./Poster";

// The details page shown when a movie is tapped.
export default function MovieDetails({
  movie,
  backLabel,
  isSaved,
  onBack,
  onToggleSave,
}) {
  return (
    <View style={styles.page}>
      <Pressable style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>
          {"<  BACK TO "}
          {backLabel.toUpperCase()}
        </Text>
      </Pressable>
      <Poster movie={movie} large />
      <View style={styles.metaRow}>
        <Text style={styles.genre}>{movie.genre.toUpperCase()}</Text>
        <Text style={styles.meta}>
          {movie.year} | {movie.runtime} | {movie.rating}
        </Text>
      </View>
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.description}>{movie.description}</Text>
      <Pressable
        style={[styles.primaryButton, isSaved && styles.savedButton]}
        onPress={onToggleSave}
      >
        <Text
          style={[styles.primaryButtonText, isSaved && styles.savedButtonText]}
        >
          {isSaved ? "SAVED TO YOUR LIST  ✓" : "ADD TO WATCHLIST  +"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { paddingTop: 18, paddingBottom: 12 },
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 10,
    marginBottom: 12,
  },
  backButtonText: { color: colors.accent, fontSize: 10, fontWeight: "800" },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 18,
  },
  genre: { color: colors.accent, fontSize: 10, fontWeight: "800" },
  meta: { color: colors.textSoft, fontSize: 11 },
  title: {
    color: colors.text,
    fontFamily: "Georgia",
    fontSize: 29,
    lineHeight: 35,
    marginTop: 9,
  },
  description: {
    color: colors.textBody,
    fontSize: 15,
    lineHeight: 24,
    marginTop: 13,
  },
  primaryButton: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
    marginTop: 22,
    backgroundColor: colors.accent,
    borderRadius: 4,
  },
  primaryButtonText: { color: colors.onAccent, fontSize: 11, fontWeight: "900" },
  savedButton: {
    backgroundColor: colors.savedBackground,
    borderWidth: 1,
    borderColor: colors.savedBorder,
  },
  savedButtonText: { color: colors.accent },
});