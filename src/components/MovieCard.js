import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";
import Poster from "./Poster";

// One movie in the grid: tap the poster to open details, tap SAVE to toggle watchlist.
export default function MovieCard({ movie, isSaved, onOpen, onToggleSave }) {
  return (
    <View style={styles.card}>
      <Pressable
        onPress={onOpen}
        accessibilityRole="button"
        accessibilityLabel={`View ${movie.title}`}
      >
        <Poster movie={movie} />
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>
            {movie.title}
          </Text>
          <Text style={styles.meta}>
            {movie.year} | {movie.genre}
          </Text>
        </View>
      </Pressable>
      <Pressable
        style={styles.saveControl}
        onPress={onToggleSave}
        accessibilityRole="button"
        accessibilityLabel={
          isSaved
            ? `Remove ${movie.title} from watchlist`
            : `Add ${movie.title} to watchlist`
        }
      >
        <Text style={[styles.saveText, isSaved && styles.saveTextActive]}>
          {isSaved ? "SAVED  *" : "+  SAVE"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { width: "48.5%", marginBottom: 3 },
  info: { paddingTop: 9, minHeight: 54 },
  title: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
  },
  meta: { color: colors.textMuted, fontSize: 11, marginTop: 4 },
  saveControl: { alignSelf: "flex-start", paddingVertical: 7 },
  saveText: { color: colors.textSoft, fontSize: 10, fontWeight: "800" },
  saveTextActive: { color: colors.accent },
});