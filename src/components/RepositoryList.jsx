import { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigate } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  pickerContainer: {
    padding: 10,
    backgroundColor: 'white',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ORDER_OPTIONS = {
  LATEST: {
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  },
  HIGHEST_RATED: {
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'DESC',
  },
  LOWEST_RATED: {
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'ASC',
  },
};

export const RepositoryListContainer = ({
  repositories,
  onPressItem,
  selectedOrder,
  onOrderChange,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        onOrderChange && (
          <View style={styles.pickerContainer}>
            <Picker selectedValue={selectedOrder} onValueChange={onOrderChange}>
              <Picker.Item label="Latest repositories" value="LATEST" />
              <Picker.Item
                label="Highest rated repositories"
                value="HIGHEST_RATED"
              />
              <Picker.Item
                label="Lowest rated repositories"
                value="LOWEST_RATED"
              />
            </Picker>
          </View>
        )
      }
      renderItem={({ item }) => (
        <Pressable onPress={() => onPressItem && onPressItem(item.id)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState('LATEST');
  const { repositories } = useRepositories(ORDER_OPTIONS[selectedOrder]);
  const navigate = useNavigate();

  const onPressItem = (id) => {
    navigate(`/repository/${id}`);
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onPressItem={onPressItem}
      selectedOrder={selectedOrder}
      onOrderChange={setSelectedOrder}
    />
  );
};

export default RepositoryList;
