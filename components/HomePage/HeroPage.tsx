import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';
import React, { useState } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselItem';
import data from './CarouselData';

const HeroPage = () => {
  const { navigate } = useNavigation();
  const [homestep, SetHomeStep] = useState<number>(0);
  const isCarousel = React.useRef(null);

  return (
    <SafeAreaView style={styles.homeContainer}>
      <Carousel
        layout="tinder"
        layoutCardOffset={9}
        ref={isCarousel}
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        onSnapToItem={(homestep) => SetHomeStep(homestep)}
        useScrollView
        vertical={false}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={homestep}
        carouselRef={isCarousel}
        dotStyle={{
          width: 16,
          height: 16,
          borderRadius: 100,
          marginHorizontal: 0,
          backgroundColor: '#6536F9',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.5}
        tappableDots
      />
      <Pressable
        style={styles.signUpButton}
        onPress={() => {
          navigate('SignUp' as never, {} as never);
        }}
      >
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </Pressable>
      <Pressable
        style={styles.loginButton}
        onPress={() => {
          navigate('Login' as never, {} as never);
        }}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: 27,
    paddingRight: 27,
    paddingTop: 30,
    paddingBottom: 30,
  },

  wrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  signUpButton: {
    backgroundColor: '#6536F9',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    marginBottom: 15,
  },
  signUpButtonText: {
    textAlign: 'center',
    color: '#FCFCFC',
    fontSize: 18,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#EEE5FF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    width: '90%',
  },
  loginButtonText: {
    textAlign: 'center',
    color: '#6536F9',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default HeroPage;
