import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './src/component/splash/SplashScreen';
import LoginScreen from './src/component/login/LoginScreen';
import SignUp from './src/component/signup/SignUp';
import CartScreen from './src/component/cart/CartScreen';
import HomeScreen from './src/component/Home/HomeScreen';
import FavouriteScreen from './src/component/favourite/FavouriteScreen';
import SearchScreen from './src/component/search/SearchScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Signup" component={SignUp} />
        <Stack.Screen name="cart" component={CartScreen} />
        <Stack.Screen name="fav" component={FavouriteScreen} />
        <Stack.Screen name="search" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
