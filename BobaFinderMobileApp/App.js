import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
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
      <Text>Custom Screen</Text>
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
            headerLeft: () => (
              <Button
                onPress={() => navigation("Home")}
                title="< Back"
                color="black"
              />
            )
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
  },
});
