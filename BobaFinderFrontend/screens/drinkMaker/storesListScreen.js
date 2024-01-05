import { StyleSheet, View, Text, SafeAreaView, TextInput, StatusBar, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import React, { useEffect, useState } from "react";

// currently works for one individual drink, will have to update to handle more than one drink

// import images
const searchBGImage = require("../../assets/searchbg.png");
const backArrow = require("../../assets/images/arrowLeft.png")

export default function StoresListScreen({ route, navigation }) {
	// variables and states
	const [mapLat, setMapLat] = useState(37.3387); /* Map initial location latitude : San Jose */
	const [mapLong, setMapLong] = useState(-121.8853); /* Map initial location longitude : San Jose */
	const [ baseTea, setTea ] = useState("");
	const [ toppings, setToppings ] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState([]);

	// get the user's selected tea/toppings
	useEffect(() => {
		setTea(route.params?.baseTea);
		setToppings(route.params?.toppings);
	});

	// fetch restaurant data from database
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

	/*
		filter and sort data here
			for now just puts all restaurants on map
	*/
	data.map((item) => {
		let lat = item.lattitude;
    	let long = item.longitude;

		// first check to see if the shop has the base tea
		let matchBase = false;
		for (tea in item.teaBases) {
			if (item.teaBases[tea] == baseTea.toLowerCase()) {
				matchBase = true;
			}
		}

		// second check to see if the shop has all the toppings we want
		let matchTop = true;
		for (let i = 0; i < toppings.length; i++) {
			if (!item.teaToppings.includes(toppings[i].toLowerCase())) {
				matchTop = false;
				break;
			}
		}

		// pushes the restaurant data on to map as it fits all categories
		if (matchBase && matchTop) {
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

	// loading screen while we get stores
	if (isLoading) {
		return (
		  <View style={styles.container}>
			<ActivityIndicator size="large" color="black" />
			<Text>
			  Finding Stores...
			</Text>
		  </View>
		)
	}
	
	// main screen with all stores
	return (
		<SafeAreaView style = {styles.safeContainer}>

			{/* section for the user's location input
				Note: will need to update later to an actual Google Places input (did not implement atm as it costs money)*/}
			<View style = {styles.locationContainer}>

                {/* replace with image of back button later */}
                <TouchableOpacity onPress = {() => {navigation.navigate("Drink Maker")}} style = {{justifyContent: "center"}}>
                    <Image source = {backArrow} resizeMode = "contain" style = {{position: "absolute", height: "30%"}} />
                </TouchableOpacity>

				<TextInput placeholder = "Location" style = {styles.locationInput} />
			</View>


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
		</SafeAreaView>
	);
}

// styling
const styles = StyleSheet.create({
	safeContainer: {
		flex: 1,
		backgroundColor: "#C5E7E2",
		paddingTop: StatusBar.currentHeight,
		shadowRadius: 2,
		shadowOpacity: 0.1
	},

	// styles for the location input at top of screen
	locationContainer: {
		alignItems: "center",
        flexDirection: "row",
		height: "10%",
		paddingBottom: 5
	},

	locationInput: {
		backgroundColor: "white",
		height: "75%",
		width: "75%",
		borderRadius: 15,
		padding: 10,
		shadowRadius: 2,
		shadowOpacity: 0.1,
		textAlign: "center",
		fontSize: 20,
		marginLeft: 50
	},

	// styles for the map
	map: {
        height: '90%',
        width: '100%',
		top: "17%",
		position: "absolute",
    },
});
