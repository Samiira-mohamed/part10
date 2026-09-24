import { FlatList, View, StyleSheet, Pressable, Alert } from 'react-native';
import { useQuery, useMutation } from '@apollo/client/react';
import { useNavigate } from 'react-router-native';
import Text from './Text';
import theme from '../theme';
import { GET_CURRENT_USER } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  reviewContainer: {
    flexDirection: 'row',
    padding: 15,
  },
  ratingContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  ratingText: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
  },
  infoContainer: {
    flexShrink: 1,
  },
  username: {
    marginBottom: 4,
  },
  date: {
    marginBottom: 6,
  },
  buttonsRow: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  button: {
    flex: 1,
    borderRadius: 4,
    padding: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
  },
  deleteButton: {
    backgroundColor: '#d73a4a',
  },
  buttonText: {
    color: 'white',
    fontWeight: theme.fontWeights.bold,
  },
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviewItem = ({ review, onDelete }) => {
  const navigate = useNavigate();

  const handleViewRepository = () => {
    navigate(`/repository/${review.repositoryId}`);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => onDelete(review.id),
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.reviewContainer}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text fontWeight="bold" style={styles.username}>
            {review.repository.fullName}
          </Text>
          <Text color="textSecondary" style={styles.date}>
            {review.createdAt}
          </Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      <View style={styles.buttonsRow}>
        <Pressable
          style={[styles.button, styles.viewButton]}
          onPress={handleViewRepository}
        >
          <Text style={styles.buttonText}>View repository</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const { data, loading, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  const [deleteReview] = useMutation(DELETE_REVIEW);

  if (loading) {
    return null;
  }

  const reviewNodes = data?.me?.reviews
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  const handleDelete = async (id) => {
    try {
      await deleteReview({ variables: { id } });
      refetch();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => (
        <MyReviewItem review={item} onDelete={handleDelete} />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
