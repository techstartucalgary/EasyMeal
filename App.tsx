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
import { publicPages, privatePages, ParamList } from './pages';

const Tab = createBottomTabNavigator<ParamList>();

const Navigator = () => {
  const { currentUser } = useAuthContext();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'RecipeOverview') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6536F9',
        tabBarInactiveTintColor: '#9FA5C0',
        tapBarStyle: () => {
          if (!currentUser) {
            ('none');
          }
        },
      })}
    >
      {(currentUser ? privatePages : publicPages).map(({ page, name }) => (
        <Tab.Screen key={name} name={name} component={page} />
      ))}
      <Tab.Screen
        name="RecipeOverview"
        component={RecipeOverview}
        initialParams={{ itemId: 0 }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const { currentUser } = useAuthContext();

  return (
    <NavigationContainer>
      <AuthProvider>
        <Navigator />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
