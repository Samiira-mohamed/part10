import { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigate } from 'react-router-native';
import { useDebounce } from 'use-debounce';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  pickerContainer: {
    padding: 10,
    backgroundColor: 'white',
  },
  searchInput: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#d1d5da',
    borderRadius: 4,
    backgroundColor: 'white',
    fontSize: theme.fontSizes.body,
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
  searchKeyword,
  onSearchChange,
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
          <View>
            <TextInput
              style={styles.searchInput}
              placeholder="Search repositories"
              value={searchKeyword}
              onChangeText={onSearchChange}
            />
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedOrder}
                onValueChange={onOrderChange}
              >
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
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const { repositories } = useRepositories({
    ...ORDER_OPTIONS[selectedOrder],
    searchKeyword: debouncedSearchKeyword,
  });
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
      searchKeyword={searchKeyword}
      onSearchChange={setSearchKeyword}
    />
  );
};

export default RepositoryList;
