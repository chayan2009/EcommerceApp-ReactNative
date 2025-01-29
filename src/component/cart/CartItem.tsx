import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/reducer/cartSlice';

interface CartItemProps {
  id: number;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  category,
  price,
  imageUrl,
  quantity,
}) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(id));
  };

  const handleAdd = () => {
    const newItem = { id, name, category, price, imageUrl, quantity: 1 };
    dispatch(addToCart(newItem));
  };

  return (
    <View style={styles.itemCard}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.productImage}
        resizeMode="contain"
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{name}</Text>
        <Text style={styles.itemCategory}>{category}</Text>
        <Text style={styles.itemPrice}>${price}</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.deleteButton} onPress={handleRemove}>
            <Icon name="remove" size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Icon name="add" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'center',
  },
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemCategory: {
    fontSize: 14,
    color: '#777',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200EE',
    marginTop: 5,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10, // Adds spacing between the price and the action buttons
  },
  deleteButton: {
    backgroundColor: '#FF6F61',
    padding: 5,
    borderRadius: 30,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 5,
    borderRadius: 30,
  },
});
