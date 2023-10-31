import React from "react";
import { View, Text, StyleSheet } from 'react-native';

/*
    Screen where users can see all options of tea bases for their custom drink
*/

export default function TeaOptionsScreen() {
    return (
        <View style={styles.container}>
            <Text>Tea Options Screen</Text>
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