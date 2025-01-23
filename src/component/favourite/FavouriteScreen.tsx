import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import React from 'react';

interface favItem {
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

const FavouriteScreen : React.FC<Props> = () => {
    const favItems: favItem[] = [
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

      const renderItem = ({item}: {item: favItem}) => (
        <View style={styles.itemCard}>
          <Image
            source={{uri: 'https://via.placeholder.com/80'}}
            style={styles.itemImage}
          />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemCategory}>{item.category}</Text>
            <Text style={styles.itemPrice}>₹ {item.price.toFixed(2)}</Text>
          </View>
        </View>
      );
  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <Text style={styles.toolbarText}>Favourite</Text>
      </View>
      <View style={styles.flatListContainer}>
        <FlatList
          data={favItems}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
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
