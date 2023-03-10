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
} from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Autocomplete from 'react-native-autocomplete-input';

const ProfilePage = () => {
  const [notificationsAvailable, setNotificationsAvailable] = useState(true);

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
        <Text style={styles.header1Text}>Profile</Text>
        <View style={[styles.flexRow, styles.alignCenter, styles.justifyEnd]}>
          <Pressable style={styles.circleButtonL}>
            <MaterialCommunityIcons name="bell" size={20} color="#273B4A" />
          </Pressable>
          <Pressable style={styles.circleButtonL}>
            <Ionicons name="settings-sharp" size={20} color="#273B4A" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  alignCenter: {
    alignContent: 'center',
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
  circleButtonL: {
    marginLeft: 20,
    width: 36,
    height: 36,
    borderRadius: 18,

    backgroundColor: '#E3E3E3',

    alignItems: 'center',
    justifyContent: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  header1Text: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 28,
    color: '#33363F',
  },
  justifyEnd: {},
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
});
