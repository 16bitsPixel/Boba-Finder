import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import * as Location from 'expo-location';
import styles from './MapScreenStyles';
import StoresMenu from "../StoresMenu/StoresMenu";

export default function MapScreen({ route, navigation }) {
  //parameters: user drink, user topping
  const { drink, topping } = route.params;

  const [mapLat, setMapLat] = useState(37.3387); /* Map initial location latitude : San Jose */
  const [mapLong, setMapLong] = useState(-121.8853); /* Map initial location longitude : San Jose */
  const [location, setLocation] = useState(null);
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);

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

  //empty markers
  let markers = [];


  // Gets permission from user to get user location
  useEffect(() => {
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
      console.log("User latitude, longitude:", location.coords.latitude, location.coords.longitude);
    };
    getPermissions();
  }, []);

  // Put the data in the format we want in dynamicMarkers
  // Also put the boba shops in that match the user's boba request
  data.map((item) => {
    let lat = item.lattitude;
    let long = item.longitude;

    //Check if shop has drink
    var matchBase = false;
    for (tea in item.teaBases) {
      if (item.teaBases[tea] === drink.toLowerCase()) {
        matchBase = true;
      }
    }
    var matchTop = false;

    //Check if shop has topping
    var fixedtop = topping.toLowerCase();
    for (top in item.teaToppings) {
      if (item.teaToppings[top] === fixedtop || topping.length == 0) {
        matchTop = true;
      }
      if (fixedtop == "strawberry popping boba" || fixedtop == "mango popping boba") {
        if (item.teaToppings[top] === fixedtop || item.teaToppings[top] === "popping boba") {
          matchTop = true;
        }
      }
      if (fixedtop == "creama/foam") {
        if (item.teaToppings[top] === "foam" || item.teaToppings[top] === "creama") {
          matchTop = true;
        }
      }
      if (fixedtop == "boba") {
        if (item.teaToppings[top] === "boba" || item.teaToppings[top] === "pearl") {
          matchTop = true;
        }
      }
    }

    //Check if shop has both drink and topping
    if (matchBase == true && matchTop == true) {
      markers.push(
        {
          coordinate: { latitude: lat, longitude: long },
          title: item.restaurantName,
          description: item.address
        }
      );
    }
  });

  //render markers on map
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

  //pass user latitude, longitude, drink base, and topping to map screen
  const passDetails = {
    latitude: userLatitude,
    longitude: userLongitude,
    base: drink.toLowerCase(),
    toppings: topping.toLowerCase(),
  }

  console.log(passDetails)

  if (passDetails.latitude == null || passDetails.longitude == null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="black" />
        <Text>
          Finding Stores...
        </Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <MapView                        /* Map currently just shows user location */
        style={styles.map}            /* Need to grab user location to show direction */
        provider={PROVIDER_GOOGLE}
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

      <StoresMenu getAddress={getAddress} passDetails={passDetails} />
    </SafeAreaView>
  );
}