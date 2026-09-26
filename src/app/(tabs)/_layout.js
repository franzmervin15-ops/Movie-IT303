import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#A65E4D',
        tabBarInactiveTintColor: '#777A74',
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        tabBarStyle: { backgroundColor: '#FBFAF7', borderTopColor: '#E4E2DC' },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Search' }} />
      <Tabs.Screen name="watchlist" options={{ title: 'Watchlist' }} />
    </Tabs>
  );
}