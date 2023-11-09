import React from "react";
import {
    Text,
    ScrollView,
    View,
    SafeAreaView,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import styles from '../ToppingOptionsScreen/ToppingOptionsScreenStyles'
import toppingList from '../../../data/toppings.json'
import { images } from "../../../constants";

/*
    Screen where users can see all options of toppings for their custom drink
*/

export default function ToppingOptionsScreen() {
    return (
        // SafeAreaView hides the top part of the screen where the camera is
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic" style = {{width: "100%"}}
            >
                <View style={styles.customizationContainer}>
                    {/* ScrollView allows for scrolling */}
                    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                        {
                            toppingList.map(topping => {
                                return (
                                    <TouchableOpacity
                                        style={styles.customizationButton}
                                        key={topping.id}
                                    >
                                        <Text style = {{fontSize: 20, marginLeft: "5%", flex: 1}}>
                                            {topping.name}
                                        </Text>
                                        <Image source={images.toppingscup}
                                            style={styles.customizationIcon}
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
