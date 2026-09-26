import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: '#F6F5F1' } }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="movie/[id]" options={{ title: '', headerBackTitle: 'Back' }} />
    </Stack>
  );
}