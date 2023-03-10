/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthProvider } from 'contexts/AuthContext/AuthProvider';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuthContext } from 'contexts/AuthContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecipeOverview from 'components/RecipeOverview/RecipeOverview';
import HomePage from 'components/HomePage/HomePage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { publicPages, privatePages, ParamList } from './pages';

const Tab = createBottomTabNavigator<ParamList>();
const Stack = createNativeStackNavigator<ParamList>();

function PrivateTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'ios-search' : 'ios-search-outline';
          } else if (route.name === 'Pantry') {
            iconName = focused ? 'ios-basket' : 'ios-basket-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
