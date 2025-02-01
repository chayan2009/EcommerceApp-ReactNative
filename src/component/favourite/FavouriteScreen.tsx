import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api/productApi';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import CheckoutButton from '../../utils/CheckoutButton';
import { TouchableOpacity } from 'react-native';

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  thumbnail: string;
  images: string[];
}

interface Props {
  navigation: {
    goBack(): void;
    navigate: (screen: string, params?: any) => void;
  };
}

const FavouriteScreen: React.FC<Props> = ({ navigation }) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await fetchProducts();
        setAllProducts(products);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.log('Fetch error:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };
    getProducts();
  }, []);

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DetailsScreen', { product: item })}>
      <View style={styles.itemCard}>
        <Image source={{ uri: item.thumbnail }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <View style={styles.row}>
            <Text style={styles.itemName} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.itemPrice}>₹ {item.price.toFixed(2)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.itemCategory}>{item.category}</Text>
          </View>
          <View style={styles.row1}>
            <Ionicons name="chevron-forward" size={20} color="#6200EE" />
          </View>
        </View>
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
      <View style={styles.flatListContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#6200EE" style={styles.loader} />
        ) : (
          <FlatList
            data={allProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        )}
      </View>
      <View>
        <CheckoutButton />
      </View>
    </View>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    flex: 1,
    padding: 5,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#f2ebeb',
  },
  toolbarText: {
    fontSize: 18,
    color: '#6200EE',
    fontWeight: 'bold',
  },
  flatListContainer: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    padding: 10,
    alignItems: 'center',
    position: 'relative',
    elevation: 3,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    flex: 0.7,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6342E8',
  },
  itemPrice: {
    flex: 0.3,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200EE',
    textAlign: 'right',
  },
  itemCategory: {
    fontSize: 14,
    color: 'gray',
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
});
