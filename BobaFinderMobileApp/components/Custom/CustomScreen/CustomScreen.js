import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  SafeAreaView,
  Alert,
} from 'react-native'
import { images } from '../../../constants'
import { baseTeas } from '../../../constants/images'
import { toppings } from '../../../constants/images'
import { useFonts } from 'expo-font';
import styles from './CustomScreenStyles'
import { useRoute } from "@react-navigation/native"

/*
  Custom Screen where users can create their drink of choice
*/

export default function CustomScreen({ route, navigation }) {
  //parameters: user's drink, user's topping
  const { drink, topping } = route.params;
  
  // for fonts
  const [loaded] = useFonts({
    'Assistant': require('../../../assets/fonts/Assistant-Light.ttf'),
    'ComingSoon': require('../../../assets/fonts/ComingSoon-Regular.ttf'),
  });

  if (!loaded) {
      return null;
  }

  //Checks if the base has been chosen yet, if not then ERROR
  const isChosen = () => {
    if (drink.length == 0) {
      Alert.alert("Please select a base!")
      console.log("Error: User drink has not been chosen yet!");
    } else {
      navigation.navigate("Map", {drink: drink, topping: topping});
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/*div for the changing boba UI, randomizer, and favorite button*/}
      <View style={{
        flex: 1,
        width: "100%",
        flexDirection: "column",
      }}>
        <ImageBackground source={images.searchbg} resizeMode="cover" style={{ flex: 1 }}>
          <View
            style={{ flex: 5 }}
          >
            <Image
              source={drink ? baseTeas.teaName[drink] : images.basecup}
              style={styles.searchImages}
              resizeMode="contain"
            />
            <Image
              source={topping ? toppings.topName[topping] : images.topcup}
              style={styles.searchImages}
              resizeMode="contain"
            />
          </View>
          <View
            style={{ flex: 1, flexDirection: "row", justifyContent: "space-around"}}
          >
            <TouchableOpacity
              style={{ flex: 1.25 }}
            >
              <Image
                source={{ uri: "https://cdn-icons-png.flaticon.com/512/4260/4260076.png" }}
                style={styles.searchIcons}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View 
              style={{ flex: 5.5 }}
            />
            <TouchableOpacity
              style={{ flex: 1.25 }}
            >
              <Image
                source={{ uri: "https://www.iconpacks.net/icons/2/free-favourite-icon-2765-thumb.png" }}
                style={styles.searchIcons}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      {/*div for two buttons: tea options, topping options, and search*/}
      {<View
        style={styles.customizationContainer}
      >
        {/* button for the base tea, this should move to the teas screen */}
        <TouchableOpacity
          style={styles.customizationButton}
          onPress={() => navigation.navigate("Tea Options", {drink: drink, topping: topping})}>
          <View style={{
            flexDirection: "row",
            flex: 1
          }}>
            <View style={{
              flex: 2,
              justifyContent: "center",
              marginLeft: "5%"
            }}>
              <Text style={{
                fontSize: 25,
                fontFamily: "Assistant"
              }}>
                Base:
              </Text>
              <Text style = {{fontSize: 18, fontFamily: "Assistant"}}>{drink}</Text>
            </View>
            <Image source={drink ? baseTeas.teaName[drink] : images.basecup}
              style={styles.customizationIcon}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>

        {/* button for the toppings, this should move to the toppings screen */}
        <TouchableOpacity
          style={styles.customizationButton}
          onPress={() => navigation.navigate("Topping Options", {drink: drink, topping: topping})}>
          <View style={{
            flexDirection: "row",
            flex: 1
          }}>
            <View style={{
              flex: 2,
              justifyContent: "center",
              marginLeft: "5%"
            }}>
              <Text style={{
                fontSize: 25,
                fontFamily: "Assistant"
              }}>
                Toppings:
              </Text>
              <Text style = {{fontSize: 18, fontFamily: "Assistant"}}>{topping}</Text>
            </View>
            <Image source={topping ? toppings.topName[topping] : images.basecup}
              style={styles.customizationIcon}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>

        {/* button to submit the customized drink */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => isChosen()}
        >
          <Text
            style={{ fontSize: 30, fontFamily: "ComingSoon" }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>}

    </SafeAreaView>
  );
}
