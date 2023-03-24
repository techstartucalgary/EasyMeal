import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  Pressable,
  Image,
  ScrollView,
  FlatList,
  Modal,
  Dimensions,
  TextInput,
} from 'react-native';

import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Autocomplete from 'react-native-autocomplete-input';

const DetailedCookingGoal = () => {
  const [fontsLoaded] = useFonts({
    'Inter-Bold': require('../../assets/fonts/Inter-Bold.ttf'),
    'Inter-SemiBold': require('../../assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Medium': require('../../assets/fonts/Inter-Medium.ttf'),
    'Inter-Regular': require('../../assets/fonts/Inter-Regular.ttf'),
    'Inter-ExtraLight': require('../../assets/fonts/Inter-ExtraLight.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View>
      {false && <View style={styles.backgroundDim} />}
      <View style={{ flex: 1, width: '100%', backgroundColor: 'red' }}></View>
    </View>
  );
};

export default DetailedCookingGoal;

const styles = StyleSheet.create({
  alignCenter: {
    alignItems: 'center',
  },
  backgroundDim: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: Dimensions.get('screen').height,
    zIndex: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  boldText: {
    fontFamily: 'Inter-Bold',
  },
  circleButtonL: {
    marginLeft: 20,
    width: 36,
    height: 36,
    borderRadius: 18,

    backgroundColor: '#E3E3E3',

    alignItems: 'center',
    justifyContent: 'center',
  },
  editDietButton: {
    height: 24,
    width: 24,
    borderRadius: 12,

    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  flexFill: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
  },
  header1Text: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 28,
    color: '#33363F',
  },
  header2Text: {
    marginTop: 44,
    marginLeft: 28,

    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#33363F',
  },
  justifySpaceBetween: {
    justifyContent: 'space-between',
  },
  profilePageContainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  profilePageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

    paddingTop: 12,
    marginLeft: 24,
    marginRight: 24,
  },
  profileSectionContainer: {
    marginTop: 28,
    marginHorizontal: 16,
    borderRadius: 22,

    backgroundColor: '#FFFFFF',

    shadowColor: '#5A6CEA',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.07,
    shadowRadius: 13.16,

    elevation: 20,
  },
  profileSectionPadding: {
    paddingVertical: 20,
    paddingHorizontal: 32,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D9D9D9',
  },
  progressBarFilled: {
    height: 8,
    borderRadius: 4,
  },
  savingsImage: {
    height: 56,
    width: 56,
    marginLeft: 20,
    marginVertical: 16,
  },
  savingsText: {
    flex: 1,
    flexWrap: 'wrap',
    marginVertical: 0,
    marginHorizontal: 24,

    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#474747',
  },
  sectionArrowIcon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeader1: {
    fontFamily: 'Inter-Bold',
    fontSize: 15,
    color: '#474747',
  },
  sectionHeader2: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 11,
    color: '#000000',
  },
  sectionHeader3: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: '#000000',
  },
  sectionTopMargin1: {
    marginTop: 12,
  },
  sectionTopMargin2: {
    marginTop: 8,
  },
  sectionRightMargin1: {
    marginRight: 64,
  },
  sectionRightMargin2: {
    marginRight: 8,
  },
  sectionSubHeader1: {
    fontFamily: 'Inter-SemiBold',
    color: '#717171',
  },
  sectionSubHeader2: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#B3B3B3',
  },
  sectionSubHeader3: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 9,
    color: '#747474',
  },
  smallEmoji: {
    height: 20,
    width: 20,
    marginRight: 8,
  },
});
