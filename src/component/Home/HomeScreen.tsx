import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../../redux/reducer/cartSlice';
import {RootState} from '../../redux/store/store';
import {fetchProducts} from '../../component/api/productApi';

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
    navigate: (screen: string, params?: any) => void;
  };
}

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await fetchProducts();
        setAllProducts(products);
        setFilteredProducts(products);
        setLoading(false);
        const uniqueCategories = [
          'All',
          ...new Set(products.map(product => product.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        setLoading(false);
        console.error('failed prodcuts:', error);
      }
    };
    getProducts();
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProducts(allProducts);
      setLoading(false);
    } else {
      setFilteredProducts(
        allProducts.filter(product => product.category === category),
      );
      setLoading(false);
    }
  };

  const handleAddToCart = (item: Product) => {
    const newItem = {
      id: item.id,
      name: item.title,
      category: item.category,
      price: item.price,
      imageUrl: item.thumbnail,
      quantity: 1,
    };
    dispatch(addToCart(newItem));
    navigation.navigate('Cart');
  };

  const renderItem = ({item}: {item: Product}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DetailsScreen', {product: item})}>
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: item.thumbnail}}
            style={styles.productImage}
            resizeMode="contain"
          />
          <TouchableOpacity style={styles.favoriteIcon}>
            <Icon name="favorite-border" size={20} color="red" />
          </TouchableOpacity>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.name} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.price}>₹ {item.price.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddToCart(item)}>
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Toolbar */}
      <View style={styles.toolbar}>
        <Text style={styles.text}>Geeta!!</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('search')}>
            <Icon name="search" size={24} color="#0f0f10" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('cart')}>
            <Icon name="shopping-cart" size={24} color="#0f0f10" />
            {cartItems.length > 0 && (
              <View style={styles.cartCount}>
                <Text style={styles.cartCountText}>{cartItems.length}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('fav')}
            style={styles.iconButton}>
            <Icon name="favorite-border" size={24} color="#0f0f10" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.categoryTabs}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#6200EE"
            style={styles.loader}
          />
        ) : (
          <FlatList
            horizontal
            data={categories}
            keyExtractor={item => item}
            renderItem={({item}) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.tabButton,
                  selectedCategory === item && styles.activeTabButton,
                ]}
                onPress={() => handleCategorySelect(item)}>
                <Text
                  style={[
                    styles.tabText,
                    selectedCategory === item && styles.activeTabText,
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      <FlatList
        numColumns={2}
        data={filteredProducts}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

export default HomeScreen;

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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#f2ebeb',
  },
  text: {
    fontSize: 18,
    color: '#6200EE',
  },
  iconContainer: {
    flexDirection: 'row',
    width: 120,
    justifyContent: 'space-between',
  },
  iconButton: {
    padding: 5,
  },
  categoryTabs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    backgroundColor: '#f1f1f1',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  tabButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 5,
  },
  activeTabButton: {
    backgroundColor: '#6200EE',
  },
  tabText: {
    fontSize: 14,
    color: '#333',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  flatListContainer: {
    padding: 10,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    margin: 10,
    overflow: 'hidden',
    alignItems: 'center',
    elevation: 2,
  },
  imageContainer: {
    marginTop: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 80,
  },
  favoriteIcon: {
    position: 'absolute',
    right: 5,
    borderRadius: 10,
    padding: 0,
  },
  detailsContainer: {
    alignItems: 'center',
    marginTop: 10,
    paddingBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  category: {
    fontSize: 14,
    color: 'gray',
  },
  price: {
    fontSize: 16,
    color: '#6200EE',
    marginVertical: 5,
  },
  addButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cartCount: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCountText: {
    color: '#fff',
    fontSize: 12,
  },
});
