import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, ImageBackground, View, Button, Pressable, ScrollView } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './components/Home/HomeScreen';
import CustomScreen from './components/Custom/CustomScreen';
import TeaOptionsScreen from './components/Custom/TeaOptionsScreen';
import ToppingOptionsScreen from './components/Custom/ToppingOptionsScreen';

const Stack = createNativeStackNavigator();

// function to run the app, works as a navigator for all our pages
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Custom" component={CustomScreen} />
          {/* options={{
            headerTitle: "Drink Maker",
            headerBackTitle: "Back",
            headerTintColor: "black",
            headerStyle: {
              backgroundColor: "#C5E7E2"
            }
          }}  */}
        <Stack.Screen name="Tea Options" component={TeaOptionsScreen} />
        <Stack.Screen name="Topping Options" component={ToppingOptionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
