import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  SafeAreaView
} from 'react-native'

import { images } from '../../../constants'
import styles from './CustomScreenStyles'

/*
  Custom Screen where users can create their drink of choice
*/

export default function CustomScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/*div for the changing boba UI, randomizer, and favorite button*/}
      <View style={{
        flex: 1,
        width: "100%",
      }}>
        <ImageBackground source={images.searchbg} resizeMode="cover" style={{ flex: 1 }}>
          <Image
            source={images.logo}
            style={styles.drinkBackground}
            resizeMode="contain"
          />
          <View style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-between"
          }}>
            <TouchableOpacity
              style={styles.drinkButtonPosition}
            >
              <Image source={{
                uri: "https://cdn-icons-png.flaticon.com/512/4260/4260076.png"
              }} style={{ height: "80%" }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.drinkButtonPosition}
            >
              <Image source={{
                uri: "https://www.iconpacks.net/icons/2/free-favourite-icon-2765-thumb.png"
              }} style={{ height: "80%" }}
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
          onPress={() => navigation.navigate("Tea Options")}>
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
                fontSize: 20
              }}>
                Base:
              </Text>
              <Text>Thai Tea</Text>
            </View>
            <Image source={images.basecup}
              style={styles.customizationIcon}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>

        {/* button for the toppings, this should move to the toppings screen */}
        <TouchableOpacity
          style={styles.customizationButton}
          onPress={() => navigation.navigate("Topping Options")}>
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
                fontSize: 20
              }}>
                Toppings:
              </Text>
              <Text>Brown Sugar Boba</Text>
            </View>
            <Image source={images.toppingscup}
              style={styles.customizationIcon}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>

        {/* button to submit the customized drink */}
        <TouchableOpacity
          style={styles.submitButton}>
          <Text style={{ fontSize: 20 }}>Submit</Text>

        </TouchableOpacity>
      </View>}

    </SafeAreaView>
  );
}
