import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#20D5E7',
        tabBarInactiveTintColor: '#82919C',
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        tabBarStyle: { backgroundColor: '#0E151D', borderTopColor: '#202B35' },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Search' }} />
      <Tabs.Screen name="watchlist" options={{ title: 'Watchlist' }} />
    </Tabs>
  );
}