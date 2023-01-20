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
  Pressable,
} from 'react-native';
import { SPOON_API_KEY } from '@env';
import { useFonts } from 'expo-font';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

import { LinearGradient } from 'expo-linear-gradient';

import { useAuthContext } from 'contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { auth } from 'utils/firebase-config';
import { Slider } from '@miblanchard/react-native-slider';
import { testRecipes, RecipeData } from './test-results';
import { cuisines, types, diets } from './filter-options';

import { useRecipes } from '../../services/searchRecipe/useSearchRecipes';

const RecipeSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cookingTime, setCookingTime] = useState(10);
  const [filterVisible, setFilterVisible] = useState(false);
  const [cardDimension, setCardDimension] = useState(0);
  const { navigate } = useNavigation();
  const { logout } = useAuthContext();

  const [selectedCuisine, setSelectedCuisine] =
    useState<typeof cuisines[number]['searchTerm']>('African');
  const [selectedType, setSelectedType] =
    useState<typeof types[number]['searchTerm']>('main course');
  const [selectedDiet, setSelectedDiet] =
    useState<typeof diets[number]['searchTerm']>('Gluten Free');

  const { recipeList, isLoading } = useRecipes({
    cuisine: selectedCuisine,
    diet: selectedDiet,
    type: selectedType,
    maxReadyTime: cookingTime,
  });

  const [fontsLoaded] = useFonts({
    'Inter-Bold': require('../../assets/fonts/Inter-Bold.ttf'),
    'Inter-SemiBold': require('../../assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Medium': require('../../assets/fonts/Inter-Medium.ttf'),
    'Inter-Regular': require('../../assets/fonts/Inter-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleCardLayout = ({ nativeEvent }) => {
    setCardDimension(nativeEvent.layout.width - 24);
  };

  const renderItem = ({ item }) => (
    <View style={styles.recipeCard} onLayout={handleCardLayout}>
      {/* {JSON.stringify(item)} */}
      <Text>hello</Text>
      <Text>{SPOON_API_KEY}</Text>
      {/* <Image
        source={{ uri: image }}
        style={[
          styles.recipeCardImage,
          { width: cardDimension, height: cardDimension },
        ]}
      />

      <Text style={styles.recipeCardTextHeader} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.recipeCardSubHeader}>
        <Text style={styles.recipeCardTextSubHeader}>Breakfast · </Text>
        <Text style={styles.recipeCardTextSubHeader}>0 mins</Text>
      </View> */}
    </View>
  );

  const FilterSliderValue = () => (
    <>
      {cookingTime != 60 && (
        <Text
          style={[
            styles.filterSliderNumberText,
            styles.filterSliderNumberMargin,
            styles.filterSliderNumberPurple,
          ]}
        >
          {cookingTime}
        </Text>
      )}
    </>
  );

  return (
    <SafeAreaView style={styles.pageContainer}>
      {filterVisible && <View style={styles.backgroundDim} />}
      <View style={styles.statusBarGap} />
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
            style={styles.searchFilterIcon}
            resizeMode="center"
          />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.searchResultsContainer}>
        <Text>{JSON.stringify(recipeList?.results)}</Text>
        <Text>{`https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOON_API_KEY}`}</Text>
        <FlatList
          data={recipeList?.results || []}
          renderItem={renderItem}
          numColumns={2}
        />
      </View>

      <Modal
        animationType="slide"
        visible={filterVisible}
        transparent
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
            <Text
              style={styles.filterResetButton}
              onPress={() => {
                setSelectedCuisine('African');
                setSelectedType('main course');
                setSelectedDiet('Gluten Free');
                setCookingTime(10);
              }}
            >
              Reset
            </Text>
          </View>

          <Text style={styles.filterTextHeader}>Cuisine</Text>
          <View style={styles.filterButtonRowContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.filterButtonRow}
            >
              {cuisines.map((cuisine) => (
                <Pressable
                  onPress={() => setSelectedCuisine(cuisine.searchTerm)}
                >
                  <Text
                    style={[
                      styles.filterButton,
                      selectedCuisine === cuisine.searchTerm
                        ? styles.filterButtonOn
                        : styles.filterButtonOff,
                    ]}
                  >
                    {cuisine.title}
                  </Text>
                </Pressable>
              ))}
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
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.filterButtonRow}
            >
              {types.map((type) => (
                <Pressable onPress={() => setSelectedType(type.searchTerm)}>
                  <Text
                    style={[
                      styles.filterButton,
                      selectedType === type.searchTerm
                        ? styles.filterButtonOn
                        : styles.filterButtonOff,
                    ]}
                  >
                    {type.title}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
            <LinearGradient
              colors={['transparent', '#ffffff']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.filterButtonRowEnd}
            />
          </View>

          <Text style={styles.filterTextHeader}>Dietary Restrictions</Text>
          <View style={styles.filterButtonRowContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.filterButtonRow}
            >
              {diets.map((diet) => (
                <Pressable onPress={() => setSelectedDiet(diet.searchTerm)}>
                  <Text
                    style={[
                      styles.filterButton,
                      selectedDiet === diet.searchTerm
                        ? styles.filterButtonOn
                        : styles.filterButtonOff,
                    ]}
                  >
                    {diet.title}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
            <LinearGradient
              colors={['transparent', '#ffffff']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.filterButtonRowEnd}
            />
          </View>

          <Text style={styles.filterTextHeader}>
            Cooking Duration
            <Text style={styles.filterTextSubHeader}> (in minutes)</Text>
          </Text>

          <View style={styles.filterSliderNumberContainer}>
            {cookingTime >= 15 && (
              <Text
                style={[
                  styles.filterSliderNumberText,
                  styles.filterSliderNumberLeft,
                  styles.filterSliderNumberPurple,
                ]}
              >
                {'<'}10
              </Text>
            )}

            {(cookingTime <= 55 || cookingTime == 60) && (
              <Text
                style={[
                  styles.filterSliderNumberText,
                  styles.filterSliderNumberRight,
                  cookingTime < 60
                    ? styles.filterSliderNumberGray
                    : styles.filterSliderNumberPurple,
                ]}
              >
                {'>'}60
              </Text>
            )}
          </View>

          <Slider
            value={cookingTime}
            onValueChange={(cookingTime) => setCookingTime(cookingTime)}
            minimumValue={10}
            maximumValue={60}
            step={1}
            minimumTrackTintColor="#6536F9"
            maximumTrackTintColor="#F4F5F7"
            thumbTintColor="#6536F9"
            containerStyle={styles.filterSlider}
            trackStyle={styles.sliderTrack}
            thumbStyle={styles.sliderThumb}
            renderAboveThumbComponent={FilterSliderValue}
          />
          <Text
            style={styles.filterShowResults}
            onPress={() => setFilterVisible(!filterVisible)}
          >
            Show results
          </Text>
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
  filterShowResults: {
    marginTop: 60,
    alignSelf: 'center',

    width: 156,
    height: 56,
    backgroundColor: '#6536F9',
    borderRadius: 32,

    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Inter-Bold',
    fontSize: 15,
    color: '#FFFFFF',
  },
  filterSlider: {
    height: 24,
    marginLeft: 32,
    marginRight: 32,
    marginTop: 24,
  },
  filterSliderNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 24,
  },
  filterSliderNumberGray: {
    color: '#9FA5C0',
  },
  filterSliderNumberLeft: {
    position: 'absolute',
    left: 32,
  },
  filterSliderNumberMargin: {
    position: 'absolute',
    left: 34,
    bottom: -11,
  },
  filterSliderNumberPurple: {
    color: '#6536F9',
  },
  filterSliderNumberRight: {
    position: 'absolute',
    right: 32,
  },
  filterSliderNumberText: {
    fontFamily: 'Inter-Bold',
    fontSize: 15,
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
    marginTop: 8,
    marginRight: 10,
    marginBottom: 8,
    borderRadius: 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  recipeCardImage: {
    marginTop: 12,
    marginLeft: 12,

    borderRadius: 16,
  },
  recipeCardSubHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 8,
    marginLeft: 12,
    marginBottom: 20,
  },
  recipeCardTextHeader: {
    marginTop: 12,
    marginLeft: 12,
    marginRight: 12,

    fontFamily: 'Inter-Bold',
    fontSize: 17,
    color: '#474747',
  },
  recipeCardTextSubHeader: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#9FA5C0',
  },
  rowFlexDirection: {
    flex: 1,
    flexDirection: 'row',
  },
  searchFilterIcon: {
    width: 32,
    height: 32,

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
    marginBottom: 8,
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
  sliderThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  sliderTrack: {
    height: 8,
    borderRadius: 4,
  },
  statusBarGap: {
    height: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  testStyle: {
    marginLeft: 20,
    marginTop: 20,
  },
});
