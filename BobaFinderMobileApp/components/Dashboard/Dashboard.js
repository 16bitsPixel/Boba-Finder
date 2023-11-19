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

import { useFonts } from 'expo-font';

const image = { uri: "https://raw.githubusercontent.com/16bitsPixel/Boba-Finder/main/BobaFinderMobileApp/assets/images/splashbg.png" };


export default function DashboardScreen({ navigation }) {
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
              <Text style={{
                  fontFamily: 'ComingSoon',
                  color: 'black',
                  fontSize: 65,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginTop: '45%', /* Used to be 48 when header was shown */
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
              }} onPress={() => navigation.navigate("Drink Maker")}>
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
