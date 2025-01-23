import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../constants/colors';
import {StackParamList} from '../navigation/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  'SignUp'
>;
interface RegisterScreenProps {
  navigation: RegisterScreenNavigationProp;
}

const SignUp = ({navigation}: RegisterScreenProps) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleRegister = () => {
    navigation.navigate('Home');
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        <ImageBackground
          source={require('../../asset/ic_fashion.png')}
          style={styles.imagebackground}
          imageStyle={styles.backgroundImage}
        />

        <Icon
          name="arrow-back"
          size={30}
          color={colors.white}
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Get’s started with Geeta.</Text>
        <Text style={styles.subText}>Already have an account? Log in</Text>
        <Text style={styles.loginText}>Register</Text>
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Your Name</Text>
          <View style={styles.inputField}>
            <Icon name="person" size={20} color={colors.black} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your name"
              placeholderTextColor={colors.lightGray}
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>

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

        <TouchableOpacity
          onPress={() => handleRegister()}
          style={styles.registerButton}>
          <Text style={styles.registerButtonText}>REGISTER</Text>
        </TouchableOpacity>

        <Text style={styles.terms}>
          By joining, I agree to receive emails from Geeta.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    flex: 0.4,
    backgroundColor: 'rgba(127, 119, 254, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  bottomSection: {
    flex: 0.6,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center', // Center the content
  },
  headerText: {
    position: 'absolute',
    color: colors.white,
    fontFamily: 'bold',
    fontSize: 20,
    top: '30%',
    left: '10%',
  },
  subText: {
    position: 'absolute',
    color: colors.white,
    fontFamily: 'bold',
    fontSize: 12,
    top: '40%',
    left: '10%',
  },
  loginText: {
    position: 'absolute',
    color: colors.white,
    fontFamily: 'bold',
    fontSize: 20,
    top: '75%',
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
    transform: [{translateX: -50}],
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
  terms: {
    marginTop: 20,
    fontSize: 12,
    color: colors.black,
    textAlign: 'center',
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 50,
    width: '100%',
    alignItems: 'center',
  },
  registerButtonText: {
    color: colors.white,
    fontFamily: 'bold',
    fontSize: 16,
  },
});
