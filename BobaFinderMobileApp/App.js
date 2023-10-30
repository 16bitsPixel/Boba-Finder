import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, ImageBackground, View, Button, Pressable, ScrollView } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// home screen to be implemented in another branch
function HomeScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button title = "Drink Maker" onPress = {() => navigation.navigate("Custom")}/>
    </View>
  );
}

/*
  Custom Screen where users can create their drink of choice
*/
function CustomScreen({navigation}) {
  return (
    <View style = {styles.container}>
      {/*div for the changing boba UI, randomizer, and favorite button*/}
      <View style = {{
        flex: 1,
        width: "100%"
      }}>
        <ImageBackground source = {require("./assets/searchbg.png")} resizeMode = "cover" style = {{flex: 1}}>
          <Image 
            source = {require("./assets/logo.png")}
            style = {{height: "100%", flex: 4, marginTop: "5%", alignSelf: "center"}}
            resizeMode = "contain"
          />
          <View style = {{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-between"
          }}>
            <Pressable style = {{width: "20%", justifyContent: "center"}}>
              <Image source = {{
                uri: "https://cdn-icons-png.flaticon.com/512/4260/4260076.png"
              }} style = {{height: "80%"}}
              resizeMode = "contain"
              />
            </Pressable>
            <Pressable style = {{width: "20%", justifyContent: "center"}}>
              <Image source = {{
                uri: "https://www.iconpacks.net/icons/2/free-favourite-icon-2765-thumb.png"
              }} style = {{height: "80%"}}
              resizeMode = "contain"
              />
            </Pressable>
          </View>
        </ImageBackground>
      </View>

      {/*div for two buttons: tea options, topping options, and search*/}
      <View style = {{
        backgroundColor: "#C5E7E2",
        flex: 1.3,
        width: "100%",
        alignItems: "center",
        gap: "30%"
      }}>

        {/* button for the base tea, this should move to the teas screen */}
        <Pressable style = {{
          backgroundColor: "white",
          width: "80%",
          height: "25%",
          marginTop: "10%",
          borderRadius: "12px"
        }} onPress = {() => navigation.navigate("Tea Options")}>
          <View style = {{
            flexDirection: "row",
            flex: 1
          }}>
            <View style = {{
              flex: 2,
              justifyContent: "center",
              marginLeft: "5%"
            }}>
              <Text style = {{
                fontSize: 20
              }}>Base:</Text>
              <Text>Thai Tea</Text>
            </View>
            <Image source = {require("./assets/basecup.png")}
              style = {{height: "100%", flex: 1}} resizeMode = "contain"
            />
          </View>
        </Pressable>

        {/* button for the toppings, this should move to the toppings screen */}
        <Pressable style = {{
          backgroundColor: "white",
          width: "80%",
          height: "25%",
          borderRadius: "12px"
        }} onPress = {() => navigation.navigate("Topping Options")}>
          <View style = {{
            flexDirection: "row",
            flex: 1
          }}>
            <View style = {{
              flex: 2,
              justifyContent: "center",
              marginLeft: "5%"
            }}>
              <Text style = {{
                fontSize: 20
              }}>Toppings:</Text>
              <Text>Brown Sugar Boba</Text>
            </View>
            <Image source = {require("./assets/toppingscup.png")}
              style = {{height: "100%", flex: 1, marginRight: "2%"}} resizeMode = "contain"
            />
          </View>
        </Pressable>

        {/* button to submit the customized drink */}
        <Pressable style = {{
          backgroundColor: "#A4D9D1",
          width: "50%",
          height: "15%",
          borderRadius: "12px",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Text style = {{fontSize: 30}}>Submit</Text>

        </Pressable>
      </View>

    </View>
  );
}

/*
  Screen where users can see all options of tea bases for their custom drink
*/
function TeaOptionsScreen() {
  return (
    <View style = {styles.container}>
      {/* div for the search bar */}
      <View>
        <Text>Search</Text>
      </View>

      {/* scrolling div for all the different boba options */}
      <ScrollView>
        <Text>Options</Text>
      </ScrollView>
    </View>
  );
}

/*
  Screen where users can see all options of toppings for their custom drink
*/
function ToppingOptionsScreen() {
  return (
    <View style = {styles.container}>
      <Text>Topping Options Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

// function to run the app, works as a navigator for all our pages
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions = {{
          headerBackTitle: "Back",
            headerTintColor: "black",
            headerStyle: {
              backgroundColor: "#C5E7E2"
            }
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name = "Custom"
          component={CustomScreen}
          options = {{
            headerTitle: "Drink Maker",
          }} />
        <Stack.Screen
          name="Tea Options"
          component={TeaOptionsScreen} 
          options = {{
            headerTitle: "Bases",
          }}
        />
        <Stack.Screen
          name="Topping Options"
          component={ToppingOptionsScreen} 
          options = {{
            headerTitle: "Toppings",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
