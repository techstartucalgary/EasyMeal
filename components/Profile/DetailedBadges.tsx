import React, { useState, PropsWithChildren } from 'react';
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
  MaterialIcons,
} from '@expo/vector-icons';
import { useFonts } from 'expo-font';

import { weeklyGoals, goals } from './test-profile';

type DetailedBadgesProps = PropsWithChildren<{
  animateFunction: (slideLeft: boolean) => void;
}>;

const DetailedBadges: React.FC<DetailedBadgesProps> = ({ animateFunction }) => {
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
    <SafeAreaView style={styles.profilePageContainer}>
      <View style={styles.profilePageHeader}>
        <Pressable
          onPress={() => animateFunction(false)}
          style={styles.profileButton}
        >
          <MaterialIcons name="arrow-back-ios" size={24} color="black" />
          <Text style={styles.profileButtonText}>Profile</Text>
        </Pressable>
        <Text style={styles.headerText}>Your badges</Text>
      </View>
    </SafeAreaView>
  );
};

export default DetailedBadges;

const styles = StyleSheet.create({
  headerText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#33363F',
    lineHeight: 20,
  },
  profileButton: {
    position: 'absolute',
    top: 12,
    left: 0,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileButtonText: {
    marginLeft: 0,
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#000000',
  },
  profilePageContainer: {
    height: Dimensions.get('screen').height,
    maxWidth: Dimensions.get('screen').width,
    width: Dimensions.get('screen').width,
    backgroundColor: '#F8F8F8',
  },
  profilePageHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

    paddingTop: 16,
    marginLeft: 16,
    marginRight: 16,
  },
});
