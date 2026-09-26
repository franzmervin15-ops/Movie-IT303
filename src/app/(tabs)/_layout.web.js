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
  root: { flex: 1, backgroundColor: '#F6F5F1' },
  tabList: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 24,
    minHeight: 58,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E2DC',
    backgroundColor: '#FBFAF7',
  },
  brand: { color: '#252A26', fontSize: 11, fontWeight: '700', marginRight: 'auto' },
  tab: {
    minHeight: 58,
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#A65E4D',
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#454943',
  },
  content: { flex: 1, backgroundColor: '#F6F5F1' },
});