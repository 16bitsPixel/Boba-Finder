import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import * as SplashScreen from "expo-splash-screen";
/* import * as Updates from "expo-updates"; */

import CustomStack from './components/Custom/CustomScreenStack'
import DashboardScreen from './components/Dashboard/Dashboard';
import FavoriteScreen from './components/Favorite/FavoriteScreen/FavoriteScreen';
import AnimatedAppLoader from './components/Dashboard/SplashScreen';

const Drawer = createDrawerNavigator();

// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

// Stack for Custom Screen to be nested inside TAB navigation in App.js
export default function App() {
  return (
    <AnimatedAppLoader image={{ uri: "https://raw.githubusercontent.com/16bitsPixel/Boba-Finder/main/BobaFinderMobileApp/assets/splash.png" }}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            headerTransparent: true,
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#C5E7E2"
            }
          }}>
          <Drawer.Screen name="Dashboard" component={ DashboardScreen } options={{ headerTitle: "" }}/>
          <Drawer.Screen name="Drink Maker" component={ CustomStack } options={{ headerShown: false, headerTitle: "" }}/>
          <Drawer.Screen name="Favorites" component={ FavoriteScreen } options={{ headerShown: false, headerTitle: "" }}/>
        </Drawer.Navigator>
      </NavigationContainer>
    </AnimatedAppLoader>
  );
}
