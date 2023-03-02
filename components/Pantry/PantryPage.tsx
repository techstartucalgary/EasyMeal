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
  Modal,
  Dimensions,
  TextInput,
} from 'react-native';

import { AntDesign, Feather } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { pantryTypes } from './pantry-types';
import { pantryItems } from './test-pantry';

import { useSearchIngredient } from '../../services/ingredients/useSearchIngredients';
import {
  useInventoryIngredients,
  useAddToInventory,
  useDeleteFromInventory,
} from '../../services/inventory/inventory';

const PantryPage = () => {
  const [selectedPantryType, setSelectedPantryType] =
    useState<typeof pantryTypes[number]['id']>(0);
  const [pantryCounts, setPantryCounts] = useState(pantryTypes);
  const [shadowWidth, setShadowWidth] = useState(0);
  const [addItemVisible, setAddItemVisible] = useState(false);
  const [addItemName, setAddItemName] = useState('');
  const [addItemAmount, setAddItemAmount] = useState('');
  const [addItemPantryType, setAddItemPantryType] = useState(pantryTypes[1].id);

  const [testItems, setTestItems] = useState(pantryItems);
  const {
    ingredients: ingredientSearchIngredients,
    isLoading: ingredientSearchLoading,
  } = useSearchIngredient({ query: 'Bread' });
  const {
    ingredients,
    isLoading: inventoryLoading,
    getInventory,
  } = useInventoryIngredients({ storageType: 'dryPan' });
  const { addToInventory, isLoading: addLoading } = useAddToInventory();
  const { deleteFromInventory, isLoading: deleteLoading } =
    useDeleteFromInventory();

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

  const deletePantryItem = (id: number) => {
    deleteFromInventory({ ingredientId: 10120129, storage: 'dryPan' }).then(
      () => getInventory(),
    );
  };

  const testAddItem = () => {
    addToInventory({
      storage: 'dryPan',
      id: 10120129,
      image: 'flour.png',
      name: 'bread flour',
      quantity: 4,
    }).then(() => getInventory());

    setAddItemVisible(!addItemVisible);
    console.log(ingredients);
  };

  return (
    <SafeAreaView style={styles.pantryPageContainer} onLayout={calcPantryCount}>
      {addItemVisible && <View style={styles.backgroundDim}></View>}
      <View style={styles.pantryPageHeader}>
        <Text style={styles.pantryHeaderText}>Pantry</Text>
        <View style={styles.pantryPageRightHeader}>
          <AntDesign name="search1" size={24} color="#3E5481" />
          <Pressable
            onPress={() => setAddItemVisible(!addItemVisible)}
            style={styles.addItemButton}
          >
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
      <View
        style={styles.pantryResultsContainer}
        onLayout={({ nativeEvent }) => {
          setShadowWidth(nativeEvent.layout.width - 32);
        }}
      >
        {addLoading && <Text>TESTADD</Text>}
        {deleteLoading && <Text>TESTDELETE</Text>}
        {inventoryLoading && <Text>TESTINVENTORY</Text>}
        <FlatList
          data={ingredients}
          keyExtractor={(item: any) => item.id}
          renderItem={({ item }) => {
            if (selectedPantryType === 0) {
              return (
                <Swipeable
                  friction={1.5}
                  rightThreshold={80}
                  overshootFriction={8}
                  renderRightActions={(progress, dragX) => {
                    return (
                      <Pressable onPress={() => deletePantryItem(item.id)}>
                        <View style={styles.deleteButton}>
                          <Feather
                            name="trash-2"
                            size={24}
                            color="white"
                            style={styles.deleteIcon}
                          />
                        </View>
                      </Pressable>
                    );
                  }}
                >
                  <View
                    style={[
                      styles.pantryCardContainer,
                      styles.pantryCardShadow,
                    ]}
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={styles.pantryCardImage}
                    />
                    <View style={styles.pantryCardTextContainer}>
                      <Text style={styles.pantryCardTitle}>{item.name}</Text>
                      <Text style={styles.pantryCardType}>Dry pantry</Text>
                    </View>
                    <View style={styles.pantryCardButtonContainer}>
                      <Pressable
                        onPress={() => updatePantryItemCount(item.id, -1)}
                      >
                        <Text style={styles.pantryCardButton}>-</Text>
                      </Pressable>
                      <Text style={styles.pantryCardCount}>
                        {item.quantity}
                      </Text>
                      <Pressable
                        onPress={() => updatePantryItemCount(item.id, 1)}
                      >
                        <Text style={styles.pantryCardButton}>+</Text>
                      </Pressable>
                    </View>
                  </View>
                </Swipeable>
              );
            }
            return <View></View>;
          }}
          initialNumToRender={20}
          ListFooterComponent={<View style={styles.pantryResultsFooter} />}
        />
      </View>

      <Modal
        animationType="fade"
        visible={addItemVisible}
        onRequestClose={() => {
          setAddItemVisible(!addItemVisible);
        }}
        transparent={true}
      >
        <View style={styles.centeredView}>
          <View style={styles.addItemContainer}>
            <View style={styles.addItemHeaderContainer}>
              <Text style={styles.addItemHeaderText}>Add item</Text>
              <Pressable onPress={() => setAddItemVisible(!addItemVisible)}>
                <Feather name="x" size={32} color="#33363F" />
              </Pressable>
            </View>
            <Text style={styles.addItemSubHeaderText}>Item name</Text>
            <TextInput
              onChangeText={setAddItemName}
              placeholder="e.g. Tomatoes"
              style={styles.addItemNameInput}
            />
            <Text style={styles.addItemSubHeaderText}>Amount</Text>
            <TextInput
              keyboardType="numeric"
              maxLength={6}
              onChangeText={(text) => {
                setAddItemAmount(text.replace('/[^0-9]/g', ''));
              }}
              placeholder="e.g. 4"
              style={styles.addItemAmountInput}
            />
            <Text style={styles.addItemSubHeaderText}>Location</Text>
            <View style={styles.addItemButtonRowContainer}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.addItemButtonRow}
              >
                {pantryTypes.map((type) => {
                  if (type.id == 0) {
                    return <View key={type.id}></View>;
                  } else {
                    return (
                      <Pressable
                        key={type.id}
                        onPress={() => setAddItemPantryType(type.id)}
                      >
                        <View
                          style={[
                            styles.addItemTypeButton,
                            type.id == addItemPantryType
                              ? styles.addItemTypeButtonOn
                              : styles.addItemTypeButtonOff,
                          ]}
                        >
                          <Text
                            style={[
                              styles.addItemTypeButtonText,
                              type.id == addItemPantryType
                                ? styles.addItemTypeButtonTextOn
                                : styles.addItemTypeButtonTextOff,
                            ]}
                          >
                            {type.title}
                          </Text>
                        </View>
                      </Pressable>
                    );
                  }
                })}
              </ScrollView>
            </View>
            <Pressable
              onPress={testAddItem}
              style={styles.addItemAddItemButton}
            >
              <Text style={styles.addItemAddItemButtonText}>Add item</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PantryPage;

const styles = StyleSheet.create({
  addItemAddItemButton: {
    marginTop: 40,
    marginBottom: 40,
    height: 56,
    width: 156,

    borderRadius: 32,
    backgroundColor: '#6536F9',

    alignSelf: 'center',
    justifyContent: 'center',
  },
  addItemAddItemButtonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    alignSelf: 'center',

    fontFamily: 'Inter-Bold',
    fontSize: 15,
    color: '#FFFFFF',
  },
  addItemAmountInput: {
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 20,
    paddingLeft: 16,
    height: 48,
    width: 100,

    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#F1F1FA',
    borderStyle: 'solid',

    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#91919F',
  },
  addItemButton: {
    marginLeft: 24,
    height: 40,
    borderRadius: 32,

    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#EDEDED',
  },
  addItemButtonRow: {
    flex: 1,
  },
  addItemButtonRowContainer: {
    marginTop: 4,
    marginLeft: 20,
    marginRight: 20,

    flexDirection: 'row',
    alignItems: 'center',
  },
  addItemButtonRowEnd: {
    position: 'absolute',
    right: 0,
    width: 8,
    height: 48,
  },
  addItemContainer: {
    marginLeft: 24,
    marginRight: 24,

    borderRadius: 24,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  addItemHeaderContainer: {
    marginTop: 32,
    marginLeft: 20,
    marginRight: 20,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addItemHeaderText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: '#222222',
  },
  addItemIcon: {
    marginLeft: 8,
  },
  addItemNameInput: {
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 16,
    height: 48,

    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#F1F1FA',
    borderStyle: 'solid',

    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#91919F',
  },
  addItemSubHeaderText: {
    marginTop: 12,
    marginLeft: 20,

    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#5D6066',
  },
  addItemText: {
    marginLeft: 8,
    marginRight: 8,

    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#000000',
  },
  addItemTypeButton: {
    marginRight: 8,
    height: 48,

    borderRadius: 24,

    alignItems: 'center',
    justifyContent: 'center',
  },
  addItemTypeButtonOff: {
    borderWidth: 2,
    borderColor: '#D0DBEA',
    borderStyle: 'solid',
    backgroundColor: '#FFFFFF',
  },
  addItemTypeButtonOn: {
    borderWidth: 2,
    borderColor: '#6536F9',
    borderStyle: 'solid',
    backgroundColor: '#6536F9',
  },
  addItemTypeButtonText: {
    marginLeft: 24,
    marginRight: 24,

    fontSize: 15,
  },
  addItemTypeButtonTextOff: {
    fontFamily: 'Inter-Medium',
    color: '#9FA5C0',
  },
  addItemTypeButtonTextOn: {
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  backgroundDim: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: Dimensions.get('screen').height,
    zIndex: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  deleteButton: {
    marginTop: 4,
    marginBottom: 10,
    marginRight: 16,
    marginLeft: -80,
    borderLeftColor: '#eb5c5c',
    borderLeftWidth: 64,
    height: 92,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#eb5c5c',
  },
  deleteIcon: {
    marginLeft: 28,
    marginRight: 28,
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
    marginTop: 4,
    marginBottom: 10,
    marginLeft: 16,
    marginRight: 16,
    height: 92,

    borderRadius: 20,
    backgroundColor: '#ffffff',

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
  pantryCardShadow: {
    shadowColor: '#5a6cea',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
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
    height: 12,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  pantryResultsFooter: {
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
