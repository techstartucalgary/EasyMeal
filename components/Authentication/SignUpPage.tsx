import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
  StatusBar,
  Platform,
  Pressable,
} from 'react-native';

import { useFonts } from 'expo-font';
import AntDesign from '@expo/vector-icons/AntDesign';

import { useAuthContext } from 'contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

function SignUpPage() {
  const { navigate } = useNavigation();
  const [hidePassword, setHidePassword] = useState(true);
  const [nameInput, setNameInput] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const { register } = useAuthContext();

  const [fontsLoaded] = useFonts({
    'Inter-SemiBold': require('../../assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Medium': require('../../assets/fonts/Inter-Medium.ttf'),
    'Inter-Regular': require('../../assets/fonts/Inter-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <SafeAreaView style={styles.signupContainer}>
      <View style={styles.signupHeader}>
        <Pressable
          style={styles.backButton}
          onPress={() => {
            navigate('Hero' as never, {} as never);
          }}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <Text style={styles.signupText}>Sign Up</Text>
      </View>
      <TextInput
        style={[styles.signupInput]}
        placeholder="Name"
        onChangeText={setNameInput}
      />
      <TextInput
        style={[styles.signupInput, styles.emailInput]}
        placeholder="Email"
        onChangeText={setRegisterEmail}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.signupInput, styles.passwordInput]}
          placeholder="Password"
          secureTextEntry={hidePassword}
          onChangeText={setRegisterPassword}
        />
        <AntDesign
          name={hidePassword ? 'eyeo' : 'eye'}
          size={22}
          color="#91919F"
          style={styles.hidePassword}
          onPress={toggleHidePassword}
        />
      </View>
      <Text style={styles.forgotPassword}>Forgot your password?</Text>
      <Text
        style={styles.signupButton}
        onPress={() => {
          register({ registerEmail, registerPassword });
        }}
      >
        Sign Up
      </Text>
      <View style={styles.loginTextContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <Text
          style={[styles.loginText, styles.loginButton]}
          onPress={() => {
            navigate('Login' as never, {} as never);
          }}
        >
          Login
        </Text>
      </View>
      <Text style={{ color: 'green' }}>{`User Name Input: ${nameInput}`}</Text>
    </SafeAreaView>
  );
}

export default SignUpPage;

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    left: 20,
  },
  emailInput: {
    marginTop: 24,
  },
  forgotPassword: {
    color: '#6536F9',
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    marginLeft: 20,
    marginTop: 12,
  },
  hidePassword: {
    position: 'absolute',
    right: 20,
  },
  loginButton: {
    color: '#6536F9',
  },
  loginText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#91919F',
  },
  loginTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 36,
  },
  passwordContainer: {
    marginTop: 24,
    marginRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    marginTop: 0,
    marginRight: 0,
  },
  signupContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  signupButton: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fcfcfc',
    backgroundColor: '#6536F9',
    borderRadius: 16,
    height: 56,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 36,
  },
  signupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingTop: 16,
    paddingBottom: 16,
  },
  signupInput: {
    backgroundColor: '#fff',
    borderColor: '#f1f1f1',
    borderWidth: 2,
    borderRadius: 16,
    height: 56,

    marginLeft: 16,
    marginRight: 16,
    marginTop: 56,
    paddingLeft: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    textAlignVertical: 'center',
  },
  signupText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#212325',
  },
});
