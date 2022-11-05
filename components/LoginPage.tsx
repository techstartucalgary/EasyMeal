import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
  StatusBar,
  Platform,
} from "react-native";

import { useFonts } from "expo-font";
import AntDesign from "@expo/vector-icons/AntDesign";

function LoginPage() {
  const [fontsLoaded] = useFonts({
    "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.loginContainer}>
      <View style={styles.loginHeader}>
        <AntDesign
          name="arrowleft"
          size={24}
          color="black"
          style={styles.backButton}
        />
        <Text style={styles.loginText}>Login</Text>
      </View>
      <TextInput
        style={[styles.loginInput, styles.emailInput]}
        placeholder="Email"
      />
      <TextInput
        style={[styles.loginInput, styles.passwordInput]}
        placeholder="Password"
      />
      <Text style={styles.forgotPassword}>Forgot your password?</Text>
      <Text style={styles.loginButton}>Login</Text>
      <View style={styles.signupTextContainer}>
        <Text style={styles.signupText}>Don't have an account yet?</Text>
        <Text style={[styles.signupText, styles.signupButton]}> Sign Up</Text>
      </View>
    </SafeAreaView>
  );
}

export default LoginPage;

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    left: 20,
  },
  emailInput: {
    marginTop: 56,
  },
  forgotPassword: {
    color: "#6536F9",
    fontFamily: "Inter-Regular",
    fontSize: 13,
    marginLeft: 20,
    marginTop: 12,
  },
  loginContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loginButton: {
    fontFamily: "Inter-SemiBold",
    fontSize: 18,
    textAlign: "center",
    textAlignVertical: "center",
    color: "#fcfcfc",
    backgroundColor: "#6536F9",
    borderRadius: 16,
    height: 56,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 36,
  },
  loginHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingTop: 16,
    paddingBottom: 16,
  },
  loginInput: {
    backgroundColor: "#fff",
    borderColor: "#f1f1f1",
    borderWidth: 2,
    borderRadius: 16,
    height: 56,

    marginLeft: 16,
    marginRight: 16,
    paddingLeft: 16,
    fontFamily: "Inter-Regular",
    fontSize: 16,
    textAlignVertical: "center",
  },
  loginText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 18,
    color: "#212325",
  },
  passwordInput: {
    marginTop: 24,
  },
  signupButton: {
    color: "#6536F9",
  },
  signupText: {
    fontFamily: "Inter-Medium",
    fontSize: 16,
    color: "#91919F",
  },
  signupTextContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 36,
  },
});
