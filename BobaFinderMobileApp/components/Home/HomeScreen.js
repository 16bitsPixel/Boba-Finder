import React from 'react';
import { 
  View,
  Text,
  Button,
} from 'react-native';
import FavoriteScreen from '../Favorite/FavoriteScreen'

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
        <Button
          title="Drink Maker"
          onPress={() => navigation.navigate("Search")}
        />
        <Button
          title="Favorites"
          onPress={() => navigation.navigate("FavoriteScreen")}
        />
    </View>
  );
}
