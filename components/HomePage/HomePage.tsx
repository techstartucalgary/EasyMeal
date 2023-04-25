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
import { useProfile } from 'services/Profile';

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
  const { profile } = useProfile();
  const { progress, weeklyGoal } = useWeeklyGoals();

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
      <View style={styles.profileSectionContainer}>
        <View
          style={[
            styles.rowSpaceBetween,
            styles.sectionHorizontalMargin,
            styles.sectionTopMargin3,
          ]}
        >
          <View style={styles.flexRow}>
            <Image
              source={require('../../assets/images/emoji-bullseye.png')}
              style={styles.mediumEmoji}
            />
            <Text style={styles.sectionHeader1}>
              Currently at{' '}
              <Text style={styles.boldText}>Level {profile?.level}</Text>
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.rowSpaceBetween,
            styles.sectionHorizontalMargin,
            styles.sectionTopMargin2,
          ]}
        >
          <Text style={styles.sectionText1}>{progress}% complete</Text>
          <Text style={styles.sectionText2}>
            Cook <Text style={styles.sectionText1}>{weeklyGoal?.goal}</Text>{' '}
            times/ week
          </Text>
        </View>
        <View
          style={[
            styles.progressBar,
            styles.sectionHorizontalMargin,
            styles.sectionTopMargin4,
          ]}
        >
          <View
            style={[
              styles.progressBar,
              { width: `${progress}%`, backgroundColor: '#74CF82' },
            ]}
          />
        </View>
        <View
          style={[
            styles.rowSpaceBetween,
            styles.sectionHorizontalMargin,
            styles.sectionTopMargin1,
          ]}
        >
          {/* {weeklyGoals.map((goal) => (
            <View key={goal.title} style={styles.flexColumn}>
              <Text style={styles.goalText}>{goal.title}</Text>
              {goal.completed ? (
                <View style={styles.goalCompleted}>
                  <Feather name="check" size={20} color="#FFFFFF" />
                </View>
              ) : (
                <View style={styles.goalNotCompleted}>
                  <Feather name="plus" size={20} color="#757678" />
                </View>
              )}
            </View>
          ))} */}
        </View>

        <Text
          style={[
            styles.sectionSubHeader1,
            styles.sectionHorizontalMargin,
            styles.sectionTopMargin2,
            styles.sectionBottomMargin1,
          ]}
        >
          Complete your goal to reach Level {(profile?.level || 0) + 1}!
        </Text>
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
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
  profileSectionContainer: {
    marginVertical: 16,

    backgroundColor: '#F2F2F2',
    borderRadius: 22,

    shadowColor: '#5A6CEA',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.07,
    shadowRadius: 13.16,

    elevation: 20,

    flexDirection: 'column',
  },
  progressBar: {
    height: 8,

    backgroundColor: '#D9D9D9',
    borderRadius: 4,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionBottomMargin1: {
    marginBottom: 20,
  },
  sectionButtonDark: {
    flex: 1,
    marginLeft: 16,
    height: 56,

    borderRadius: 28,
    backgroundColor: '#6536F9',

    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  sectionButtonDarkText: {
    fontFamily: 'Inter-Bold',
    fontSize: 15,
    color: '#FFFFFF',
  },
  sectionButtonLight: {
    flex: 1,
    height: 56,

    borderRadius: 28,
    backgroundColor: '#EEE5FF',

    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  sectionButtonLightText: {
    fontFamily: 'Inter-Bold',
    fontSize: 15,
    color: '#6536F9',
  },
  sectionHeader1: {
    fontFamily: 'Inter-Medium',
    fontSize: 20,
    color: '#474747',
  },
  sectionHeader2: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#474747',
  },
  sectionHorizontalMargin: {
    marginHorizontal: 24,
  },
  sectionText1: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#000000',
  },
  sectionText2: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: '#000000',
  },
  sectionTextInput: {
    flex: 1,
    marginLeft: 36,
    paddingRight: 16,
    height: 32,
    maxWidth: 120,
    width: 120,

    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#D0DBEA',
    borderStyle: 'solid',

    textAlign: 'right',
    fontFamily: 'Inter-Medium',
    color: '#3D3D40',
  },
  sectionTopMargin1: {
    marginTop: 28,
  },
  sectionTopMargin2: {
    marginTop: 20,
  },
  sectionTopMargin3: {
    marginTop: 16,
  },
  sectionTopMargin4: {
    marginTop: 4,
  },
  sectionVerticalMargin1: {
    marginTop: 52,
    marginBottom: 80,
  },
  sectionSubHeader1: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#808080',
  },
  sectionSubHeader2: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#A7A7A7',
    marginRight: 'auto',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mediumEmoji: {
    height: 32,
    width: 32,
    marginRight: 12,
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
  flexColumn: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  goalCompleted: {
    height: 32,
    width: 32,
    marginTop: 2,

    backgroundColor: '#74CF82',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    alignItems: 'center',
    justifyContent: 'center',
  },
  boldText: {
    fontFamily: 'Inter-Bold',
  },
  goalNotCompleted: {
    height: 32,
    width: 32,
    marginTop: 2,

    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    alignItems: 'center',
    justifyContent: 'center',
  },
  goalText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 9,
    color: '#6D6D6D',
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
