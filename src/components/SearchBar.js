import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../constants/colors";

// Search box with a CLEAR button that appears once the user has typed something.
export default function SearchBar({ value, onChangeText }) {
  return (
    <View style={styles.box}>
      <Text style={styles.icon}>FIND</Text>
      <TextInput
        style={styles.input}
        placeholder="Search this collection"
        placeholderTextColor={colors.textMuted}
        value={value}
        onChangeText={onChangeText}
        autoCorrect={false}
        accessibilityLabel="Search movies"
      />
      {value.length > 0 && (
        <Pressable
          onPress={() => onChangeText("")}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
        >
          <Text style={styles.clearText}>CLEAR</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    minHeight: 49,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 5,
  },
  icon: {
    color: colors.accent,
    fontSize: 10,
    fontWeight: "700",
    marginRight: 10,
  },
  input: { flex: 1, minHeight: 47, color: colors.text, fontSize: 14 },
  clearText: {
    color: colors.accent,
    fontSize: 10,
    fontWeight: "700",
    paddingLeft: 10,
  },
});