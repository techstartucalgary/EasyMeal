import React from "react";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import { UserDataContextProvider } from "./contexts/UserDataContext";

export default function App() {
  /*
  <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
  </View>
  */

  return (
    <UserDataContextProvider>
      <SignUpPage />
    </UserDataContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
