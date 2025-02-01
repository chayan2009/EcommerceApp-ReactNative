import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CheckoutButton = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <Icon name="shopping-cart" size={24} color="white" />
      <Text style={styles.buttonText}>Go to Checkout</Text>
      <Text style={styles.priceText}>$135.96</Text>
    </TouchableOpacity>
  );
};

export default CheckoutButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#6200EE',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign:'center',
    marginLeft: 10,
    flex: 1,
  },
  priceText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
