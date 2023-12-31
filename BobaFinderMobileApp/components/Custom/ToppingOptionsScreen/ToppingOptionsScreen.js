import React from "react";
import {Text, ScrollView, View, SafeAreaView, Image, TouchableOpacity,} from 'react-native';
import styles from '../ToppingOptionsScreen/ToppingOptionsScreenStyles';
import toppingList from '../../../data/toppings.json';
import { toppings } from "../../../constants/images";
import { useFonts } from 'expo-font';

/*
    Screen where users can see all options of toppings for their custom drink
*/
export default function ToppingOptionsScreen({ route, navigation }) {
    // parameters: user's drink, user's topping
    const { drink, topping } = route.params;

    // load fonts
    const [loaded] = useFonts({
        'Assistant': require('../../../assets/fonts/Assistant-Light.ttf'),
        'ComingSoon': require('../../../assets/fonts/ComingSoon-Regular.ttf'),
    });
    
    if (!loaded) {
        return null;
    }

    return (
        // SafeAreaView hides the top part of the screen where the camera is
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style = {{width: "100%"}}
            >
                <View style={styles.customizationContainer}>
                    {/* ScrollView allows for scrolling */}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={styles.scrollView}
                    >
                        {
                            toppingList.map(topping => {
                                return (
                                    <TouchableOpacity
                                        style={styles.card}
                                        key={topping.id}
                                        onPress={() => navigation.navigate("Custom", {drink: drink, topping: topping.name})}
                                    >
                                        <Text style = {[styles.cardText, {fontFamily: "Assistant"}]}>
                                            {topping.name}
                                        </Text>
                                        <Image 
                                            source={toppings.topName[topping.name]}
                                            style={styles.cardIcon}
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
