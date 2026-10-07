import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";

// Shown when there are no movies to display.
//   Watchlist: "Nothing saved yet."  (with a button back to Discover)
//   Discover:  "No films found."     (search/genre has no match)
export default function EmptyState({ page, onExplore }) {
  const isWatchlist = page === "Watchlist";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isWatchlist ? "Nothing saved yet." : "No films found."}
      </Text>
      <Text style={styles.text}>
        {isWatchlist
          ? "Visit Discover and save a film to see it here."
          : "Try another title or choose a different genre."}
      </Text>
      {isWatchlist && (
        <Pressable style={styles.textButton} onPress={onExplore}>
          <Text style={styles.textButtonLabel}>EXPLORE THE COLLECTION &gt;</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  title: { color: colors.text, fontFamily: "Georgia", fontSize: 21 },
  text: { color: colors.textSoft, fontSize: 13, lineHeight: 20, marginTop: 7 },
  textButton: { alignSelf: "flex-start", paddingVertical: 14 },
  textButtonLabel: { color: colors.accent, fontSize: 10, fontWeight: "800" },
});