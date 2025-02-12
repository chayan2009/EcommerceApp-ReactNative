import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {fetchProducts} from '../api/productApi';
import colors from '../../constants/colors';
import CheckoutButton from '../../utils/CheckoutButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ActivityIndicator} from 'react-native';

interface Props {
  navigation: {
    navigate: (screen: string, params?: any) => void;
    goBack: () => void;
  };
}

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  thumbnail: string;
  images: string[];
}

const SearchScreen: React.FC<Props> = ({navigation}) => {
  const [searchText, setSearchText] = React.useState('');
  const [numColumns] = React.useState(2);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await fetchProducts();
        setAllProducts(products);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log('Failed to fetch products:', error);
      }
    };
    getProducts();
  }, []);

  const filteredResults = allProducts.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  const renderItem = ({item}: {item: Product}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DetailsScreen', {product: item})}>
      <View style={styles.cardContainer}>
        <Image source={{uri: item.thumbnail}} style={styles.productImage} />
        <TouchableOpacity style={styles.favoriteIcon}>
          <Icon name="favorite-border" size={20} color="red" />
        </TouchableOpacity>
      </View>
      <View style={styles.priceWrapper}>
        <Text style={styles.name} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.price}>₹ {item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#6200EE" />
        </TouchableOpacity>
        <Text style={styles.toolbarText}>Find Products</Text>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search products"
        value={searchText}
        onChangeText={setSearchText}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#6200EE" style={styles.loader} />
      ) : (
        <FlatList
        data={filteredResults}
        keyExtractor={item => item.id.toString()}
        key={numColumns.toString()}
        renderItem={renderItem}
        numColumns={numColumns}
        contentContainerStyle={styles.flatListContainer}
        />
      )}
      <View>
        <CheckoutButton />
      </View>
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#f2ebeb',
  },
  backButton: {
    position: 'absolute',
    left: 10,
  },
  toolbarText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    color: colors.primary,
    fontWeight: 'bold',
  },
  searchBar: {
    height: 40,
    margin: 10,
    paddingHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    color: colors.primary,
  },
  flatListContainer: {
    paddingHorizontal: 5,
  },
  card: {
    flex: 1,
    padding: 5,
  },
  cardContainer: {
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    margin: 8,
    borderRadius: 20,
    padding: 60,
    elevation: 3,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    borderRadius: 10,
    padding: 3,
  },
  priceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    flex: 0.7,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.primary,
  },
  price: {
    flex: 0.3,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6200EE',
  },
});
