import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const SignUp = () => {
  return (
    <View>
      <Text>SignUp</Text>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 18,
      color: '#6200EE',
    },
  });
