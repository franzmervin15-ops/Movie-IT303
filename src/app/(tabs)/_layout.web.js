import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';
import { StyleSheet, Text } from 'react-native';

export default function WebTabLayout() {
  return (
    <Tabs style={styles.root}>
      <TabList style={styles.tabList}>
        <Text style={styles.brand}>MOVIE EXPLORER</Text>
        <TabTrigger name="index" href="/" style={styles.tab} activeStyle={styles.activeTab}>
          <Text style={styles.tabLabel}>Search</Text>
        </TabTrigger>
        <TabTrigger
          name="watchlist"
          href="/watchlist"
          style={styles.tab}
          activeStyle={styles.activeTab}
        >
          <Text style={styles.tabLabel}>Watchlist</Text>
        </TabTrigger>
      </TabList>
      <TabSlot style={styles.content} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#090D12' },
  tabList: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    paddingHorizontal: 28,
    minHeight: 68,
    borderBottomWidth: 1,
    borderBottomColor: '#202B35',
    backgroundColor: '#0E151D',
  },
  brand: { color: '#EAF2F4', fontSize: 12, fontWeight: '700', letterSpacing: 1.3, marginRight: 'auto' },
  tab: {
    minHeight: 68,
    justifyContent: 'center',
    paddingHorizontal: 5,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#20D5E7',
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#A7B5BF',
  },
  content: { flex: 1, backgroundColor: '#090D12' },
});