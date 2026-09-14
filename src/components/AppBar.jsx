import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    paddingBottom: 10,
    backgroundColor: '#24292e',
  },
  scrollContent: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  tab: {
    paddingVertical: 5,
    marginRight: 20,
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
      <ScrollView horizontal contentContainerStyle={styles.scrollContent}>
        <Link to="/" component={Pressable} style={styles.tab}>
          <Text style={styles.tabText}>Repositories</Text>
        </Link>
        <Link to="/signin" component={Pressable} style={styles.tab}>
          <Text style={styles.tabText}>Sign in</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
