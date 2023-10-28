import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, Button, Pressable } from 'react-native';
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
function CustomScreen() {
  return (
    <View style = {styles.container}>
      {/*div for the changing boba UI, randomizer, and favorite button*/}
      <View style = {styles.container}>
        <Text>Boba UI</Text>
      </View>

      {/*div for two buttons: tea options, topping options, and search*/}
      <View style = {{
        backgroundColor: "#C5E7E2",
        flex: 1,
        width: "100%",
        alignItems: "center",
        gap: "30%"
      }}>

        {/* button for the base tea, this should move to the teas screen */}
        <Pressable style = {{
          backgroundColor: "white",
          width: "80%",
          height: "20%",
          marginTop: "10%"
        }}>
          <View style = {{
            flexDirection: "row",
            flex: 1
          }}>
            <View style = {{
              flex: 1,
              justifyContent: "center",
              marginLeft: "5%"
            }}>
              <Text style = {{
                fontSize: 20
              }}>Base:</Text>
              <Text>Thai Tea</Text>
            </View>
            <Image source = {{
              // we can change this to our logo later
              uri: "https://images.rawpixel.com/image_transparent_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlMThfcGhvdG9fb2ZfYm9iYV9taWxrX3RlYV9pc29sYXRlX29uX3doaXRlX2JhY2tncl80NjBiNGJmZS04NDBlLTQxYTMtOTI4ZC1kOWIzZDM3ZGQ5ZTYucG5n.png"
              }}
              style = {{width: "15%"}}
            />
          </View>
        </Pressable>

        {/* button for the toppings, this should move to the toppings screen */}
        <Pressable style = {{
          backgroundColor: "white",
          width: "80%",
          height: "20%",
        }}>
          <View style = {{
            flexDirection: "row",
            flex: 1
          }}>
            <View style = {{
              flex: 1,
              justifyContent: "center",
              marginLeft: "5%"
            }}>
              <Text style = {{
                fontSize: 20
              }}>Toppings:</Text>
              <Text>Brown Sugar Boba</Text>
            </View>
            <Image source = {{
              // we can change this to our logo later
              uri: "https://images.rawpixel.com/image_transparent_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlMThfcGhvdG9fb2ZfYm9iYV9taWxrX3RlYV9pc29sYXRlX29uX3doaXRlX2JhY2tncl80NjBiNGJmZS04NDBlLTQxYTMtOTI4ZC1kOWIzZDM3ZGQ5ZTYucG5n.png"
              }}
              style = {{width: "15%"}}
            />
          </View>
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
      <Text>Tea Options Screen</Text>
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
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name = "Custom"
          component={CustomScreen}
          options = {{
            headerTitle: "Drink Maker",
            headerBackTitle: "Back",
            headerTintColor: "black",
            headerStyle: {
              backgroundColor: "#C5E7E2"
            }
          }} />
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
