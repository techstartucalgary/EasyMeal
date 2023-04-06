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
  Button,
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

import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from 'contexts/AuthContext';
import { weeklyGoals } from './test-profile';
import CalendarSection from './Calendar';

const Settings = () => {
  const navigation = useNavigation();
  const [hidePassword, setHidePassword] = useState(true);
  const { logout } = useAuthContext();
  const [loginPassword, setLoginPassword] = useState('');
  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };
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
          onPress={() => navigation.goBack()}
          style={styles.profileButton}
        >
          <MaterialIcons name="arrow-back-ios" size={24} color="black" />
          <Text style={styles.profileButtonText}>Profile</Text>
        </Pressable>
        <Text style={styles.headerText}>Settings</Text>
      </View>
      <View style={styles.settingsSectionContainer}>
        <Text style={styles.informationHeader}>Your Information</Text>
        <Text style={styles.inputLabel}>Name</Text>
        <View style={styles.inputField}>
          <Text style={styles.inputText}>Sal Doe</Text>
        </View>
        <Text style={styles.inputLabel}>Email</Text>
        <View style={styles.inputField}>
          <Text style={styles.inputText}>saldoe@ucalgary.ca</Text>
        </View>
      </View>
      <View style={styles.settingsSectionContainer}>
        <Text style={styles.informationHeader}>Change Password</Text>
        <Text style={styles.inputLabel}>New Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.loginInput, styles.passwordInput]}
            placeholder="Password"
            secureTextEntry={hidePassword}
            onChangeText={setLoginPassword}
          />
          <AntDesign
            name={hidePassword ? 'eyeo' : 'eye'}
            size={22}
            color="#91919F"
            style={styles.hidePassword}
            onPress={toggleHidePassword}
          />
        </View>
        <Text style={styles.inputLabel}>Confirm New Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.loginInput, styles.passwordInput]}
            placeholder="Password"
            secureTextEntry={hidePassword}
            onChangeText={setLoginPassword}
          />
          <AntDesign
            name={hidePassword ? 'eyeo' : 'eye'}
            size={22}
            color="#91919F"
            style={styles.hidePassword}
            onPress={toggleHidePassword}
          />
        </View>
      </View>

      <View style={styles.changeButton}>
        <Text style={styles.changeText}>Change Password</Text>
      </View>
      <Pressable style={styles.logoutButton} onPress={() => logout()}>
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  profilePageContainer: {
    height: Dimensions.get('screen').height,
    maxWidth: Dimensions.get('screen').width,
    width: Dimensions.get('screen').width,
    backgroundColor: '#F8F8F8',
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
  profilePageHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

    paddingTop: 16,
    marginLeft: 16,
    marginRight: 16,
  },

  headerText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#33363F',
    lineHeight: 20,
  },

  changeButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#6536F9',
    borderRadius: 14,
    height: 56,
    marginLeft: 26,
    marginRight: 26,
    marginTop: 36,
  },
  changeText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fcfcfc',
    fontFamily: 'Inter-Regular',
    fontSize: 18,
  },
  logoutButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#DB4949',
    backgroundColor: '#E8E8E8',
    borderRadius: 14,
    height: 56,
    marginLeft: 26,
    marginRight: 26,
    marginTop: 26,
  },
  logoutText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#DB4949',
    fontFamily: 'Inter-Regular',
    fontSize: 18,
  },

  settingsSectionContainer: {
    marginTop: 32,
    marginHorizontal: 16,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,

    shadowColor: '#5A6CEA',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.07,
    shadowRadius: 13.16,

    elevation: 20,

    flexDirection: 'column',
  },
  informationHeader: {
    color: '#424242',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 12,
  },

  inputLabel: {
    color: '#808080',
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    marginBottom: 4,
  },
  inputField: {
    backgroundColor: '#F1F1FA',
    borderRadius: 14,
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 8,
    paddingTop: 8,
    marginBottom: 8,
  },
  inputText: {
    color: '#2D2D2D',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  hidePassword: {
    position: 'absolute',
    right: 20,
  },
  passwordContainer: {
    marginTop: 2,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    marginTop: 0,
    marginRight: 0,
    marginLeft: 0,
  },
  loginInput: {
    backgroundColor: '#fff',
    borderColor: '#f1f1f1',
    borderWidth: 2,
    borderRadius: 16,
    height: 46,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    textAlignVertical: 'center',
    color: '#91919F',
    outlineColor: '#6536F9',
  },
});
