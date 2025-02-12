import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../redux/store/store';
import {removeFromCart} from '../../redux/reducer/cartSlice';
import CartItem from '../cart/CartItem';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CartScreen = ({navigation}) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleDelete = (itemId: number) => {
    dispatch(removeFromCart(itemId));
  };

  const renderItem = ({item}) => <CartItem {...item} />;

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#6200EE" />
        </TouchableOpacity>
        <Text style={styles.toolbarText}>Carts</Text>
      </View>{' '}
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
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
  emptyCartText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
});
