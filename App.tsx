import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './src/component/splash/SplashScreen';
import LoginScreen from './src/component/login/LoginScreen';
import HomeScreen from './src/component/Home/HomeScreen';
import SignUp from './src/component/signup/SignUp';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
