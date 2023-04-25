import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Pressable,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuthContext } from 'contexts/AuthContext';
import { useFavorites } from 'services/favorites';
import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useWeeklyGoals } from 'services/weeklyGoals';

const HomePage = () => {
  const { currentUser } = useAuthContext();
  const [recipeCardWidth, setRecipeCardWidth] = useState(0);
  const { navigate } = useNavigation();
  const { favorites, isLoading, getFavorites } = useFavorites();
  const [fontsLoaded] = useFonts({
    'Inter-Bold': require('../../assets/fonts/Inter-Bold.ttf'),
    'Inter-SemiBold': require('../../assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Medium': require('../../assets/fonts/Inter-Medium.ttf'),
    'Inter-Regular': require('../../assets/fonts/Inter-Regular.ttf'),
  });
  const { progress } = useWeeklyGoals();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.homeContainer}>
      <View style={styles.hContainer}>
        <Text style={styles.h1text}>
          Hi {currentUser?.displayName || currentUser?.email},
        </Text>
        <Text style={styles.h2text}>Welcome Back</Text>
      </View>
      <View style={styles.goalWrapper}>
        <Text style={styles.goalHText}>Your Weekly Goal</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>{progress}% complete</Text>
          <Text style={styles.statusText}>
            <Text style={styles.timesText}>5</Text> times/ week
          </Text>
        </View>
        <Progress.Bar
          width={340}
          progress={progress / 100}
          color="#74CF82"
          unfilledColor="#D9D9D9"
          borderWidth={0}
          height={10}
          borderRadius={100}
        />
        <Text style={styles.motivateText}>You got this!</Text>
        <View style={styles.iconContainer}>
          <View style={styles.icon}>
            <Icon name="add" size={30} color="#757678" />
          </View>
          <View style={styles.icon}>
            <Icon name="add" size={30} color="#757678" />
          </View>
          <View style={styles.icon}>
            <Icon name="add" size={30} color="#757678" />
          </View>
          <View style={styles.icon}>
            <Icon name="add" size={30} color="#757678" />
          </View>
          <View style={styles.icon}>
            <Icon name="add" size={30} color="#757678" />
          </View>
          <View style={styles.icon}>
            <Icon name="add" size={30} color="#757678" />
          </View>
          <View style={styles.icon}>
            <Icon name="add" size={30} color="#757678" />
          </View>
        </View>
      </View>
      <Text style={styles.favouritesHText}>Favourites</Text>
      <View
        style={styles.favoritesContainer}
        onLayout={({ nativeEvent }) => {
          setRecipeCardWidth(nativeEvent.layout.width / 2 - 4);
        }}
      >
        {isLoading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator
              size="large"
              color="#6536f9"
              style={styles.loadingIcon}
            />
          </View>
        ) : favorites?.length === 0 ? (
          <View style={styles.centerContainer}>
            <Feather
              name="alert-circle"
              size={144}
              color="#9FA5C0"
              style={styles.shiftUp}
            />
            <Text style={styles.noResultsText}>
              You have no favorites added!
            </Text>
          </View>
        ) : (
          <FlatList
            data={favorites}
            keyExtractor={(item: any) => item.id}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  navigate(
                    'RecipeOverview' as never,
                    { itemId: item.id } as never,
                  );
                }}
              >
                <View style={[styles.recipeCard, { width: recipeCardWidth }]}>
                  <Image
                    source={{ uri: item.image }}
                    style={[
                      styles.recipeCardImage,
                      {
                        width: recipeCardWidth - 24,
                        height: recipeCardWidth - 24,
                      },
                    ]}
                  />

                  <Text style={styles.recipeCardTextHeader} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <View style={styles.recipeCardSubHeader}>
                    <Text style={styles.recipeCardTextSubHeader}>
                      {item.dishTypes[0]} ·{' '}
                    </Text>
                    <Text style={styles.recipeCardTextSubHeader}>
                      {item.readyInMinutes} mins
                    </Text>
                  </View>
                </View>
              </Pressable>
            )}
            numColumns={2}
            initialNumToRender={4}
            ListHeaderComponent={<View style={styles.searchResultsDivider} />}
            ListFooterComponent={<View style={styles.searchResultsDivider} />}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  hContainer: {
    paddingBottom: 20,
  },
  homeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 27,
    paddingRight: 27,
    paddingTop: 60,
    paddingBottom: 30,
  },
  searchResultsDivider: {
    width: '100%',
    height: 12,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  h1text: {
    color: '#535353',
    fontWeight: '700',
    fontSize: 20,
  },
  loadingIcon: {
    scaleX: 2,
    scaleY: 2,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  h2text: {
    color: '#222222',
    fontWeight: '600',
    fontSize: 24,
  },
  goalWrapper: {
    backgroundColor: '#F2F2F2',
    borderRadius: 16,
    padding: 15,
    marginBottom: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  goalHText: {
    color: '#222222',
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 15,
  },
  noResultsText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: 'black',
    marginTop: 24,
    marginLeft: 24,
    marginRight: 24,
  },
  progressText: {
    color: '#222222',
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 5,
  },
  statusText: {
    color: '#222222',
    fontWeight: '400',
    fontSize: 18,
  },
  shiftUp: {
    marginTop: -64,
  },
  timesText: {
    fontWeight: '600',
  },
  motivateText: {
    fontWeight: '400',
    fontSize: 18,
    color: '#151515',
    marginTop: 20,
    marginBottom: 20,
  },
  favouritesHText: {
    color: '#222222',
    fontWeight: '600',
    fontSize: 20,
    marginBottom: 15,
  },
  icon: {
    backgroundColor: 'white',
    borderRadius: 100,
    padding: 0,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recipeCard: {
    backgroundColor: '#ffffff',
    marginLeft: 10,
    marginTop: 0,
    marginRight: 10,
    marginBottom: 16,
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
  favoritesContainer: {
    flex: 1,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
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
});

export default HomePage;
