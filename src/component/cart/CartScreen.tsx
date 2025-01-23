import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface CartItem {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

interface CartScreenProps {
  navigation: any;
}

const CartScreen: React.FC<CartScreenProps> = ({navigation}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {id: 1, name: 'Nike', category: 'Shoes', price: 23.2, quantity: 0},
    {id: 2, name: 'Reebok', category: 'Shoes', price: 23.2, quantity: 0},
    {id: 3, name: 'Fila', category: 'Shoes', price: 23.2, quantity: 0},
    {id: 4, name: 'Gouchi', category: 'Bags', price: 23.2, quantity: 0},
    {id: 5, name: 'Cenel', category: 'Perfume', price: 23.2, quantity: 0},
    {id: 6, name: 'Levis', category: 'Clothing', price: 23.2, quantity: 0},
    {id: 7, name: 'Lui Viton', category: 'Bags', price: 23.2, quantity: 0},
    {id: 8, name: 'HRx', category: 'Shoes', price: 23.2, quantity: 0},
    {
      id: 9,
      name: 'Being Human',
      category: 'Clothing',
      price: 23.2,
      quantity: 0,
    },
    {id: 10, name: 'Benton', category: 'Skincare', price: 23.2, quantity: 0},
  ]);

  const handleAdd = (itemId: number): void => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? {...item, quantity: item.quantity + 1} : item,
      ),
    );
  };

  const handleRemove = (itemId: number): void => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId && item.quantity > 0
          ? {...item, quantity: item.quantity - 1}
          : item,
      ),
    );
  };

  const handleDelete = (itemId: number): void => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    Alert.alert('Item removed from cart');
  };

  const renderItem = ({item}: {item: CartItem}) => (
    <View style={styles.itemCard}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}>
        <Icon name="close" size={20} color="red" />
      </TouchableOpacity>
      <Image
        source={{uri: 'https://via.placeholder.com/80'}}
        style={styles.itemImage}
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemCategory}>{item.category}</Text>
        <Text style={styles.itemPrice}>₹ {item.price.toFixed(2)}</Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => handleRemove(item.id)}>
            <Text style={styles.controlButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => handleAdd(item.id)}>
            <Text style={styles.controlButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <Text style={styles.toolbarText}>My Cart</Text>
      </View>
      <View style={styles.flatListContainer}>
        <Text style={styles.title}>List of Cart Items</Text>
        <FlatList
          data={cartItems}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default CartScreen;

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
    paddingVertical: 10,
    backgroundColor: '#f2ebeb',
  },
  toolbarText: {
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
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
  flatListContainer: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    color: '#6200EE',
    marginBottom: 10,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    alignItems: 'center',
    position: 'relative',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemCategory: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    color: '#6200EE',
    marginBottom: 10,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6200EE',
    borderRadius: 15,
    marginHorizontal: 5,
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
