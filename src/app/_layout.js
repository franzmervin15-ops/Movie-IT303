// We used: ES module import (JavaScript)
// We used: Expo Router library -> "Stack" para mag navigate
import { Stack } from "expo-router";

// We used: Expo Status Bar library -> to control phone stop bar like (clock, battery)
import { StatusBar } from "expo-status-bar";

// We used: Function component (React) -> an RootLayout is an outer shell
// We used: export default -> it let Expo Router  nga mag load san files, automatically
export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: "#111816" },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}