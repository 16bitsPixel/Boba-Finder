import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomStack from './components/Custom/CustomScreenStack'
import HomeScreen from './components/Home/HomeScreen';

const Drawer = createDrawerNavigator();

// Stack for Custom Screen to be nested inside TAB navigation in App.js
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#C5E7E2"
          }
        }}>
        <Drawer.Screen name="Home" component={ HomeScreen }/>
        <Drawer.Screen name="Drink Maker" component={ CustomStack }/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
