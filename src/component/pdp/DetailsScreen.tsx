import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../constants/colors';
import {AirbnbRating} from 'react-native-ratings';
import AddTocart from '../../utils/AddTocart';

interface Props {
  route: {
    params: {
      product: {
        id: number;
        title: string;
        description: string;
        price: number;
        thumbnail: string;
        images: string[];
        rating: number;
      };
    };
  };
  navigation: {
    goBack: () => void;
  };
}

const DetailsScreen: React.FC<Props> = ({route, navigation}) => {
  const {product} = route.params;
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: product.thumbnail}} style={styles.productImage} />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.detailsContainer}>
        <Text style={styles.productcategory}>{product.id}</Text>
        <View style={styles.card}>
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.productPrice}>₹ {product.price.toFixed(2)}</Text>
        </View>
        <View style={styles.ratings}>
          <AirbnbRating
            count={5}
            defaultRating={product.rating}
            size={10}
            showRating={false}
            isDisabled={true}
          />
        </View>
        <View style={styles.actionsRow}>
          <View style={styles.quantityCard}>
            <TouchableOpacity
              onPress={decreaseQuantity}
              style={styles.quantityButton}>
              <Ionicons name="remove" size={20} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              onPress={increaseQuantity}
              style={styles.quantityButton}>
              <Ionicons name="add" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.downloadButton}>
            <Ionicons name="cloud-download" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <Text style={styles.productDescription}>Description:</Text>
        <Text style={styles.productDescriptionValue}>
          {product.description}
        </Text>
      </View>
      <AddTocart/>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ratings: {
    alignItems: 'flex-start',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: '50%',
    resizeMode: 'cover',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 10,
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 10,
    marginTop: -30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  productcategory: {
    fontSize: 12,
    marginHorizontal: 10,
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'left',
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
    fontFamily: 'bold',
    textAlign: 'left',
    padding: 5,
  },
  productPrice: {
    fontSize: 14,
    color: colors.black,
    textAlign: 'center',
    marginVertical: 10,
  },
  productDescription: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
    marginVertical: 10,
    textAlign: 'left',
  },
  productDescriptionValue: {
    fontSize: 14,
    color: '#555',
    textAlign: 'left',
    marginBottom: 20,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  quantityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 5,
    borderRadius: 10,
    justifyContent: 'center',
  },
  quantityButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 5,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    paddingHorizontal: 10,
  },
  downloadButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
