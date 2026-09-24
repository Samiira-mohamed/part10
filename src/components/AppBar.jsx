import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import { useQuery, useApolloClient } from '@apollo/client/react';
import Constants from 'expo-constants';
import Text from './Text';
import { GET_CURRENT_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

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
  const { data } = useQuery(GET_CURRENT_USER);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const isSignedIn = Boolean(data?.me);

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollContent}>
        <Link to="/" component={Pressable} style={styles.tab}>
          <Text style={styles.tabText}>Repositories</Text>
        </Link>
        {isSignedIn && (
          <Link to="/review" component={Pressable} style={styles.tab}>
            <Text style={styles.tabText}>Create a review</Text>
          </Link>
        )}
        {isSignedIn && (
          <Link to="/myreviews" component={Pressable} style={styles.tab}>
            <Text style={styles.tabText}>My reviews</Text>
          </Link>
        )}
        {isSignedIn ? (
          <Pressable onPress={handleSignOut} style={styles.tab}>
            <Text style={styles.tabText}>Sign out</Text>
          </Pressable>
        ) : (
          <>
            <Link to="/signin" component={Pressable} style={styles.tab}>
              <Text style={styles.tabText}>Sign in</Text>
            </Link>
            <Link to="/signup" component={Pressable} style={styles.tab}>
              <Text style={styles.tabText}>Sign up</Text>
            </Link>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
