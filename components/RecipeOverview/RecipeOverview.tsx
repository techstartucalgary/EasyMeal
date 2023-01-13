import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

const RecipeOverview = () => {
  return (
    <ScrollView>
      <Image source={require('../../assets/heroimg1.png')} style={styles.img} />
      <View style={styles.back}>
        <Ionicons name="ios-chevron-back" size={24} color="#000000" />
      </View>
      <View style={styles.favorite}>
        <MaterialIcons name="favorite" size={24} color="#000000" />
      </View>
      <View style={styles.card}>
        <View style={styles.hcontainer}>
          <Text style={styles.h1}>Korean Rice Bowl</Text>
          <View style={styles.timecontainer}>
            <MaterialIcons name="access-time" size={18} color="#9F9F9F" />
            <Text style={styles.time}>40 mins</Text>
          </View>
        </View>
        <Text style={styles.desc}>
          Hearty Korean BBQ Bowls made with bulgogi beef, garlic View More
        </Text>
        <View style={styles.macrowrapper}></View>
        <View style={styles.ingwrapper}>
          <Text style={styles.ingheading}>Ingredients</Text>
          <View style={styles.ing}>
            <Entypo name="circle" size={20} color="#888888" />
            <Text style={styles.ingtext}>1/2 pound steak</Text>
          </View>
          <View style={styles.ing}>
            <Entypo name="circle" size={20} color="#888888" />
            <Text style={styles.ingtext}>6 cloves garlic</Text>
          </View>
          <View style={styles.ing}>
            <Entypo name="circle" size={20} color="#888888" />
            <Text style={styles.ingtext}>1 cup jasmine rice</Text>
          </View>
        </View>
        <View style={styles.instrwrapper}>
          <Text style={styles.instrheading}>Instructions</Text>
          <View style={styles.instr}>
            <Text style={styles.step}>1</Text>
            <Text style={styles.stepdesc}>
              Steak Marinade: In a food processor combine the pear, garlic,
              ginger, and onion and pulse until a thick paste forms. In a large
              bowl, combine the sliced steak, prepared tenderizer, soy sauce,
              brown sugar, sesame oil, and scallions. Stir to coat the meat
              evenly. Cover and refrigerate for 20- 30 minutes.
            </Text>
          </View>
          <View style={styles.instr}>
            <Text style={styles.step}>2</Text>
            <Text style={styles.stepdesc}>
              Garlic Rice: Add the oil and garlic to a skillet and heat the
              skillet over medium heat. This will infuse the oil with the garlic
              flavour. Add the rice and allow to toast for 2-3 minutes. Add the
              chicken broth and allow to come to a boil. Cover, reduce heat to
              low and allow the rice to cook for 12-15 minutes.
            </Text>
          </View>
          <View style={styles.instr}>
            <Text style={styles.step}>3</Text>
            <Text style={styles.stepdesc}>
              Cucumber + Carrot Salad: In a bowl combine the sesame seeds, 1/2
              teaspoon salt, red pepper flakes, and
            </Text>
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
  instr: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 15 },
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
    marginLeft: 10,
    fontWeight: '500',
    color: '#4E4E4E',
    fontSize: 15,
  },
});
