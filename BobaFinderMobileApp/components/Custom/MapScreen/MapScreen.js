import React from "react";
import {
    View,
    Text,
    SafeAreaView,
} from 'react-native';

import styles from './MapScreenStyles';
import StoresMenu from "../StoresMenu/StoresMenu";

export default function MapScreen() {
    return (
        <SafeAreaView style={styles.container}>
          <View>
            <Text>
                MapScreen
            </Text>
          </View>

          <StoresMenu />
        </SafeAreaView>
    );
}
