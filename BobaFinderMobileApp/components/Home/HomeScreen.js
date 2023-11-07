import React from 'react'
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

import { useFonts } from 'expo-font';

const image = { uri: "https://raw.githubusercontent.com/16bitsPixel/Boba-Finder/main/imgs/splashbg.png" };

/*
  Home Screen where the user lands
*/

// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

export default function HomeScreen({ navigation }) {
  const [loaded] = useFonts({
    'Assistant': require('../../assets/fonts/Assistant-Light.ttf'),
    'ComingSoon': require('../../assets/fonts/ComingSoon-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <AnimatedAppLoader image={{ uri: "https://raw.githubusercontent.com/16bitsPixel/Boba-Finder/main/imgs/splashbg.png" }}>
      <View style={styles.container}>
        <View style={{
          flex: 1,
          width: "100%",
        }}>
          <ImageBackground source = {image} resizeMode="cover" style={{ flex: 1 }}>
            <View style={{
              flexDirection: "column",
              flex: 1,
            }}>
              <Text style={{
                  fontFamily: 'ComingSoon',
                  color: 'black',
                  fontSize: 60,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginTop: '60%', /* Used to be 48 when header was shown */
              }}>BobaSpot</Text>

              {/* button for Search, this should move to the Customs screen */}
              <Pressable style={{
              backgroundColor: "#C5E7E2",
              width: "60%",
              height: "10%",
              borderRadius: "6px",
              marginTop: '4%',
              marginLeft: '20%',
              justifyContent: "center",
              alignItems: "center"
              }} onPress={() => navigation.navigate("Custom")}>
              <Text style={{ fontFamily: 'ComingSoon', fontSize: 30 }}>Search</Text>
              </Pressable>

              {/* button for Favorites, this should move to the Favorites screen */}
              <Pressable style={{
              backgroundColor: "#C5E7E2",
              width: "60%",
              height: "10%",
              borderRadius: "6px",
              marginTop: '4%',
              marginLeft: '20%',
              justifyContent: "center",
              alignItems: "center"
              }} onPress={() => navigation.navigate("Favorites")}>
              <Text style={{ fontFamily: 'ComingSoon', fontSize: 30 }}>Favorites</Text>
              </Pressable>

            </View>
          </ImageBackground>
        </View>
      </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#white',
    alignItems: 'center',
    justifyContent: 'center',
  }
});