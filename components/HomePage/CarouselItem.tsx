import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const CarouselItem = ({ item, index }: { item: any; index: number }) => (
  <View style={styles.container} key={index}>
    <Image source={item.imgUrl} style={styles.image} />
    <Text style={styles.header}>{item.title}</Text>
    <Text style={styles.body}>{item.body}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: 27,
    paddingRight: 27,
    paddingTop: 30,
    paddingBottom: 40,
    width: ITEM_WIDTH,
  },
  image: {
    width: ITEM_WIDTH,
    height: 300,
  },
  header: {
    fontWeight: '700',
    fontSize: 32,
    paddingRight: 24,
    paddingLeft: 24,
    marginTop: 60,
    textAlign: 'center',
  },
  body: {
    fontWeight: '500',
    fontSize: 16,
    color: '#91919F',
    marginTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    textAlign: 'center',
  },
});

export default CarouselItem;
