import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Product {
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

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const allProducts: Product[] = [
    {id: 1, name: 'Nike', category: 'Shoes', price: 23.2},
    {id: 2, name: 'Reebok', category: 'Shoes', price: 23.2},
    {id: 3, name: 'Fila', category: 'Shoes', price: 23.2},
    {id: 4, name: 'Gucci', category: 'Bags', price: 123.5},
    {id: 5, name: 'Chanel', category: 'Perfume', price: 78.9},
    {id: 6, name: 'Levis', category: 'Clothing', price: 45.6},
    {id: 7, name: 'Louis Vuitton', category: 'Bags', price: 150.3},
    {id: 8, name: 'HRx', category: 'Shoes', price: 34.2},
    {id: 9, name: 'Being Human', category: 'Clothing', price: 40.0},
    {id: 10, name: 'Benton', category: 'Skincare', price: 22.5},
    {id: 11, name: 'Dior', category: 'Perfume', price: 99.0},
    {id: 12, name: 'Adidas', category: 'Shoes', price: 67.2},
  ];

  const categories: string[] = [
    'All',
    'Shoes',
    'Bags',
    'Clothing',
    'Perfume',
    'Skincare',
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(allProducts);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProducts(allProducts);
    } else {
      setFilteredProducts(
        allProducts.filter(product => product.category === category),
      );
    }
  };

  const renderItem = ({item}: {item: Product}) => (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: 'https://via.placeholder.com/100'}}
          style={styles.productImage}
        />
        <TouchableOpacity style={styles.favoriteIcon}>
          <Icon name="favorite-border" size={20} color="red" />
        </TouchableOpacity>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.price}>₹ {item.price.toFixed(2)}</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('cart')}>
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Toolbar */}
      <View style={styles.toolbar}>
        <Text style={styles.text}>Geeta!!</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon
              name="search"
              onPress={()=>navigation.navigate('search')}
              size={24}
              color="#0f0f10"
            />
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={()=>navigation.navigate('fav')}
            style={styles.iconButton}>
            <Icon name="favorite" size={24} color="#0f0f10" />
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="shopping-cart" size={24} color="#0f0f10" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="menu" size={24} color="#0f0f10" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Category Tabs */}
      <View style={styles.categoryTabs}>
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
      </View>

      {/* Filter and Icons */}
      <View style={styles.filterAndIcons}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="filter-list" size={24} color="#6200EE" />
        </TouchableOpacity>
        <View style={styles.iconGroup}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="grid-view" size={24} color="#6200EE" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="star" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Product List */}
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
  filterAndIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
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
    borderRadius: 50,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 3,
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
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
