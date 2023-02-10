import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import { MaterialIcons, Entypo, Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Svg, { G, Circle } from 'react-native-svg';
import React from 'react';
import { ParamList } from 'pages';
import ViewMoreText from 'react-native-view-more-text';
import { useRecipeInformation } from 'services/recipeInformation';

const radius = 60;
const circleCircumference = 2 * Math.PI * radius;

const proteinWeight = 80;
const carbsWeight = 20;
const fatsWeight = 15;

const protein = proteinWeight * 4;
const carbs = carbsWeight * 4;
const fats = fatsWeight * 9;
const total = protein + carbs + fats;

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

const RecipeOverview = () => {
  const route = useRoute<RouteProp<ParamList, 'RecipeOverview'>>();
  const { recipeInformation } = useRecipeInformation({
    id: route.params?.itemId,
    enabled: !!route.params?.itemId,
  });
  const { goBack } = useNavigation();
  const radius = 60;
  const circleCircumference = 2 * Math.PI * radius;

  const proteinWeight = recipeInformation?.nutrition.nutrients[8].amount;
  const carbsWeight = recipeInformation?.nutrition.nutrients[3].amount;
  const fatsWeight = recipeInformation?.nutrition.nutrients[1].amount;

  const protein = proteinWeight * 4;
  const carbs = carbsWeight * 4;
  const fats = fatsWeight * 9;
  const total = recipeInformation?.nutrition.nutrients[0].amount;
  const proteinPercentage = Math.round((protein / total) * 100);
  // const proteinPercentage =
  //   recipeInformation?.nutrition.caloricBreakdown.percentProtein;
  // const carbsPercentage =
  //   recipeInformation?.nutrition.caloricBreakdown.percentCarbs;
  // const fatsPercentage =
  //   recipeInformation?.nutrition.caloricBreakdown.percentFat;
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

  return (
    <ScrollView>
      <Image source={{ uri: recipeInformation?.image }} style={styles.img} />
      <View style={styles.back}>
        <Pressable onPress={goBack}>
          <Ionicons name="ios-chevron-back" size={24} color="#000000" />
        </Pressable>
      </View>
      <View style={styles.favorite}>
        <MaterialIcons name="favorite" size={24} color="#000000" />
      </View>
      <View style={styles.card}>
        <View style={styles.hcontainer}>
          <Text style={styles.h1}>{recipeInformation?.title}</Text>
          <View style={styles.timecontainer}>
            <MaterialIcons name="access-time" size={18} color="#9F9F9F" />
            <Text style={styles.time}>
              {recipeInformation?.readyInMinutes} mins
            </Text>
          </View>
        </View>

        <RenderHtml source={{ html: recipeInformation?.summary }} />

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

          {recipeInformation?.extendedIngredients.map((ingredient: any) => (
            <View style={styles.ing} key={ingredient}>
              <Entypo name="circle" size={20} color="#888888" />
              <Text style={styles.ingtext}>{ingredient.original}</Text>
            </View>
          ))}
        </View>
        <View style={styles.instrwrapper}>
          <Text style={styles.instrheading}>Instructions</Text>

          <View style={styles.stepdesc}>
            <RenderHtml source={{ html: recipeInformation?.instructions }} />
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
  back: {
    borderRadius: 100,
    padding: 10,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 60,
    left: 20,
  },
  favorite: {
    borderRadius: 100,
    padding: 10,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 60,
    right: 20,
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
    marginBottom: 15,
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
});
