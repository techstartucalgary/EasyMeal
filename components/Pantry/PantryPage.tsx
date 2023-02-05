import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';

import { useFonts } from 'expo-font';

const PantryPage = () => {
  const [fontsLoaded] = useFonts({
    'Inter-Bold': require('../../assets/fonts/Inter-Bold.ttf'),
    'Inter-SemiBold': require('../../assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Medium': require('../../assets/fonts/Inter-Medium.ttf'),
    'Inter-Regular': require('../../assets/fonts/Inter-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.pantryPageContainer}>
      <View style={styles.pantryPageHeader}>
        <Text>TEST</Text>
      </View>
    </SafeAreaView>
  );
};

export default PantryPage;

const styles = StyleSheet.create({
  pantryPageContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pantryPageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingTop: 16,
    paddingBottom: 16,
  },
});
