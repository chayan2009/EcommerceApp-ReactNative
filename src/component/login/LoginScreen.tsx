import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // For navigation prop
import colors from '../../constants/colors';
import CheckBox from '@react-native-community/checkbox';
import { StackParamList } from '../navigation/types';

type LoginScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'Login'>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemembered, setIsRemembered] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        <ImageBackground
          source={require('../../asset/fashion.png')}
          style={styles.imagebackground}
          imageStyle={styles.backgroundImage}>
          <Image
            source={require('../../asset/vector.png')}
            style={styles.overlayImage}
          />
        </ImageBackground>

        <Icon
          name="arrow-back"
          size={30}
          color={colors.white}
          style={styles.backIcon}
        />
        <Text style={styles.headerText}>Welcome Back!</Text>
        <Text style={styles.subText}>
          Yay! You're back! Thanks for shopping with us. We have exciting deals
          and promotions going on, grab your pick now!
        </Text>
        <Text style={styles.loginText}>LOG IN</Text>
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <View style={styles.inputField}>
            <Icon name="email" size={20} color={colors.black} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your email"
              placeholderTextColor={colors.lightGray}
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.inputField}>
            <Icon name="lock" size={20} color={colors.black} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your password"
              placeholderTextColor={colors.lightGray}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>

        <View style={styles.rowremember}>
          <View style={styles.rememberMe}>
            <CheckBox
              value={isRemembered}
              onValueChange={newValue => setIsRemembered(newValue)}
              boxType="square"
              tintColors={{ true: colors.primary, false: colors.lightGray }}
              style={styles.checkbox}
            />
            <Text style={styles.rememberText}>Remember Me</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.replace('Signup')}
        >
          <Text style={styles.loginButtonText}>LOG IN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    flex: 1,
    backgroundColor: 'rgba(127, 119, 254, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  bottomSection: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  headerText: {
    position: 'absolute',
    color: colors.white,
    fontFamily: 'bold',
    fontSize: 20,
    top: '35%',
    left: '10%',
  },
  subText: {
    position: 'absolute',
    color: colors.white,
    fontFamily: 'bold',
    fontSize: 12,
    top: '45%',
    right: '20%',
    left: '10%',
  },
  loginText: {
    position: 'absolute',
    color: colors.white,
    fontFamily: 'bold',
    fontSize: 20,
    top: '80%',
    left: '10%',
  },
  backIcon: {
    position: 'absolute',
    top: '10%',
    left: '10%',
  },
  imagebackground: {
    position: 'absolute',
    top: '1%',
    width: '100%',
    height: '100%',
    resizeMode: 'center',
    left: '30%',
  },
  backgroundImage: {
    resizeMode: 'center',
  },
  overlayImage: {
    position: 'absolute',
    top: '27%',
    left: '30%',
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
    transform: [{ translateX: -50 }],
  },
  inputContainer: {
    marginBottom: 15,
    width: '100%',
  },
  inputLabel: {
    color: colors.black,
    fontFamily: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    height: 45,
  },
  textInput: {
    flex: 1,
    height: 45,
    fontSize: 14,
    color: colors.black,
  },
  rowremember: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 10,
  },
  rememberText: {
    color: colors.black,
    fontFamily: 'bold',
    fontSize: 14,
  },
  forgotPassword: {
    color: colors.primary,
    fontFamily: 'bold',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 50,
    alignItems: 'center',
  },
  loginButtonText: {
    color: colors.white,
    fontFamily: 'bold',
    fontSize: 16,
  },
});
