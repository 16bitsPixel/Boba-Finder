import React, { useEffect, useState } from "react";
import MapView, { Marker, Heatmap, PROVIDER_GOOGLE } from 'react-native-maps';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
} from 'react-native';


import styles from './MapScreenStyles';


export default function MapScreen() {
  const [mapLat, setMapLat] = useState(37.0016); /* Map initial location: Santa Cruz College Nine */
  const [mapLong, setMapLong] = useState(-122.0573);


  const markers = [
    {
      coordinate: {latitude: 36.9650, longitude: -122.0413,},
      title: "TZone",
      description:"https://maps.app.goo.gl/wSRoj39U3h1YfFS38?g_st=ic",
    },
    {
      coordinate: {latitude: 36.9640, longitude: -122.0244,},
      title: "Ume Tea",
      description:"https://maps.app.goo.gl/4UoQiokiHd8WuPhb7?g_st=ic",
    },
    // Add more markers as needed
  ];
 
  const renderMarkers = () => {
    return markers.map((marker, index) => (
      <Marker
        key={index}
        coordinate={marker.coordinate}
        title={marker.title}
        description={marker.description}
      />
    ));
  };


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
              {renderMarkers()}
            </MapView>
          <Text>
              Make another view thing and put the stores here
          </Text>
        </SafeAreaView>
    );
}