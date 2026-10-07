import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";

// Draws a fake poster (no image files needed).
// Props: "movie" = the data object, "large" = bigger version used on the details page
export default function Poster({ movie, large = false }) {
  return (
    <View
      style={[
        styles.poster,
        large && styles.posterLarge,
        { backgroundColor: movie.color }, // each movie has its own color from the data
      ]}
    >
      <View style={styles.topLine}>
        <Text style={styles.smallText}>FRAME / {movie.year}</Text>
        <Text style={styles.smallText}>
          NO. {movie.id.slice(0, 2).toUpperCase()}
        </Text>
      </View>
      <View style={styles.center}>
        <View
          style={[
            styles.mark,
            large && styles.markLarge,
            { borderColor: movie.accent },
          ]}
        >
          <Text
            style={[
              styles.initials,
              large && styles.initialsLarge,
              { color: movie.accent },
            ]}
          >
            {movie.initials}
          </Text>
        </View>
        <Text style={[styles.title, large && styles.titleLarge]}>
          {movie.posterTitle}
        </Text>
        <Text style={styles.genre}>{movie.genre.toUpperCase()}</Text>
      </View>
      <View style={styles.bottomLine}>
        <Text style={styles.smallText}>A FILM FOR YOUR LIST</Text>
        <Text style={[styles.dot, { color: movie.accent }]}>*</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  poster: {
    height: 190,
    padding: 10,
    justifyContent: "space-between",
    overflow: "hidden",
    borderRadius: 3,
  },
  posterLarge: {
    height: 350,
    width: "100%",
    maxWidth: 360,
    alignSelf: "center",
    padding: 17,
  },
  topLine: { flexDirection: "row", justifyContent: "space-between" },
  smallText: {
    color: colors.posterText,
    fontSize: 8,
    fontWeight: "700",
    opacity: 0.85,
  },
  center: { alignItems: "center" },
  mark: {
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 26,
    marginBottom: 12,
  },
  markLarge: {
    width: 78,
    height: 78,
    borderRadius: 39,
    marginBottom: 18,
  },
  initials: { fontFamily: "Georgia", fontSize: 18 },
  initialsLarge: { fontSize: 27 },
  title: {
    color: colors.posterText,
    fontFamily: "Georgia",
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },
  titleLarge: { fontSize: 25 },
  genre: {
    color: colors.posterText,
    fontSize: 8,
    fontWeight: "700",
    marginTop: 7,
    opacity: 0.8,
  },
  bottomLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dot: { fontSize: 11 },
});