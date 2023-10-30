import React from "react";
import { Text, View, StyleSheet } from 'react-native';

/*
    Screen where users can see all options of toppings for their custom drink
*/

export default function ToppingOptionsScreen() {
    return (
        <View style={styles.container}>
            <Text>Topping Options Screen</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});