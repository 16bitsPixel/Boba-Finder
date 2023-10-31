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

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
        <Button
          title="Drink Maker"
          onPress={() => navigation.navigate("Custom")}
        />
        <Button
          title="Splash Page"
          onPress={() => navigation.navigate("Splash")}
        />
    </View>
  );
}