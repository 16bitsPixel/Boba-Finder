import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, ImageBackground, View, Button, Pressable, ScrollView } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './components/Home/HomeScreen';
import CustomScreen from './components/Custom/CustomScreen';
import TeaOptionsScreen from './components/Custom/TeaOptionsScreen';
import ToppingOptionsScreen from './components/Custom/ToppingOptionsScreen';
import SplashScreen from './components/Splash/SplashScreen';
import FavoritesScreen from './components/Favorites/FavoritesScreen';

const Stack = createNativeStackNavigator();

// function to run the app, works as a navigator for all our pages
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions = {{
          headerBackTitle: "Back",
            headerTintColor: "black",
            headerStyle: {
              backgroundColor: "#C5E7E2"
            }
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options = {{headerTitle: "Home Screen"}} />
        <Stack.Screen name="Custom" component={CustomScreen} options = {{headerTitle: "Drink Maker"}} />
        <Stack.Screen name="Tea Options" component={TeaOptionsScreen} options = {{headerTitle: "Tea Bases"}} />
        <Stack.Screen name="Topping Options" component={ToppingOptionsScreen} options = {{headerTitle: "Toppings"}} />
        <Stack.Screen name="Splash" component={SplashScreen} options = {{headerTitle: "Splash Screen"}} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} options = {{headerTitle: "Favorites Screen"}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}