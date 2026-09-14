import { View, StyleSheet, Pressable, Text } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    paddingBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: '#24292e',
  },
  tab: {
    paddingVertical: 5,
  },
  tabText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.tab}>
        <Text style={styles.tabText}>Repositories</Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
