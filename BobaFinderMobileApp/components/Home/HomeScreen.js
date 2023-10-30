import React from 'react';
import { 
  View,
  Text,
  Button,
  Pressable,
  StyleSheet
} from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
        <Button
          title="Drink Maker"
          onPress={() => navigation.navigate("Custom")}
        />
    </View>
  );
}
