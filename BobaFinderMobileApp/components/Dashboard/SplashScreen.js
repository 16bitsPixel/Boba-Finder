import 'react-native-gesture-handler';
import * as React from 'react';
import { View, StyleSheet, Animated} from 'react-native'
import { Asset } from "expo-asset";
import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function AnimatedAppLoader({ children, image }) {
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