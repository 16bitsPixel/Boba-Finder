import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './components/Home/HomeScreen';
import CustomStack from './components/Custom/CustomScreenStack';
import FavoriteScreen from './components/Favorite/FavoriteScreen';

const Tab = createBottomTabNavigator();

// function to run the app, works as a navigator for all our pages
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#C5E7E2"
          }
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ headerTitle: "Home" }} />
        <Tab.Screen name="Search" component={CustomStack} options={{ headerTitle: "Drink Maker" }} />
        <Tab.Screen name="FavoriteScreen" component={FavoriteScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
