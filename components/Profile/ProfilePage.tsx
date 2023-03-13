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
        <View style={[styles.flexRow, styles.alignCenter]}>
          <Pressable
            onPress={() => setNotificationsAvailable(!notificationsAvailable)}
            style={styles.circleButtonL}
          >
            <MaterialCommunityIcons
              name={
                notificationsAvailable ? 'bell-badge-outline' : 'bell-outline'
              }
              size={20}
              color="#273B4A"
            />
          </Pressable>
          <Pressable style={styles.circleButtonL}>
            <Ionicons name="settings-sharp" size={20} color="#273B4A" />
          </Pressable>
        </View>
      </View>
      <View
        style={[
          styles.profileSectionContainer,
          styles.flexRow,
          styles.alignCenter,
        ]}
      >
        <Image
          source={require('../../assets/images/emoji-sparkles.png')}
          style={styles.savingsImage}
        />
        <Text style={styles.savingsText}>
          You <Text style={styles.boldText}>saved $215</Text> this month by
          cooking at home!
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ProfilePage;

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
  flexRow: {
    flexDirection: 'row',
  },
  header1Text: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 28,
    color: '#33363F',
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
});
