import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";

import { useFonts } from "expo-font";
import AntDesign from "@expo/vector-icons/AntDesign";

function LoginPage() {
  const [fontsLoaded] = useFonts({
    "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
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
    </SafeAreaView>
  );
}

export default LoginPage;

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    left: 20,
  },
  loginContainer: {
    flex: 1,
    backgroundColor: "#333",
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
  loginText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 18,
    color: "#212325",
  },
});
