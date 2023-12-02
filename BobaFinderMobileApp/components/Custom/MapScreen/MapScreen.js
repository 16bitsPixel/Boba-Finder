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
  const [mapLat, setMapLat] = useState(37.0016); /* Map initial location: Santa Cruz College Nine */
  const [mapLong, setMapLong] = useState(-122.0573);
  const [location, setLocation] = useState(null);
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);
  const [distance, setDistance] = useState(null)
  const [dynamicMarkers, setMarkers] = useState([]);

  // load in the data
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getShops = async () => {
        try {
            // use iPv4 address
            const response = await fetch('https://us-west-2.aws.data.mongodb-api.com/app/application-1-agiaq/endpoint/shops');
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getShops();
    }, []);

  let markers = [
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

  // here we put the data in the format we want in dynamicMarkers
  // we would also only want to put the boba shops in that match the user's boba request
  data.map((item) => {
    let lat = item.lattitude;
    let long = item.longitude;
    markers.push(
      {
        coordinate: {latitude: lat, longitude: long},
        title: item.restaurantName,
        description: item.address
      }
    );
  });

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

  // get the address
  const getAddress = (address) => {
    console.log('Address: ', address)
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
          <Text>Distance to marker: {distance} mi</Text>
          <Text>Latitude: {userLatitude}</Text>
          <Text>Longitude: {userLongitude}</Text>

          <StoresMenu getAddress={getAddress} />
        </SafeAreaView>
    );
}