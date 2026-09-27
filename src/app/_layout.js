import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: '#090D12' },
          headerStyle: { backgroundColor: '#0E151D' },
          headerTintColor: '#20D5E7',
          headerTitleStyle: { color: '#F1F6F7' },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movie/[id]" options={{ title: '', headerBackTitle: 'Back' }} />
      </Stack>
    </>
  );
}