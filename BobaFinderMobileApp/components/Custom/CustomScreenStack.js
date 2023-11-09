import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CustomScreen from './CustomScreen/CustomScreen';
import TeaOptionsScreen from './TeaOptionsScreen/TeaOptionsScreen';
import ToppingOptionsScreen from './ToppingOptionsScreen/ToppingOptionsScreen';
import StoresScreen from './StoresScreen/StoresScreen';
import MapScreen from './MapScreen/MapScreen';

const Stack = createNativeStackNavigator();

// Stack for Custom Screen to be nested inside TAB navigation in App.js
export default function CustomStack() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName='Custom'
        screenOptions={{
          gestureDirection: 'vertical',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#C5E7E2"
          }
        }}
      >
        <Stack.Screen name="Custom" component={CustomScreen} options={{ headerTitle: "" }} />
        <Stack.Screen name="Tea Options" component={TeaOptionsScreen} options={{ headerTitle: "Tea Bases" }} />
        <Stack.Screen name="Topping Options" component={ToppingOptionsScreen} options={{ headerTitle: "Toppings" }} />
        <Stack.Screen name="Stores" component={StoresScreen} options={{ headerTitle: "Stores" }} />
        <Stack.Screen name="Map" component={MapScreen} options={{ headerTitle: "Map"}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
