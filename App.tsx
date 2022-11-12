import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { AuthProvider } from 'contexts/AuthContext/AuthProvider';
import LoginPage from './components/Authentication/LoginPage';
import SignUpPage from './components/Authentication/SignUpPage';

export default function App() {
  /*
  <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
  </View>
  */

  return (
    <AuthProvider>
      <SignUpPage />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
