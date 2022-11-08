import React, { useState } from "react";
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

function SignUpPage() {
  const [hidePassword, setHidePassword] = useState(true);

  const [fontsLoaded] = useFonts({
    "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  function toggleHidePassword() {
    setHidePassword(!hidePassword);
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
        <Text style={styles.loginText}>Sign Up</Text>
      </View>
      <TextInput
        style={[styles.loginInput, styles.emailInput]}
        placeholder="Email"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.loginInput, styles.passwordInput]}
          placeholder="Password"
          secureTextEntry={hidePassword}
        />
        <AntDesign
          name={hidePassword ? "eyeo" : "eye"}
          size={22}
          color="#91919F"
          style={styles.hidePassword}
          onPress={toggleHidePassword}
        />
      </View>

      <Text style={styles.forgotPassword}>Forgot your password?</Text>
      <Text style={styles.loginButton}>Sign Up</Text>
      <View style={styles.signupTextContainer}>
        <Text style={styles.signupText}>Already have an account?</Text>
        <Text style={[styles.signupText, styles.signupButton]}> Login</Text>
      </View>
    </SafeAreaView>
  );
}

export default SignUpPage;

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
  hidePassword: {
    position: "absolute",
    right: 20,
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
  passwordContainer: {
    marginTop: 24,
    marginRight: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    marginTop: 0,
    marginRight: 0,
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
