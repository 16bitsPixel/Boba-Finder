import React from 'react'
import {
  View,
  Text,
  Button,
  Pressable,
  Image,
  ImageBackground,
  StyleSheet
} from 'react-native'

import { useFonts } from 'expo-font';

const image = { uri: "https://raw.githubusercontent.com/16bitsPixel/Boba-Finder/main/imgs/splashbg.png" };

/*
  Splash Screen where the user lands (CURRENTLY lands on HOME page though!!!) v1.0
*/

/*
  NOW REDUNDANT, No longer used, has replaced home screen v1.0
*/

export default function SplashScreen({ navigation }) {
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
                color: 'black',
                fontSize: 60,
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: '48%',
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
            <Text style={{ fontSize: 30 }}>Search</Text>
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
            <Text style={{ fontSize: 30 }}>Favorites</Text>
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