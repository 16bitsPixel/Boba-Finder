import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomStack from './components/Custom/CustomScreenStack'
import HomeScreen from './components/Home/HomeScreen';
import FavoriteScreen from './components/Favorite/FavoriteScreen/FavoriteScreen';

import {
  View,
  Text,
  Button,
  Pressable,
  Image,
  ImageBackground,
  StyleSheet,
  Animated,
  Platform
} from 'react-native'

import { Asset } from "expo-asset";
import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";
/* import * as Updates from "expo-updates"; */
import { useCallback, useEffect, useMemo, useState } from "react";


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
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#C5E7E2"
            }
          }}>
          <Drawer.Screen name="Home" component={ HomeScreen }/>
          <Drawer.Screen name="Drink Maker" component={ CustomStack }/>
          <Drawer.Screen name="Favorites" component={ FavoriteScreen }/>
        </Drawer.Navigator>
      </NavigationContainer>
    </AnimatedAppLoader>
  );
}

function AnimatedAppLoader({ children, image }) {
  const [isSplashReady, setSplashReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      await Asset.fromURI(image.uri).downloadAsync();
      setSplashReady(true);
    }

    prepare();
  }, [image]);

  if (!isSplashReady) {
    return null;
  }

  return <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>;
}

function AnimatedSplashScreen({ children, image }) {
  const animation = useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 2500, /* Change duration here! */
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady]);

  const onImageLoaded = useCallback(async () => {
    try {
      await SplashScreen.hideAsync();
      // Load stuff
      await Promise.all([]);
    } catch (e) {
      // handle errors
    } finally {
      setAppReady(true);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: Constants.expoConfig.splash.backgroundColor,
              opacity: animation,
            },
          ]}
        >
          <Animated.Image
            style={{
              width: "100%",
              height: "100%",
            }}
            source={image}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  );
}