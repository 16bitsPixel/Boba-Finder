import React from 'react'
import {View, Text, Pressable, ImageBackground, StyleSheet,} from 'react-native'
import { useFonts } from 'expo-font';
import styles from './DashboardSyle'

const image = { uri: "https://raw.githubusercontent.com/16bitsPixel/Boba-Finder/main/BobaFinderMobileApp/assets/images/splashbg.png" };

export default function DashboardScreen({ navigation }) {
  // load fonts
  const [loaded] = useFonts({
    'Assistant': require('../../assets/fonts/Assistant-Light.ttf'),
    'ComingSoon': require('../../assets/fonts/ComingSoon-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
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
              <Text style={styles.titleText}>BobaSpot</Text>

              {/* button for Search, this should move to the Customs screen */}
              <Pressable style={styles.searchButton} onPress={() => navigation.navigate("Drink Maker")}>
                <Text style={{ fontFamily: 'ComingSoon', fontSize: 30 }}>Search</Text>
              </Pressable>

              {/* button for Favorites, this should move to the Favorites screen */}
              <Pressable style={styles.favoritesButton} onPress={() => navigation.navigate("Favorites")}>
                <Text style={{ fontFamily: 'ComingSoon', fontSize: 30 }}>Favorites</Text>
              </Pressable>

            </View>
          </ImageBackground>
        </View>
      </View>
  );
}