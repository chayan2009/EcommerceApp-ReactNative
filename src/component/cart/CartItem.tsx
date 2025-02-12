import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {removeFromCart} from '../../redux/reducer/cartSlice';
import colors from '../../constants/colors';

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  thumbnail: string;
}

const CartItem: React.FC<Product> = ({id, title, category, price, thumbnail}) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(id));
  };

  return (
    <View style={styles.itemCard}>
      {/* Remove Item Button */}
      <TouchableOpacity onPress={handleRemove} style={styles.removeButton}>
        <Ionicons name="close" size={22} color="#d2c9c9" />
      </TouchableOpacity>

      {/* Product Image */}
      <Image source={{uri: thumbnail}} style={styles.productImage} resizeMode="contain" />

      {/* Item Details */}
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{title}</Text>
        <Text style={styles.itemCategory}>{category}</Text>

        {/* Price & Quantity */}
        <View style={styles.actionsRow}>
          <Text style={styles.itemPrice}>₹ {price.toFixed(2)}</Text>

          {/* Quantity Control */}
          <View style={styles.quantityCard}>
            <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
              <Ionicons name="remove" size={18} color="white" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
              <Ionicons name="add" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 15,
    alignItems: 'center',
    position: 'relative',
    elevation: 3,
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    padding: 5,
    zIndex: 1,
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemCategory: {
    fontSize: 12,
    color: '#777',
    marginBottom: 5,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200EE',
  },
  quantityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    borderRadius: 15,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  quantityButton: {
    backgroundColor: colors.primary || '#6200EE', // Fallback to primary color
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginHorizontal: 10,
  },
});
