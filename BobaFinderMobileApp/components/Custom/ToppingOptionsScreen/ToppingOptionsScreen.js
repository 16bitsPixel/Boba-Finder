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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C5E7E2',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
    },
    customizationContainer: {
        backgroundColor: "#C5E7E2",
        flex: 1,
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: "4%"
    },
    scrollView: {
        /* scrollView styles */
    },
    customizationButton: {
        backgroundColor: "white",
        width: '100%',
        height: 80,
        marginTop: "5%",
        borderRadius: "12px",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center",
        flex: 1
    },
    customizationIcon: {
        height: "100%",
        flex: 1,
    },
});