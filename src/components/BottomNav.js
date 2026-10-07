import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";

// Bottom tab bar: switches between Discover and Watchlist.
// "detailsOpen" hides the active highlight while a movie's details page is showing.
export default function BottomNav({ page, savedCount, detailsOpen, onChange }) {
  const discoverActive = page === "Discover" && !detailsOpen;
  const watchlistActive = page === "Watchlist" && !detailsOpen;

  return (
    <View style={styles.bar}>
      <Pressable
        style={styles.item}
        onPress={() => onChange("Discover")}
        accessibilityRole="button"
      >
        <Text style={[styles.label, discoverActive && styles.labelActive]}>
          DISCOVER
        </Text>
        {discoverActive && <View style={styles.indicator} />}
      </Pressable>

      <Pressable
        style={styles.item}
        onPress={() => onChange("Watchlist")}
        accessibilityRole="button"
      >
        <Text style={[styles.label, watchlistActive && styles.labelActive]}>
          WATCHLIST <Text style={styles.count}>{savedCount}</Text>
        </Text>
        {watchlistActive && <View style={styles.indicator} />}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    minHeight: 58,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: colors.navBackground,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  item: {
    minWidth: 140,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 4,
  },
  label: { color: colors.textMuted, fontSize: 10, fontWeight: "800" },
  labelActive: { color: colors.accent },
  count: { color: colors.accent },
  indicator: {
    position: "absolute",
    bottom: 0,
    height: 2,
    width: 42,
    backgroundColor: colors.accent,
  },
});
