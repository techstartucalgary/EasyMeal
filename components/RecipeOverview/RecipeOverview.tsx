/* eslint-disable no-nested-ternary */
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
  Feather,
} from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Svg, { G, Circle } from 'react-native-svg';
import React, { useEffect, useState } from 'react';
import { ParamList } from 'pages';
import {
  ExtendedIngredient,
  useRecipeInformation,
} from 'services/recipeInformation';
import {
  FavoriteRecipeType,
  useAddFavorites,
  useFavoriteDetail,
} from 'services/favorites';
import { useRemoveFavorites } from 'services/favorites/useRemoveFavorites';
import { useUpdateDailyCookedRecipes } from 'services/dailyCookedRecipes';
import { useInventoryIngredients } from 'services/inventory/inventory';

const RecipeOverview = () => {
  const route = useRoute<RouteProp<ParamList, 'RecipeOverview'>>();
  const { recipeInformation } = useRecipeInformation({
    id: route.params?.itemId,
    enabled: !!route.params?.itemId,
  });
  const { addFavorites, isLoading } = useAddFavorites();
  const { favorite, getFavoriteDetail } = useFavoriteDetail(
    route.params?.itemId || 0,
  );
  const { removeFavorites } = useRemoveFavorites();
  const { tooggleRecipe, isLoading: isLoadingDaily } =
    useUpdateDailyCookedRecipes();
  const { goBack } = useNavigation();
  const radius = 60;
  const circleCircumference = 2 * Math.PI * radius;

  const proteinWeight = recipeInformation?.nutrition.nutrients[8].amount || 0;
  const carbsWeight = recipeInformation?.nutrition.nutrients[3].amount || 0;
  const fatsWeight = recipeInformation?.nutrition.nutrients[1].amount || 0;

  const protein = proteinWeight * 4;
  const carbs = carbsWeight * 4;
  const fats = fatsWeight * 9;
  const total = recipeInformation?.nutrition.nutrients[0].amount || 0;
  const proteinPercentage = Math.round((protein / total) * 100);
  const carbsPercentage = Math.round((carbs / total) * 100);
  const fatsPercentage = Math.round((fats / total) * 100);

  const proteinStrokeDashoffset =
    circleCircumference - (circleCircumference * proteinPercentage) / 100;
  const carbsStrokeDashoffset =
    circleCircumference - (circleCircumference * carbsPercentage) / 100;
  const fatsStrokeDashoffset =
    circleCircumference - (circleCircumference * fatsPercentage) / 100;

  const proteinAngle = (protein / total) * 360;
  const carbsAngle = (carbs / total) * 360;
  const fatsAngle = proteinAngle + carbsAngle;

  const {
    ingredients: pantryIngredients,
    isLoading: inventoryLoading,
    getInventory,
    fridgeCount,
    freezerCount,
    dryPanCount,
  } = useInventoryIngredients({ storageType: undefined });

  return (
    <ScrollView>
      <Image source={{ uri: recipeInformation?.image }} style={styles.img} />
      <View style={styles.back}>
        <Pressable onPress={goBack}>
          <Ionicons name="ios-chevron-back" size={24} color="#000000" />
        </Pressable>
      </View>

      <View style={styles.favorite}>
        {isLoading ? (
          <View style={styles.loadingOverlayContainer}>
            <View style={styles.loadingIconContainer}>
              <ActivityIndicator
                size="large"
                color="#6536f9"
                style={styles.loadingIcon}
              />
            </View>
          </View>
        ) : favorite ? (
          <Pressable
            style={styles.favoriteButton}
            onPress={async () => {
              if (route.params?.itemId) {
                await removeFavorites(route.params.itemId);
                await getFavoriteDetail();
              }
            }}
          >
            <MaterialIcons name="favorite" size={24} color="#6536F9" />
          </Pressable>
        ) : (
          <Pressable
            style={styles.favoriteButton}
            onPress={async () => {
              await addFavorites({
                cuisines: recipeInformation?.cuisines || [],
                dishTypes: recipeInformation?.dishTypes || [],
                id: recipeInformation?.id || 0,
                image: recipeInformation?.image || '',
                imageType: recipeInformation?.imageType || '',
                pricePerServing: recipeInformation?.pricePerServing || 0,
                readyInMinutes: recipeInformation?.readyInMinutes || 0,
                title: recipeInformation?.title || '',
              });
              await getFavoriteDetail();
            }}
          >
            <MaterialIcons name="favorite-outline" size={24} color="#6536F9" />
          </Pressable>
        )}
        {isLoadingDaily ? (
          <View style={styles.loadingOverlayContainer}>
            <View style={styles.loadingIconContainer}>
              <ActivityIndicator
                size="large"
                color="#6536f9"
                style={styles.loadingIcon}
              />
            </View>
          </View>
        ) : (
          <Pressable
            onPress={() => {
              if (recipeInformation) {
                tooggleRecipe({
                  id: recipeInformation?.id || 0,
                  calories: total,
                  carbs,
                  fat: fats,
                  price:
                    (recipeInformation.pricePerServing / 100) *
                    recipeInformation.servings,
                  protein,
                });
              }
            }}
          >
            <Image
              source={require('../../assets/Logo.png')}
              style={styles.image}
            />
          </Pressable>
        )}
      </View>
      <View style={styles.card}>
        <View style={styles.hcontainer}>
          <Text style={styles.h1}>{recipeInformation?.title}</Text>
        </View>
        <View style={styles.infocontainer}>
          <View style={styles.timecontainer}>
            <MaterialIcons name="access-time" size={18} color="#000001" />
            <Text style={styles.time}>
              {recipeInformation?.readyInMinutes} Mins
            </Text>
          </View>
          <View style={styles.timecontainer}>
            <MaterialCommunityIcons
              name="silverware-fork-knife"
              size={18}
              color="#000001"
            />
            <Text style={styles.time}>
              {recipeInformation?.servings} Servings
            </Text>
          </View>
          <View style={styles.timecontainer}>
            <Feather name="dollar-sign" size={18} color="#000001" />
            <Text style={styles.time}>
              {(recipeInformation?.pricePerServing / 100).toFixed(2)}/ Serving
            </Text>
          </View>
        </View>
        <RenderHtml source={{ html: recipeInformation?.summary || '' }} />

        <View style={styles.macrowrapper}>
          <View style={styles.graphWrapper}>
            <Svg height="160" width="160" viewBox="0 0 180 180">
              <G rotation={-90} originX="90" originY="90">
                <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke="#C05CC2"
                  fill="transparent"
                  strokeWidth="20"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={proteinStrokeDashoffset}
                  rotation={0}
                  originX="90"
                  originY="90"
                  strokeLinecap="round"
                />
                <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke="#E3B428"
                  fill="transparent"
                  strokeWidth="20"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={carbsStrokeDashoffset}
                  rotation={proteinAngle}
                  originX="90"
                  originY="90"
                />
                <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke="#39C3B3"
                  fill="transparent"
                  strokeWidth="20"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={fatsStrokeDashoffset}
                  rotation={fatsAngle}
                  originX="90"
                  originY="90"
                />
              </G>
            </Svg>
            <View style={styles.middlechart}>
              <Text style={styles.text}>{total}</Text>
              <Text style={styles.cal}>cal</Text>
            </View>
          </View>
          <View style={styles.macros}>
            <View style={styles.stack}>
              <Text style={styles.percentCarbs}>{carbsPercentage}%</Text>
              <Text style={styles.weight}>{carbsWeight} g</Text>
              <Text style={styles.macro}>Carbs</Text>
            </View>
            <View style={styles.stack}>
              <Text style={styles.percentProtein}>{proteinPercentage}%</Text>
              <Text style={styles.weight}>{proteinWeight} g</Text>
              <Text style={styles.macro}>Protein</Text>
            </View>
            <View style={styles.stack}>
              <Text style={styles.percentFats}>{fatsPercentage}%</Text>
              <Text style={styles.weight}>{fatsWeight} g</Text>
              <Text style={styles.macro}>Fats</Text>
            </View>
          </View>
        </View>
        <View style={styles.ingwrapper}>
          <Text style={styles.ingheading}>Ingredients</Text>

          {recipeInformation?.extendedIngredients.map(
            (ingredient: ExtendedIngredient) => (
              <View style={styles.ing} key={ingredient.id}>
                {pantryIngredients.some(
                  (pantryIngredient) => pantryIngredient.id === ingredient.id,
                ) ? (
                  <FontAwesome name="check-circle" size={20} color="#6536F9" />
                ) : (
                  <FontAwesome name="circle-thin" size={20} color="#888888" />
                )}
                <Text style={styles.ingtext}>{ingredient.original} </Text>
              </View>
            ),
          )}
        </View>
        <View style={styles.instrwrapper}>
          <Text style={styles.instrheading}>Instructions</Text>
          <View style={styles.stepdesc}>
            <RenderHtml
              source={{ html: recipeInformation?.instructions || '' }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default RecipeOverview;

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: 300,
  },
  image: {
    width: '100%',
    height: 45,
    padding: 10,
    borderRadius: 100,
  },
  back: {
    borderRadius: 100,
    padding: 10,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 60,
    left: 20,
  },
  favorite: {
    position: 'absolute',
    top: 60,
    right: 20,
  },
  favoriteButton: {
    borderRadius: 100,
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 40,
    padding: 20,
    marginTop: -20,
  },
  hcontainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  h1: {
    color: '#474747',
    fontWeight: '700',
    fontSize: 17,
    marginRight: 2,
    textAlign: 'left',
  },
  time: {
    color: '#9F9F9F',
    fontWeight: '500',
    fontSize: 12,
    marginLeft: 2,
  },
  timecontainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  desc: {
    fontWeight: '600',
    color: '#9F9F9F',
    fontSize: 15,
    marginBottom: 20,
  },
  loadingIcon: {
    scaleX: 1,
    scaleY: 1,
  },
  loadingIconContainer: {
    padding: 2,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 100,

    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingOverlayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(236, 236, 236, 0.4)',
    zIndex: 10,
    marginBottom: 20,
  },
  macrowrapper: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#D0DBEA',
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  ingwrapper: {
    borderBottomWidth: 1,
    borderColor: '#D0DBEA',
    paddingTop: 15,
    paddingBottom: 15,
  },
  ing: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  ingtext: {
    marginLeft: 5,
    fontWeight: '500',
    color: '#4E4E4E',
    fontSize: 15,
  },
  ingheading: {
    color: '#474747',
    fontWeight: '700',
    fontSize: 17,
    marginBottom: 10,
  },
  instrwrapper: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  instr: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 15,
    marginRight: 10,
  },
  instrheading: {
    color: '#474747',
    fontWeight: '700',
    fontSize: 17,
    marginBottom: 10,
  },
  step: {
    backgroundColor: '#484848',
    color: '#fff',
    fontWeight: '700',
    padding: 5,
  },
  stepdesc: {
    fontWeight: '500',
    color: '#4E4E4E',
    fontSize: 15,
  },
  graphWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18,
    color: '#474747',
  },
  middlechart: {
    flexDirection: 'column',
    position: 'absolute',
  },
  cal: {
    textAlign: 'center',
    color: '#727272',
  },
  macros: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stack: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 20,
  },
  percentCarbs: {
    fontWeight: '500',
    color: '#E3B428',
    fontSize: 14,
  },
  percentProtein: {
    fontWeight: '500',
    color: '#C05CC2',
    fontSize: 14,
  },
  percentFats: {
    fontWeight: '500',
    color: '#39C3B3',
    fontSize: 14,
  },
  weight: {
    fontWeight: '600',
    fontSize: 16,
    color: '#5A5A5A',
    marginTop: 5,
  },
  macro: {
    fontWeight: '500',
    fontSize: 13,
    color: '#727272',
    marginTop: 5,
  },
  infocontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 15,
    marginTop: 10,
  },
});
