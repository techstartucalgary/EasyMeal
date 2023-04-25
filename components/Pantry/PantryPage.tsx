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
  ActivityIndicator,
} from 'react-native';

import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Autocomplete from 'react-native-autocomplete-input';

import useDebounce from 'hooks/useDebounce';
import { pantryTypes } from './pantry-types';
import { pantryItems } from './test-pantry';

import { useSearchIngredient } from '../../services/ingredients/useSearchIngredients';
import {
  useInventoryIngredients,
  useAddToInventory,
  useDeleteFromInventory,
} from '../../services/inventory/inventory';
import { Result } from '../../services/ingredients/types';
import { StorageType } from '../../services/inventory/types';

const PantryPage = () => {
  const [selectedPantryType, setSelectedPantryType] = useState('all');
  const [pantryCounts, setPantryCounts] = useState(pantryTypes);
  const [shadowWidth, setShadowWidth] = useState(0);
  const [addItemVisible, setAddItemVisible] = useState(false);
  const [addItemName, setAddItemName] = useState('');
  const debouncedAddItemName = useDebounce(addItemName);
  const [selectedAddItem, setSelectedAddItem] = useState({
    id: 0,
    name: '',
    image: '',
  });
  const [hideAutocomplete, setHideAutocomplete] = useState(true);
  const [addItemAmount, setAddItemAmount] = useState('');
  const [addItemPantryType, setAddItemPantryType] = useState<StorageType>(
    pantryTypes[1].val as StorageType,
  );

  const [testItems, setTestItems] = useState(pantryItems);
  const {
    ingredients: ingredientSearchResult,
    isLoading: ingredientSearchLoading,
  } = useSearchIngredient({ query: debouncedAddItemName });
  const {
    ingredients,
    isLoading: inventoryLoading,
    getInventory,
    fridgeCount,
    freezerCount,
    dryPanCount,
  } = useInventoryIngredients({ storageType: undefined });
  const { addToInventory, isLoading: addLoading } = useAddToInventory();
  const {
    deleteFromInventory,
    isLoading: deleteLoading,
    deleteAllFromInventory,
  } = useDeleteFromInventory();

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
    const tmpCounts = pantryCounts;

    tmpCounts[0].count = ingredients.length;
    for (let j = 1; j < tmpCounts.length; j += 1) {
      tmpCounts[j].count = 0;
    }

    for (let i = 0; i < ingredients.length; i += 1) {
      for (let j = 1; j < tmpCounts.length; j += 1) {
        if (ingredients[i].storage === tmpCounts[j].val) {
          tmpCounts[j].count += 1;
        }
      }
    }

    setPantryCounts(tmpCounts);
  };

  const getPantryCount = (type: string) => {
    if (
      fridgeCount === undefined ||
      freezerCount === undefined ||
      dryPanCount === undefined
    ) {
      return '0';
    }

    if (type === 'all') {
      return (fridgeCount + freezerCount + dryPanCount).toString();
    }
    if (type === 'fridge') {
      return fridgeCount.toString();
    }
    if (type === 'freezer') {
      return freezerCount.toString();
    }
    if (type === 'dryPan') {
      return dryPanCount.toString();
    }

    return '0';
  };

  const setSelectedItem = (newItem: Result) => {
    setSelectedAddItem(() => ({ ...newItem }));
    setHideAutocomplete(true);
  };

  const addToPantry = () => {
    if (selectedAddItem.id === 0) {
      return;
    }

    let addCount = 1;

    if (addItemAmount.length > 0) {
      addCount = +addItemAmount;
    }

    addToInventory({
      id: selectedAddItem.id,
      name: selectedAddItem.name,
      image: selectedAddItem.image,
      quantity: addCount,
      storage: addItemPantryType,
    }).then(() => {
      getInventory();
      setAddItemVisible(!addItemVisible);
    });
  };

  const deletePantryItem = (itemID: number, itemType: StorageType) => {
    deleteFromInventory({ id: itemID, storage: itemType }).then(() =>
      getInventory(),
    );
  };

  const updatePantryItemCount = (
    change: number,
    itemID: number,
    itemName: string,
    itemImage: string,
    itemCount: number,
    itemType: StorageType,
  ) => {
    const newCount = itemCount + change;

    if (newCount < 0) {
      return;
    }

    addToInventory({
      id: itemID,
      name: itemName,
      image: itemImage,
      quantity: newCount,
      storage: itemType,
    }).then(() => {
      getInventory();
    });
  };

  const decodeIngredientText = (type: string, input: string) => {
    if (type === 'ingredientName') {
      return input.charAt(0).toUpperCase() + input.slice(1);
    }
    if (type === 'pantryName') {
      if (input === 'fridge') {
        return 'Fridge';
      }
      if (input === 'freezer') {
        return 'Freezer';
      }
      if (input === 'dryPan') {
        return 'Dry pantry';
      }
    }
  };

  const unselectAddItem = () => {
    setSelectedAddItem({
      id: 0,
      name: '',
      image: '',
    });
  };

  return (
    <SafeAreaView style={styles.pantryPageContainer}>
      {addItemVisible && <View style={styles.backgroundDim} />}
      <View style={styles.pantryPageHeader}>
        <Text style={styles.pantryHeaderText}>Pantry</Text>
        <View style={styles.pantryPageRightHeader}>
          <AntDesign name="search1" size={24} color="#3E5481" />
          <Pressable
            onPress={() => {
              setAddItemVisible(!addItemVisible);
              calcPantryCount();
            }}
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
            onPress={() => setSelectedPantryType(pantryType.val)}
            style={styles.pantryTypeVContainer}
          >
            <View style={styles.pantryTypeHContainer}>
              <Text style={styles.pantryTypeText}>{pantryType.title}</Text>
              <Text style={styles.pantryTypeCount}>
                {getPantryCount(pantryType.val)}
              </Text>
            </View>
            {selectedPantryType === pantryType.val && (
              <View style={styles.pantryTypeBar} />
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
        {(addLoading || deleteLoading || inventoryLoading) && (
          <View style={styles.loadingOverlayContainer}>
            <View style={styles.loadingIconContainer}>
              <ActivityIndicator
                size="large"
                color="#6536f9"
                style={styles.loadingIcon}
              />
            </View>
          </View>
        )}

        {ingredients?.length === 0 ? (
          <View style={styles.centeredContainer}>
            <AntDesign
              name="questioncircleo"
              size={132}
              color="#9FA5C0"
              style={styles.shiftUp}
            />
            <Text style={styles.noResultsText}>
              Your pantry is empty! You can add ingredients by pressing the "Add
              item" button in the top right.
            </Text>
          </View>
        ) : (
          <FlatList
            data={ingredients}
            keyExtractor={(item: any) => item.id}
            renderItem={({ item }) => {
              if (
                selectedPantryType === 'all' ||
                item.storage === selectedPantryType
              ) {
                return (
                  <Swipeable
                    friction={1.5}
                    rightThreshold={80}
                    overshootFriction={8}
                    renderRightActions={(progress, dragX) => (
                      <Pressable
                        onPress={() =>
                          deleteAllFromInventory({
                            id: item.id,
                            storage: item.storage,
                          }).then(() => {
                            getInventory();
                          })
                        }
                      >
                        <View style={styles.deleteButton}>
                          <Feather
                            name="trash-2"
                            size={24}
                            color="white"
                            style={styles.deleteIcon}
                          />
                        </View>
                      </Pressable>
                    )}
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
                        <Text style={styles.pantryCardTitle}>
                          {decodeIngredientText('ingredientName', item.name)}
                        </Text>
                        <Text style={styles.pantryCardType}>
                          {decodeIngredientText('pantryName', item.storage)}
                        </Text>
                      </View>
                      <View style={styles.pantryCardButtonContainer}>
                        <Pressable
                          disabled={addLoading || deleteLoading}
                          onPress={() =>
                            deletePantryItem(item.id, item.storage)
                          }
                        >
                          <Text style={styles.pantryCardButton}>-</Text>
                        </Pressable>
                        <Text style={styles.pantryCardCount}>
                          {item.quantity}
                        </Text>
                        <Pressable
                          disabled={addLoading || deleteLoading}
                          onPress={() =>
                            updatePantryItemCount(
                              1,
                              item.id,
                              item.name,
                              item.image,
                              item.quantity,
                              item.storage,
                            )
                          }
                        >
                          <Text style={styles.pantryCardButton}>+</Text>
                        </Pressable>
                      </View>
                    </View>
                  </Swipeable>
                );
              }
              return null;
            }}
            initialNumToRender={20}
            ListFooterComponent={<View style={styles.pantryResultsFooter} />}
          />
        )}
      </View>
      <Modal
        animationType="fade"
        visible={addItemVisible}
        onRequestClose={() => {
          setAddItemVisible(!addItemVisible);
        }}
        onShow={() => {
          setAddItemName('');
          unselectAddItem();
          setAddItemAmount('');
          setAddItemPantryType(pantryTypes[1].val as StorageType);
        }}
        transparent
      >
        <View style={styles.centeredView}>
          <View style={styles.addItemContainer}>
            <View style={styles.addItemHeaderContainer}>
              <Text style={styles.addItemHeaderText}>Add item</Text>
              <Pressable
                onPress={() => {
                  setAddItemVisible(!addItemVisible);
                }}
              >
                <Feather name="x" size={32} color="#33363F" />
              </Pressable>
            </View>
            <Text style={styles.addItemSubHeaderText}>Item name</Text>
            <View style={styles.addItemInputContainer}>
              <View
                style={
                  selectedAddItem.id === 0
                    ? styles.addItemNameInputContainer
                    : styles.addItemNameInputContainerS
                }
              >
                {selectedAddItem.id === 0 ? (
                  <Autocomplete
                    data={ingredientSearchResult?.results?.slice(0, 6) || []}
                    onChangeText={(text) => {
                      setAddItemName(text);
                      setHideAutocomplete(false);
                    }}
                    onFocus={() => {
                      setHideAutocomplete(false);
                    }}
                    autoCorrect={false}
                    inputContainerStyle={styles.autocompleteContainer}
                    listContainerStyle={
                      ingredientSearchResult?.results?.length === 0
                        ? styles.autocompleteEmpty
                        : styles.autocompleteListContainer
                    }
                    style={styles.addItemNameInput}
                    placeholder="e.g. Tomatoes"
                    flatListProps={{
                      keyExtractor: (item) => item.name,
                      renderItem: ({ item }) => (
                        <Pressable onPress={() => setSelectedItem(item)}>
                          <Text style={styles.autocompleteItem}>
                            {decodeIngredientText('ingredientName', item.name)}
                          </Text>
                        </Pressable>
                      ),
                      ItemSeparatorComponent: () => (
                        <View style={styles.autocompleteDivider} />
                      ),
                      style: styles.autocompleteList,
                    }}
                    hideResults={hideAutocomplete}
                  />
                ) : (
                  <Pressable>
                    <View style={styles.autocompleteSelected}>
                      <Text style={styles.autocompleteSelectedText}>
                        {decodeIngredientText(
                          'ingredientName',
                          selectedAddItem.name,
                        )}
                      </Text>
                      <Feather
                        name="x"
                        size={24}
                        color="#FFFFFF"
                        onPress={unselectAddItem}
                      />
                    </View>
                  </Pressable>
                )}
              </View>
            </View>

            <Text
              style={[
                styles.addItemSubHeaderText,
                styles.addItemAmountTopMargin,
              ]}
            >
              Amount
            </Text>
            <TextInput
              keyboardType="numeric"
              maxLength={6}
              defaultValue=""
              value={addItemAmount}
              onChangeText={(text) => {
                setAddItemAmount(text.replace(/\D/g, ''));
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
                  if (type.id === 0) {
                    return <View key={type.id} />;
                  }
                  return (
                    <Pressable
                      key={type.id}
                      onPress={() =>
                        setAddItemPantryType(type.val as StorageType)
                      }
                    >
                      <View
                        style={[
                          styles.addItemTypeButton,
                          type.val === addItemPantryType
                            ? styles.addItemTypeButtonOn
                            : styles.addItemTypeButtonOff,
                        ]}
                      >
                        <Text
                          style={[
                            styles.addItemTypeButtonText,
                            type.val === addItemPantryType
                              ? styles.addItemTypeButtonTextOn
                              : styles.addItemTypeButtonTextOff,
                          ]}
                        >
                          {type.title}
                        </Text>
                      </View>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>
            <Pressable
              onPress={addToPantry}
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
  autocompleteContainer: {
    borderWidth: 0,
  },
  autocompleteDivider: {
    height: 1,

    flex: 1,
    flexDirection: 'row',

    borderRadius: 1,
    backgroundColor: '#F1F1FA',
  },
  autocompleteEmpty: {
    borderWidth: 0,
  },
  autocompleteItem: {
    marginVertical: 6,
    marginHorizontal: 0,

    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#91919F',
  },
  autocompleteList: {
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 16,
    marginRight: 16,
    borderWidth: 0,
  },
  autocompleteListContainer: {
    marginTop: 4,
    marginLeft: 20,
    marginRight: 20,
    zIndex: 5,

    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#F1F1FA',
    borderStyle: 'solid',

    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  autocompleteSelected: {
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 20,
    marginRight: 20,
    paddingRight: 12,
    height: 48,

    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#6536F9',
    borderStyle: 'solid',
    backgroundColor: '#6536F9',

    flexDirection: 'row',
    alignItems: 'center',
  },
  autocompleteSelectedText: {
    marginLeft: 16,
    marginRight: 16,

    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
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
  addItemAmountTopMargin: {
    marginTop: 64,
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
  addItemInputContainer: {
    flexDirection: 'column',
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
  addItemNameInputContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
  addItemNameInputContainerS: {
    position: 'absolute',
    left: 0,
    marginRight: 20,
    top: 0,
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
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  loadingIcon: {
    scaleX: 2,
    scaleY: 2,
  },
  loadingIconContainer: {
    padding: 64,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 40,

    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingOverlayContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(236, 236, 236, 0.4)',
    zIndex: 10,
  },
  noResultsText: {
    textAlign: 'center',
    textAlignVertical: 'center',

    fontFamily: 'Inter-Medium',
    fontSize: 18,
    lineHeight: 26,
    color: '#9FA5C0',

    marginTop: 32,
    marginLeft: 24,
    marginRight: 24,
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
  shiftUp: {
    marginTop: -64,
  },
});
