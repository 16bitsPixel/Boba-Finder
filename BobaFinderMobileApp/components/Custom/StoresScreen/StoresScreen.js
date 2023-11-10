import React, {useState} from "react";
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';

import styles from './StoresScreenStyles';

export default function StoresScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
          <View>
            <Text>
                StoresScreen
            </Text>
            <TouchableOpacity
                onPress={() => navigation.navigate("Map")}
            >
                <Text>
                    MapScreen
                </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
    );
}
