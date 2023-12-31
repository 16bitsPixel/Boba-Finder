import { useCallback } from 'react';
import { Text, View, Pressable, Image, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import favStyles from './FavoriteScreenStyles';
import FavButtonArray from '../FavoriteButton/FavButtonArray';
import { images } from '../../../constants'

export default function FavoriteScreen({ navigation }) {
  // load fonts
  const [fontsLoaded, fontError] = useFonts({
    'Assistant': require('../../../assets/fonts/Assistant-Light.ttf'),
    'ComingSoon': require('../../../assets/fonts/ComingSoon-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  // dummy data
  const data = [
    { base: 'Fruit Tea', topping: 'Aloe Jelly' },
    { base: 'Thai Tea', topping: 'Whipped Cream' },
    { base: 'Jasmine', topping: 'Boba' }

  ];


  return (
    <View style={favStyles.container}>
      {/*div for favorites bar w/ back button and favorite drink pressables*/}
      <View style={{
        flex: 1,
        width: "100%",
      }}>

        {/*div for top bar w/ 'Favorites' and return button*/}
        <View style={favStyles.headerBar}>
          {/*pressable element for back button to return to custom screen*/}
          <Pressable style={favStyles.backButton}
            onPress={() => navigation.navigate("Drink Maker")}>
            <Image
              source={images.arrowLeft}
              style={favStyles.backButtonImage}
              resizeMode="center"
            />
          </Pressable>

          {/*div for text 'Favorites' */}
          <View style={favStyles.favHeaderText}>
            <Text style={
              favStyles.header
            }>
              Favorites
            </Text>
          </View>
        </View>

        {/*div for each pressable:favorite drink elements */}
        <View style={{
          flex: 1,
          backgroundColor: "white",
          borderColor: "black",
        }}>
          <ScrollView
            horizontal={false}
            style={{
              flex: 1,
            }}>
            {/*Favorite Pressables: */}
            <FavButtonArray data={data} />
          </ScrollView>
        </View>
      </View>
    </View>
  );
}