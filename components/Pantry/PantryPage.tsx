import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  Pressable,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

import { pantryTypes } from './pantry-types';
import { pantryItems } from './test-pantry';

const PantryPage = () => {
  const [selectedPantryType, setSelectedPantryType] =
    useState<typeof pantryTypes[number]['id']>(0);
  const [pantryCounts, setPantryCounts] = useState(pantryTypes);
  const [testItems, setTestItems] = useState(pantryItems);

  const [fontsLoaded] = useFonts({
    'Inter-Bold': require('../../assets/fonts/Inter-Bold.ttf'),
    'Inter-SemiBold': require('../../assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Medium': require('../../assets/fonts/Inter-Medium.ttf'),
    'Inter-Regular': require('../../assets/fonts/Inter-Regular.ttf'),
    'Inter-ExtraLight': require('../../assets/fonts/Inter-ExtraLight.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const calcPantryCount = () => {
    let tmpCounts = pantryCounts;
    tmpCounts[0].count = testItems.length;

    for (let i = 1; i < tmpCounts.length; i++) {
      let currID = tmpCounts[i].id;
      let currCount = 0;
      for (let j = 0; j < testItems.length; j++) {
        if (currID === testItems[j].type) {
          currCount++;
        }
      }

      tmpCounts[i].count = currCount;
    }

    setPantryCounts(tmpCounts);
  };

  const updatePantryItemCount = (id: number, change: number) => {
    let index = 0;
    for (let i = 0; i < testItems.length; i++) {
      if (testItems[i].id === id) {
        index = i;
      }
    }

    let newCount = testItems[index].count + change;
    if (newCount < 0) {
      newCount = 0;
    }

    setTestItems((prevItems) => {
      return prevItems.map((item) => {
        return item.id === id ? { ...item, count: newCount } : item;
      });
    });
  };

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
      <View style={styles.pantryTypeHeader} onLayout={calcPantryCount}>
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
      <View style={styles.pantryResultsContainer}>
        <FlatList
          data={testItems}
          keyExtractor={(item: any) => item.id}
          renderItem={({ item }) => {
            if (selectedPantryType === 0 || item.type === selectedPantryType) {
              return (
                <View style={styles.pantryCardContainer}>
                  <Image source={item.imageFP} style={styles.pantryCardImage} />
                  <View style={styles.pantryCardTextContainer}>
                    <Text style={styles.pantryCardTitle}>{item.name}</Text>
                    <Text style={styles.pantryCardType}>{item.typeText}</Text>
                  </View>
                  <View style={styles.pantryCardButtonContainer}>
                    <Pressable
                      onPress={() => updatePantryItemCount(item.id, -1)}
                    >
                      <Text style={styles.pantryCardButton}>-</Text>
                    </Pressable>
                    <Text style={styles.pantryCardCount}>{item.count}</Text>
                    <Pressable
                      onPress={() => updatePantryItemCount(item.id, 1)}
                    >
                      <Text style={styles.pantryCardButton}>+</Text>
                    </Pressable>
                  </View>
                </View>
              );
            }
            return <View></View>;
          }}
          initialNumToRender={20}
          ListFooterComponent={<View style={styles.pantryResultsDivider} />}
        />
      </View>
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
  pantryCardButton: {
    height: 22,
    width: 26,
    backgroundColor: '#3e3e3e',
    borderRadius: 8,

    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Inter-ExtraLight',
    fontSize: 24,
    lineHeight: 24,
    color: '#ffffff',
  },
  pantryCardButtonContainer: {
    position: 'absolute',
    alignSelf: 'center',
    right: 16,

    flexDirection: 'row',
    alignItems: 'center',
  },
  pantryCardContainer: {
    marginTop: 12,
    marginLeft: 16,
    marginRight: 16,
    height: 92,

    borderRadius: 20,
    backgroundColor: '#ffffff',
    shadowColor: '#5a6cea',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,

    flexDirection: 'row',
    alignItems: 'center',
  },
  pantryCardCount: {
    marginTop: 2,
    width: 40,

    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    lineHeight: 16,
    color: '#5d5d5d',
  },
  pantryCardImage: {
    marginLeft: 12,
    height: 68,
    width: 68,
    borderRadius: 16,
  },
  pantryCardTextContainer: {
    marginLeft: 16,

    flexDirection: 'column',
  },
  pantryCardTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 15,
    lineHeight: 15,
    color: '#474747',
  },
  pantryCardType: {
    marginTop: 4,

    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 14,
    color: '#bababa',
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
  pantryResultsDivider: {
    width: '100%',
    height: 20,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  pantryTypeBar: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#6536F9',
  },
  pantryTypeCount: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Inter-SemiBold',
    fontSize: 9,
    color: '#6536F9',

    paddingVertical: 2,
    width: 22,
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
