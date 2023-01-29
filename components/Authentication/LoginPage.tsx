import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
  StatusBar,
  Platform,
  Image,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';

import { useFonts } from 'expo-font';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useAuthContext } from 'contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { auth } from 'utils/firebase-config';

const LoginPage = () => {
  const { navigate } = useNavigation();
  const [hidePassword, setHidePassword] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const { login, signInWithGoogle, signInWithFacebook } = useAuthContext();

  const [fontsLoaded] = useFonts({
    'Inter-SemiBold': require('../../assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Medium': require('../../assets/fonts/Inter-Medium.ttf'),
    'Inter-Regular': require('../../assets/fonts/Inter-Regular.ttf'),
  });

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('Home' as never, {} as never);
      }
    });
  }, [navigate]);

  if (!fontsLoaded) {
    return null;
  }

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <SafeAreaView style={styles.loginContainer}>
      <View style={styles.loginHeader}>
        <Pressable
          style={styles.backButton}
          onPress={() => {
            navigate('Hero' as never, {} as never);
          }}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <Text style={styles.loginText}>Login</Text>
      </View>
      <TextInput
        style={[styles.loginInput, styles.emailInput]}
        placeholder="Email"
        onChangeText={setLoginEmail}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.loginInput, styles.passwordInput]}
          placeholder="Password"
          secureTextEntry={hidePassword}
          onChangeText={setLoginPassword}
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
        style={styles.loginButton}
        onPress={() => {
          login({ loginEmail, loginPassword });
        }}
      >
        Login
      </Text>

      <View style={styles.altLoginTextContainer}>
        <View style={styles.altLoginHr} />
        <View>
          <Text style={styles.altLoginText}>Or login with</Text>
        </View>
        <View style={styles.altLoginHr} />
      </View>

      <View style={styles.altLoginButtonContainer}>
        <TouchableWithoutFeedback
          onPress={() => {
            signInWithGoogle();
          }}
        >
          <View style={styles.altLoginButton}>
            <Image
              source={require('../../assets/google-logo.png')}
              style={styles.altLogo}
            />
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.altLoginButton}>
          <Image
            source={require('../../assets/apple-logo.png')}
            style={styles.altLogo}
          />
        </View>
        <View style={styles.altLoginButton}>
          <MaterialIcons
            name="facebook"
            size={36}
            color="#1877F2"
            onPress={() => {
              signInWithFacebook();
            }}
          />
        </View>
      </View>

      <View style={styles.signupTextContainer}>
        <Text style={styles.signupText}>Dont have an account yet? </Text>
        <Text
          style={[styles.signupText, styles.signupButton]}
          onPress={() => {
            navigate('SignUp' as never, {} as never);
          }}
        >
          Sign Up
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  altLoginButton: {
    marginRight: 16,
    marginLeft: 16,
    borderWidth: 2,
    borderColor: '#F1F1FA',
    borderRadius: 16,
    height: 52,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  altLoginButtonContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  altLoginHr: {
    flex: 1,
    height: 1,
    backgroundColor: '#91919F',
  },
  altLoginText: {
    color: '#91919F',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    lineHeight: 18,
    marginLeft: 12,
    marginRight: 12,
  },
  altLoginTextContainer: {
    marginTop: 24,
    marginLeft: 44,
    marginRight: 44,
    flexDirection: 'row',
    alignItems: 'center',
  },
  altLogo: {
    height: 28,
    width: 28,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  emailInput: {
    marginTop: 56,
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
  loginContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loginButton: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fcfcfc',
    backgroundColor: '#6536F9',
    borderRadius: 16,
    height: 56,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 36,
  },
  loginHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingTop: 16,
    paddingBottom: 16,
  },
  loginInput: {
    backgroundColor: '#fff',
    borderColor: '#f1f1f1',
    borderWidth: 2,
    borderRadius: 16,
    height: 56,

    marginLeft: 16,
    marginRight: 16,
    paddingLeft: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    textAlignVertical: 'center',
    color: '#91919F',
    outlineColor: '#6536F9',
  },
  loginText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#212325',
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
  signupButton: {
    color: '#6536F9',
  },
  signupText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#91919F',
  },
  signupTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 72,
  },
});
