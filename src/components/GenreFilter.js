import React from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { colors } from "../constants/colors";

// Horizontal row of genre buttons. The active one is highlighted.
export default function GenreFilter({ genres, selected, onSelect }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.row}
    >
      {genres.map((genre) => (
        <Pressable
          key={genre}
          style={[styles.button, selected === genre && styles.buttonActive]}
          onPress={() => onSelect(genre)}
        >
          <Text style={[styles.text, selected === genre && styles.textActive]}>
            {genre}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 0, marginTop: 13, marginBottom: 23 },
  row: { flexDirection: "row", gap: 8, paddingRight: 20 },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 4,
  },
  buttonActive: { backgroundColor: colors.accent, borderColor: colors.accent },
  text: { color: colors.textSoft, fontSize: 12, fontWeight: "600" },
  textActive: { color: colors.onAccent },
});