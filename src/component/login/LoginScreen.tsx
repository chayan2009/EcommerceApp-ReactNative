import React from 'react';
import {View, Text, StyleSheet, TextInput, ImageBackground} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../constants/colors';

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../asset/splash.png')}
        style={styles.topSection}
      />
      <View style={styles.bottomSection}>
        <Text style={styles.bottomText}>Email Address</Text>
        <View style={styles.inputContainer}>
          <Icon
            name="email"
            size={20}
            color={colors.black}
            style={styles.icon}
          />
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor={colors.black}
            style={styles.textInput}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <Text style={styles.bottomText}>Password</Text>
        <View style={styles.inputContainer}>
          <Icon
            name="lock"
            size={20}
            color={colors.black}
            style={styles.icon}
          />
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor={colors.black}
            style={styles.textInput}
            autoCapitalize="none"
          />
        </View>
        <Text style={styles.actionText}>
          Don't have an account? Sign up now!
        </Text>
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
    backgroundColor: colors.primary, // Top section background color
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSection: {
    flex: 1,
    backgroundColor: colors.white, // Bottom section background color
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  topText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 16,
    color: 'black',
    marginTop: 10,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomText: {
    fontSize: 18,
    color: colors.black,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: colors.white,
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    height: 40,
    color: colors.black,
  },
  actionText: {
    fontSize: 16,
    color: colors.primary,
    marginTop: 5,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});
