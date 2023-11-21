import React, { useEffect, useState } from "react";
import MapView, { Marker, Heatmap, PROVIDER_GOOGLE } from 'react-native-maps';
import {
    View,
    Text,
    SafeAreaView,
} from 'react-native';

import styles from './MapScreenStyles';
import StoresMenu from "../StoresMenu/StoresMenu";

export default function MapScreen() {
  const [mapLat, setMapLat] = useState(37.0016); /* Map initial location: Santa Cruz College Nine */
  const [mapLong, setMapLong] = useState(-122.0573);

  const locationData = [
    {latitude: 36.9650, longitude: -122.0413}, /* Marker 1:  Tzone */
    {latitude: 36.9640, longitude: -122.0244}, /* Marker 2: Ume Tea */
  ];


    return (
        <SafeAreaView style={styles.container}>
          <MapView                        /* Map currently just shows user location */
            style={styles.map}            /* Need to grab user location to show direction */
            provider={ PROVIDER_GOOGLE }
            showsUserLocation={true} 
            initialRegion={{
              latitude: mapLat,
              longitude: mapLong,
              latitudeDelta: 0.0922, /* This configures the user's view of the map */
              longitudeDelta: 0.0421, /* This configures the user's view of the map */
            }}
            >
            {locationData.map((data, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: data.latitude,
                    longitude: data.longitude,
                  }}
                  title={`Marker ${index + 1}`}
                  description={`Weight: ${data.weight}`}
                />
              ))}
            </MapView>
            <StoresMenu />
        </SafeAreaView>
    );
}
