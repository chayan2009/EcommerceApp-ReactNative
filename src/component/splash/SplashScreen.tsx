import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../constants/colors';
import appStrings from '../../constants/strings';

const SplashScreen = ({navigation}: any) => {
  const [isSplashVisible, setisSplashVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setisSplashVisible(false);
      navigation.replace(appStrings.navigationLogin);
    }, 100000);
    return () => clearTimeout(timer);
  }, [navigation]);
  if (isSplashVisible) {
    return (
      <ImageBackground
        source={require('../../asset/splash.png')}
        style={styles.background}>
        <SafeAreaView>
          <StatusBar backgroundColor="#6200EE" barStyle="light-content" />
          <View style={styles.content}>
            <Image
              source={require('../../asset/logo.png')}
              style={styles.image}
            />
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                console.log('Button Pressed!');
                navigation.replace(appStrings.navigationLogin);
              }}>
              <Text style={styles.buttonText}>SHOP NOW</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Image
              source={require('../../asset/dots.png')}
              style={styles.dots}
            />
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
  return null;
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    width: 300,
    height: 150,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 50,
    justifyContent: 'center',
    bottom: 120,
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: colors.primary,
    borderColor: colors.white,
    borderWidth: 2,
    shadowRadius: 3,
    elevation: 5,
    marginTop: 20,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  dots: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    fontSize: 50,
    fontFamily: 'bold',
    color: colors.white,
  },
});
export default SplashScreen;
