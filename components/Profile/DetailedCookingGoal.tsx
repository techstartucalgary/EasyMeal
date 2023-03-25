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
import { LinearGradient } from 'expo-linear-gradient';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Autocomplete from 'react-native-autocomplete-input';

type DetailedCookingGoalProps = PropsWithChildren<{
  animateFunction: (slideLeft: boolean) => void;
}>;

const DetailedCookingGoal: React.FC<DetailedCookingGoalProps> = ({
  animateFunction,
}) => {
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
      {false && <View style={styles.backgroundDim} />}
      <View style={styles.profilePageHeader}>
        <Pressable
          onPress={() => animateFunction(false)}
          style={styles.profileButton}
        >
          <MaterialIcons name="arrow-back-ios" size={24} color="black" />
          <Text style={styles.profileButtonText}>Profile</Text>
        </Pressable>
        <Text style={styles.headerText}>Your weekly goal</Text>
      </View>
    </SafeAreaView>
  );
};

export default DetailedCookingGoal;

const styles = StyleSheet.create({
  backgroundDim: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: Dimensions.get('screen').height,
    zIndex: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  headerText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#33363F',
    lineHeight: 20,
  },
  profileButtonText: {
    marginLeft: 0,
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#000000',
  },
  profileButton: {
    position: 'absolute',
    top: 12,
    left: 0,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
