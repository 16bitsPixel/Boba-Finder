import { StyleSheet, View, Text, SafeAreaView, TextInput, StatusBar, Image, ImageBackground, TouchableOpacity } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import React, { useEffect, useState } from "react";

// import images
const searchBGImage = require("../../assets/searchbg.png");
const backArrow = require("../../assets/images/arrowLeft.png")

export default function StoresListScreen({ navigation }) {
	// variables and states
	const [mapLat, setMapLat] = useState(37.3387); /* Map initial location latitude : San Jose */
	const [mapLong, setMapLong] = useState(-121.8853); /* Map initial location longitude : San Jose */

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
