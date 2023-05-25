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

import { useAuthContext } from 'contexts/AuthContext';
import { useFavorites } from 'services/favorites';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import WeeklyProgressHeader from 'components/shared/WeeklyProgressHeader/WeeklyProgressHeader';
import EditWeeklyGoalModal from 'components/shared/EditWeeklyGoalModal/EditWeeklyGoalModal';

const HomePage = () => {
  const { currentUser } = useAuthContext();
  const [recipeCardWidth, setRecipeCardWidth] = useState(0);
  const { navigate } = useNavigation();
  const { favorites, isLoading } = useFavorites();
  const [editGoalVisible, setEditGoalVisible] = useState(false);

  const renderFavoriteList = () => {
    if (isLoading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator
            size="large"
            color="#6536f9"
            style={styles.loadingIcon}
          />
        </View>
      );
    }
    if (favorites?.length === 0 || favorites === undefined) {
      return (
        <View style={styles.centerContainer}>
          <Feather
            name="alert-circle"
            size={144}
            color="#9FA5C0"
            style={styles.shiftUp}
          />
          <Text style={styles.noResultsText}>You have no favorites added!</Text>
        </View>
      );
    }
    return (
      <FlatList
        data={favorites}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              navigate('RecipeOverview' as never, { itemId: item.id } as never);
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
                  {item.dishTypes[0].charAt(0).toUpperCase() +
                    item.dishTypes[0].slice(1)}{' '}
                  ·{' '}
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
    );
  };

  return (
    <View style={styles.homeContainer}>
      <View>
        <Text style={styles.h1text}>
          Hi {currentUser?.displayName || currentUser?.email},
        </Text>
        <Text style={styles.h2text}>Welcome Back</Text>
      </View>
      <WeeklyProgressHeader setEditGoalVisible={setEditGoalVisible} />
      <EditWeeklyGoalModal
        editGoalVisible={editGoalVisible}
        setEditGoalVisible={setEditGoalVisible}
      />
      <Text style={styles.favouritesHText}>Favourites</Text>
      <View
        style={styles.favoritesContainer}
        onLayout={({ nativeEvent }) => {
          setRecipeCardWidth(nativeEvent.layout.width / 2 - 4);
        }}
      >
        {renderFavoriteList()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 30,
    backgroundColor: '#F8F8F8',
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
    color: '#9FA5C0',
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
    marginBottom: 16,
    marginTop: 16,
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
    marginLeft: 0,
    marginTop: 0,
    marginRight: 10,
    marginBottom: 16,
    borderRadius: 16,
    elevation: 10,
  },
  favoritesContainer: {
    flex: 1,
    marginLeft: 0,
    paddingLeft: 0,
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
});

export default HomePage;
