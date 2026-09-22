import { View } from 'react-native';
import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';
import Text from './Text';

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, loading } = useRepository(id);

  if (loading) {
    return null;
  }

  if (!repository) {
    return (
      <View style={{ padding: 15 }}>
        <Text>Repository not found</Text>
      </View>
    );
  }

  return <RepositoryItem item={repository} showGithubButton />;
};

export default SingleRepository;
