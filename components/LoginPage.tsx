import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";

function LoginPage() {
  return (
    <SafeAreaView style={styles.loginContainer}>
      <View>
        <Text>Login</Text>
      </View>
    </SafeAreaView>
  );
}

export default LoginPage;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
