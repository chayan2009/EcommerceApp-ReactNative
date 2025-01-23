import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
} from 'react-native';

interface SearchItem {
  id: number;
  name: string;
  category: string;
  price: number;
}

interface Props {
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}

const SearchScreen: React.FC<Props> = ({ navigation }) => {
  const [searchText, setSearchText] = React.useState('');
  const [numColumns, setNumColumns] = React.useState(2); // Default number of columns

  const allsearchResults: SearchItem[] = [
    { id: 1, name: 'Nike', category: 'Shoes', price: 23.2 },
    { id: 2, name: 'Reebok', category: 'Shoes', price: 23.2 },
    { id: 3, name: 'Fila', category: 'Shoes', price: 23.2 },
    { id: 4, name: 'Gucci', category: 'Bags', price: 123.5 },
    { id: 5, name: 'Chanel', category: 'Perfume', price: 78.9 },
    { id: 6, name: 'Levis', category: 'Clothing', price: 45.6 },
    { id: 7, name: 'Louis Vuitton', category: 'Bags', price: 150.3 },
    { id: 8, name: 'HRx', category: 'Shoes', price: 34.2 },
    { id: 9, name: 'Being Human', category: 'Clothing', price: 40.0 },
    { id: 10, name: 'Benton', category: 'Skincare', price: 22.5 },
    { id: 11, name: 'Dior', category: 'Perfume', price: 99.0 },
    { id: 12, name: 'Adidas', category: 'Shoes', price: 67.2 },
  ];

  const filteredResults = allsearchResults.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }: { item: SearchItem }) => (
    <View style={styles.cardContainer}>
      <Image
        source={{ uri: 'https://via.placeholder.com/100' }}
        style={styles.productImage}
      />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>₹ {item.price.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <Text style={styles.toolbarText}>Find Products</Text>
      </View>
      <TextInput
        style={styles.searchBar}
        placeholder="Search products"
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList
        data={filteredResults}
        keyExtractor={item => item.id.toString()}
        key={numColumns.toString()}
        renderItem={renderItem}
        numColumns={numColumns}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f2ebeb',
  },
  toolbarText: {
    fontSize: 18,
    color: '#6200EE',
    fontWeight: 'bold',
  },
  searchBar: {
    height: 40,
    margin: 10,
    paddingHorizontal: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: '#f9f9f9',
  },
  flatListContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    margin: 5,
    padding: 10,
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: '#6200EE',
  },
});
