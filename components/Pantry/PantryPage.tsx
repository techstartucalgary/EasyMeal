import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  Pressable,
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

import { pantryTypes } from './pantry-types';

const PantryPage = () => {
  const [selectedPantryType, setSelectedPantryType] =
    useState<typeof pantryTypes[number]['id']>(0);

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
        <Text style={styles.pantryHeaderText}>Pantry</Text>
        <View style={styles.pantryPageRightHeader}>
          <AntDesign name="search1" size={24} color="#3E5481" />
          <Pressable style={styles.addItemButton}>
            <AntDesign
              name="pluscircle"
              size={20}
              color="#000000"
              style={styles.addItemIcon}
            />
            <Text style={styles.addItemText}>Add item</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.pantryTypeHeader}>
        {pantryTypes.map((pantryType) => (
          <Pressable
            key={pantryType.id}
            onPress={() => setSelectedPantryType(pantryType.id)}
            style={styles.pantryTypeVContainer}
          >
            <View style={styles.pantryTypeHContainer}>
              <Text style={styles.pantryTypeText}>{pantryType.title}</Text>
              <Text style={styles.pantryTypeCount}>{pantryType.count}</Text>
            </View>
            {selectedPantryType === pantryType.id && (
              <View style={styles.pantryTypeBar}></View>
            )}
          </Pressable>
        ))}
      </View>
      <View style={styles.pantryResultsContainer}></View>
    </SafeAreaView>
  );
};

export default PantryPage;

const styles = StyleSheet.create({
  addItemButton: {
    marginLeft: 24,
    height: 40,
    borderRadius: 32,

    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#EDEDED',
  },
  addItemIcon: {
    marginLeft: 8,
  },
  addItemText: {
    marginLeft: 8,
    marginRight: 8,

    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#000000',
  },
  pantryHeaderText: {
    position: 'relative',
    fontFamily: 'Inter-SemiBold',
    fontSize: 28,
    color: '#222222',
  },
  pantryPageContainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  pantryPageHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

    paddingTop: 12,
    marginLeft: 24,
    marginRight: 24,
  },
  pantryPageRightHeader: {
    position: 'absolute',
    right: 0,

    flexDirection: 'row',
    alignItems: 'center',
  },
  pantryResultsContainer: {
    position: 'relative',
    left: 0,
    top: -2,

    flex: 1,
    flexDirection: 'column',

    backgroundColor: '#FFFFFF',
  },
  pantryTypeBar: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#6536F9',
  },
  pantryTypeCount: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 9,
    color: '#6536F9',

    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 10,
    backgroundColor: '#EEE5FF',

    marginRight: 4,
  },
  pantryTypeHContainer: {
    flexDirection: 'row',

    marginBottom: 8,
  },
  pantryTypeHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',

    marginTop: 20,
    marginLeft: 24,
    marginRight: 24,
  },
  pantryTypeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#6536F9',

    marginRight: 4,
    marginLeft: 4,
  },
  pantryTypeVContainer: {
    flexDirection: 'column',
  },
});
