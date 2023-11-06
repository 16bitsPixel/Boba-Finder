import { useCallback } from 'react';
import { StyleSheet, Text, View, Pressable, Image, ScrollView} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import favStyles from './FavoriteScreenStyles'

export default function FavoriteScreen({navigation}) {
  const [fontsLoaded, fontError] = useFonts({
    'Assistant': require('../../assets/fonts/Assistant-Light.ttf'),
    'ComingSoon': require('../../assets/fonts/ComingSoon-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if(!fontsLoaded && !fontError) {
    return null;
  }

  return (
  <View style={favStyles.container}>
    {/*div for favorites bar w/ back button and favorite drink pressables*/}
    <View style={{
      flex: 1,
      width: "100%",
      }}>
      
      {/*div for top bar w/ 'Favorites' and return button*/}
      <View style ={favStyles.headerBar}>
        
        {/*pressable element for back button to return to custom screen*/}
        <Pressable style={favStyles.backButton}
          onPress={() => navigation.navigate("Search")}>
          <Image source= {require("../../assets/images/arrowLeft.png")}
          style={favStyles.backButtonImage}
          resizeMode="center"
          />
        </Pressable>
        
        {/*div for text 'Favorites' */}
        <View style ={favStyles.favHeaderText}>
          <Text style={
            favStyles.header
          }>Favorites</Text>
        </View>
      </View>

      {/*div for each pressable:favorite drink elements */}
        <View style ={{
          flex: 1,
          backgroundColor: "white",
          borderColor: "black",
          }}>
          <ScrollView 
            horizontal={false} 
            style={{
            flex:1,
            }}>
            <View style={favStyles.pressableBG}>
                <Pressable style={{ 
                    flex: .35,
                    flexDirection: "row",
                    justifyContent: "space-around",
                    width: "85%",
                    height: 100,
                    backgroundColor: "#F1F1F1",
                    borderWidth: 1,
                    borderColor: "black",
                    borderRadius: 20,
                    marginVertical: 10,
                    }}>
                    <Image source= {require("../../assets/images/logo.png")}
                      style={{
                      flex: .3,
                      width: "25%",
                      height: "90%",
                      }}
                      resizeMode="contain"
                    />
                    <View style={{ 
                      flex: 0.7,
                      height: "100%",
                      flexDirection: "column",
                      justifyContent: "space-evenly",
                      }}>
                        <View>
                          <Text style={
                            favStyles.drink
                          }>Drink #1</Text>
                        </View>
                        <View style={{
                          flexDirection: "column",
                          flex: .7
                          }}>
                        <Text style={
                          favStyles.drinkdesc
                        }>Description of Drink </Text>
                        </View>
                    </View>
                </Pressable>
              
              </View>
          </ScrollView>
        </View>
    </View>
  </View>
  );
}