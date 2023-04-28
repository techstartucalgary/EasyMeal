/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect } from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import { StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthProvider } from 'contexts/AuthContext/AuthProvider';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuthContext } from 'contexts/AuthContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecipeOverview from 'components/RecipeOverview/RecipeOverview';
import HomePage from 'components/HomePage/HomePage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Settings from 'components/Profile/Settings';
import { publicPages, privatePages, ParamList } from './pages';

const Tab = createBottomTabNavigator<ParamList>();
const Stack = createNativeStackNavigator<ParamList>();

function PrivateTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ focused, color, size }) => {
          let iconName = undefined;

          if (route.name === 'Home') {
            iconName = focused
              ? require('./assets/images/icon-home-filled.png')
              : require('./assets/images/icon-home.png');
          } else if (route.name === 'Search') {
            iconName = focused
              ? require('./assets/images/icon-search-filled.png')
              : require('./assets/images/icon-search.png');
          } else if (route.name === 'Pantry') {
            iconName = focused
              ? require('./assets/images/icon-pantry-filled.png')
              : require('./assets/images/icon-pantry.png');
          } else if (route.name === 'Profile') {
            iconName = focused
              ? require('./assets/images/icon-profile-filled.png')
              : require('./assets/images/icon-profile.png');
          }

          // You can return any component that you like here!
          //return <Ionicons name={iconName} size={size} color={color} />;
          return <Image source={iconName} style={styles.iconImage} />;
        },
        tabBarActiveTintColor: '#6536F9',
        tabBarInactiveTintColor: '#9FA5C0',
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      {privatePages.map(({ page, name }) => (
        <Tab.Screen key={name} name={name} component={page} />
      ))}
    </Tab.Navigator>
  );
}

const Navigator = () => {
  const { currentUser } = useAuthContext();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={PrivateTabs} />
      {(currentUser ? privatePages : publicPages).map(({ page, name }) => (
        <Stack.Screen key={name} name={name} component={page} />
      ))}
      <Stack.Screen
        name="RecipeOverview"
        component={RecipeOverview}
        initialParams={{ itemId: 0 }}
      />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

const App = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <AuthProvider>
        <Navigator />
      </AuthProvider>
    </NavigationContainer>
  </GestureHandlerRootView>
);

export default App;

const styles = StyleSheet.create({
  iconImage: {
    height: 20,
    width: 20,
  },
});
