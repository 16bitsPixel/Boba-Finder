import React, { useEffect, useState } from "react";
import MapView, { Marker, Heatmap, PROVIDER_GOOGLE } from 'react-native-maps';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

/*import Geolocation from 'react-native-geolocation-service';*/
import * as Location from 'expo-location';

import styles from './MapScreenStyles';
import StoresMenu from "../StoresMenu/StoresMenu";

export default function MapScreen() {
  const getAddress = (address) => {
    console.log('Address: ', address)
  };

  const [mapLat, setMapLat] = useState(37.0016); /* Map initial location: Santa Cruz College Nine */
  const [mapLong, setMapLong] = useState(-122.0573);
  const [location, setLocation] = useState(null);
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);
  const [distance, setDistance] = useState(null)

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

  useEffect(() => {
    // Gets permission from user to get user location
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        console.log("Please grant location permissions");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setUserLatitude(location.coords.latitude)
      setUserLongitude(location.coords.longitude)
      console.log("Location:");
      console.log(location);
    };
    getPermissions();

    //Calculates distance between Marker at index and User Location
    const calcDistance = async (index) => {
      var R = 3958.8; // Radius of the Earth in miles
      var rlat1 = markers[index].coordinate.latitude * (Math.PI/180); // Convert degrees to radians
      var rlat2 = userLatitude * (Math.PI/180); // Convert degrees to radians
      var difflat = rlat2-rlat1; // Radian difference (latitudes)
      var difflon = (markers[index].coordinate.longitude-userLongitude) * (Math.PI/180); // Radian difference (longitudes)

      var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
      setDistance(d.toFixed(2))
      console.log(d.toFixed(2));
      // document.getElementById('msg').innerHTML = "Distance between markers: " + distance.toFixed(2) + " mi.";
    };
    var ind = 1; //index = 1, change to do a loop and do it for all markers
    calcDistance(ind);
  },  []);
 
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