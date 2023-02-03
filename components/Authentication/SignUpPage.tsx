import React, { useState, useContext, useEffect } from 'react';
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
import { auth } from 'utils/firebase-config';

import { useAuthContext } from 'contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

function SignUpPage() {
  const { navigate } = useNavigation();
  const [hidePassword, setHidePassword] = useState(true);
  const [nameInput, setNameInput] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const { register, signInWithGoogle, signInWithFacebook } = useAuthContext();

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
            size={32}
            color="#1877F2"
            onPress={() => {
              signInWithFacebook();
            }}
          />
        </View>
      </View>

      <View style={styles.loginTextContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <Text
          style={[styles.loginText, styles.loginButton]}
          onPress={() => {
            navigate('Login' as never, {} as never);
          }}
        >
          Login
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default SignUpPage;

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
    width: 28,
    height: 28,
  },
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
    marginTop: 72,
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
    color: '#91919F',
    outlineColor: '#6536F9',
  },
  signupText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#212325',
  },
});
