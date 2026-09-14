import { View, StyleSheet, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight + 10,
    paddingBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: '#24292e',
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
      <Link to="/" component={Pressable} style={styles.tab}>
        <Text style={styles.tabText}>Repositories</Text>
      </Link>
      <Link to="/signin" component={Pressable} style={styles.tab}>
        <Text style={styles.tabText}>Sign in</Text>
      </Link>
    </View>
  );
};

export default AppBar;
