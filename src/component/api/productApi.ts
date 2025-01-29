import axios from 'axios';

const API_URL = 'https://dummyjson.com/products';

export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.products;
  } catch (error) {
    console.error('Error fetching products', error);
    throw error;
  }
};
