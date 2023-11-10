import React from "react";
import {
    View,
    Text,
    SafeAreaView,
} from 'react-native';

import styles from './MapScreenStyles';

export default function MapScreen() {
    return (
        <SafeAreaView style={styles.container}>
          <View>
            <Text>
                MapScreen
            </Text>
          </View>
        </SafeAreaView>
    );
}
