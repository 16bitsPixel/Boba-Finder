import React from "react";
import {
    Text,
    ScrollView,
    View,
    SafeAreaView,
    StatusBar,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import toppingList from '../../../data/toppings.json'

/*
    Screen where users can see all options of toppings for their custom drink
*/

export default function ToppingOptionsScreen() {
    return (
        // SafeAreaView hides the top part of the screen where the camera is
        <SafeAreaView style={styles.container}>
            {/* ScrollView allows for scrolling */}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                {
                    toppingList.map(topping => {
                        return (
                            <TouchableOpacity style={styles.card} key={topping.id}>
                                <Text style={styles.cardtext}> {topping.name}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        /* scrollView styles */
    },
    card: {
        backgroundColor: "white",
        padding: 16,
        marginBottom: 16,
    },
    cardtext: {
        fontSize: 30,
    }
});