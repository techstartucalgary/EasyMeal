import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Image,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  StatusBar,
  Platform,
  FlatList,
} from 'react-native';

import { useFonts } from 'expo-font';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { useAuthContext } from 'contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { auth } from 'utils/firebase-config';
import { testRecipes, RecipeData } from './test-results';

import { Slider } from '@miblanchard/react-native-slider';

const RecipeCard = ({ recipeInfo }) => (
  <View style={styles.recipeCard}>
    <Image
      source={require('../../assets/test-1.jpg')}
      style={styles.recipeCardImage}
    ></Image>
    <Text>{recipeInfo.title}</Text>
  </View>
);

const RecipeSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cookingTime, setCookingTime] = useState(10);
  const [filterVisible, setFilterVisible] = useState(false);
  const { navigate } = useNavigation();
  const { logout } = useAuthContext();

  const [fontsLoaded] = useFonts({
    'Inter-Bold': require('../../assets/fonts/Inter-Bold.ttf'),
    'Inter-SemiBold': require('../../assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Medium': require('../../assets/fonts/Inter-Medium.ttf'),
    'Inter-Regular': require('../../assets/fonts/Inter-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const renderItem = ({ item }) => {
    return <RecipeCard recipeInfo={item} />;
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      {filterVisible && <View style={styles.backgroundDim}></View>}
      <View style={styles.statusBarGap}></View>
      <View style={styles.searchInputContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a recipe"
          onChangeText={setSearchTerm}
        />
        <AntDesign
          name="search1"
          size={16}
          color="#3E5481"
          style={styles.searchIcon}
          onPress={() => {
            logout();
            navigate('Hero' as never, {} as never);
          }}
        />
        <TouchableWithoutFeedback
          onPress={() => setFilterVisible(!filterVisible)}
        >
          <Image
            source={require('../../assets/searchfilter-icon.png')}
            style={styles.searchFilterLogo}
            resizeMode="center"
          ></Image>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.searchResultsContainer}>
        <FlatList
          data={testRecipes}
          renderItem={renderItem}
          numColumns={2}
        ></FlatList>
      </View>

      <Modal
        animationType="slide"
        visible={filterVisible}
        transparent={true}
        onRequestClose={() => {
          setFilterVisible(!filterVisible);
        }}
      >
        <View style={styles.filterContainer}>
          <View style={styles.filterHeader}>
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color="black"
              style={styles.filterCloseButton}
              onPress={() => setFilterVisible(!filterVisible)}
            />
            <Text style={styles.filterTitle}>Filter</Text>
            <Text style={styles.filterResetButton}>Reset</Text>
          </View>

          <Text style={styles.filterTextHeader}>Cuisine</Text>
          <View style={styles.filterButtonRowContainer}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.filterButtonRow}
            >
              <Text style={[styles.filterButton, styles.filterButtonOn]}>
                Any
              </Text>
              <Text style={[styles.filterButton, styles.filterButtonOff]}>
                Italian
              </Text>
              <Text style={[styles.filterButton, styles.filterButtonOff]}>
                Mexican
              </Text>
              <Text style={[styles.filterButton, styles.filterButtonOff]}>
                Korean
              </Text>
            </ScrollView>
            <LinearGradient
              colors={['transparent', '#ffffff']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.filterButtonRowEnd}
            />
          </View>

          <Text style={styles.filterTextHeader}>Type</Text>
          <View style={styles.filterButtonRowContainer}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.filterButtonRow}
            >
              <Text style={[styles.filterButton, styles.filterButtonOn]}>
                Any
              </Text>
              <Text style={[styles.filterButton, styles.filterButtonOff]}>
                Breakfast
              </Text>
              <Text style={[styles.filterButton, styles.filterButtonOff]}>
                Lunch
              </Text>
              <Text style={[styles.filterButton, styles.filterButtonOff]}>
                Dinner
              </Text>
            </ScrollView>
            <LinearGradient
              colors={['transparent', '#ffffff']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.filterButtonRowEnd}
            />
          </View>

          <Slider
            value={cookingTime}
            onValueChange={(cookingTime) => setCookingTime(cookingTime)}
            minimumValue={10}
            maximumValue={60}
            step={1}
            minimumTrackTintColor="#6536F9"
            maximumTrackTintColor="#F4F5F7"
            containerStyle={styles.filterSlider}
          />

          <Text style={styles.filterTextHeader}>Dietary Restrictions</Text>
          <View style={styles.filterButtonRowContainer}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.filterButtonRow}
            >
              <Text style={[styles.filterButton, styles.filterButtonOn]}>
                None
              </Text>
              <Text style={[styles.filterButton, styles.filterButtonOff]}>
                Vegan
              </Text>
              <Text style={[styles.filterButton, styles.filterButtonOff]}>
                Gluten Free
              </Text>
              <Text style={[styles.filterButton, styles.filterButtonOff]}>
                Kosher
              </Text>
            </ScrollView>
            <LinearGradient
              colors={['transparent', '#ffffff']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.filterButtonRowEnd}
            />
          </View>

          <View style={styles.rowFlexDirection}>
            <Text style={styles.filterTextHeader}>Cooking Duration</Text>
            <Text style={styles.filterTextSubHeader}> (in minutes)</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default RecipeSearchPage;

const styles = StyleSheet.create({
  backgroundDim: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  filterButton: {
    marginRight: 8,
    paddingLeft: 22,
    paddingRight: 22,
    height: 44,
    borderWidth: 2,
    borderRadius: 32,

    textAlign: 'center',
    textAlignVertical: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',

    fontSize: 16,
  },
  filterButtonOff: {
    fontFamily: 'Inter-Medium',

    borderColor: '#D0DBEA',
    backgroundColor: '#fff',
    color: '#9FA5C0',
  },
  filterButtonOn: {
    fontFamily: 'Inter-Bold',

    borderColor: '#6536F9',
    backgroundColor: '#6536F9',
    color: '#fff',
  },
  filterButtonRow: {
    flex: 1,
  },
  filterButtonRowContainer: {
    marginLeft: 32,
    marginRight: 32,
    marginTop: 8,
    height: 52,
    flexDirection: 'row',
  },
  filterButtonRowEnd: {
    position: 'absolute',
    right: 0,
    width: 8,
    height: 44,
  },
  filterCloseButton: {
    position: 'absolute',
    left: 32,
  },
  filterContainer: {
    flex: 1,
    marginTop: 0,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: '#fff',
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 28,
  },
  filterResetButton: {
    position: 'absolute',
    right: 32,

    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#353535',
  },
  filterSlider: {
    flex: 1,
    marginLeft: 32,
    marginRight: 32,
    marginTop: 24,
  },
  filterTextHeader: {
    marginTop: 24,
    marginLeft: 32,

    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#3E5481',
  },
  filterTextSubHeader: {
    marginTop: 24,
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: '#9FA5C0',
  },
  filterTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#353535',
  },
  pageContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  recipeCard: {
    backgroundColor: '#ffffff',
    flex: 1,
    marginLeft: 10,
    marginTop: 16,
    marginRight: 10,
    borderRadius: 16,

    elevation: 7,
  },
  recipeCardImage: {
    flex: 1,
    margin: 12,
    borderRadius: 16,
    height: 126,
    width: 126,
  },
  rowFlexDirection: {
    flex: 1,
    flexDirection: 'row',
  },
  searchFilterLogo: {
    width: 32,
    height: 32,
    color: '#212325',

    marginLeft: 16,
    marginRight: 20,
  },
  searchIcon: {
    position: 'absolute',
    left: 24,
  },
  searchInput: {
    flex: 1,

    backgroundColor: '#F4F5F7',
    borderRadius: 32,
    height: 52,

    paddingLeft: 50,
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    textAlignVertical: 'center',
    color: '#9FA5C0',
    outlineColor: '#6536F9',
  },
  searchInputContainer: {
    marginTop: 16,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchResultsContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 0,
  },
  statusBarGap: {
    height: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  testStyle: {
    marginLeft: 20,
    marginTop: 20,
  },
});
