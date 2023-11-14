import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
} from 'react-native';

import styles from './MapScreenStyles';

export default function MapScreen() {
    return (
        <SafeAreaView style={styles.container}>
          <MapView                        /* Map currently just shows user location */
            style={styles.map}            /* Need to grab user location to show direction */
            provider={ PROVIDER_GOOGLE }
            showsUserLocation={true} 
          />
          <Text>
              MapScreen
          </Text>
        </SafeAreaView>
    );
}
