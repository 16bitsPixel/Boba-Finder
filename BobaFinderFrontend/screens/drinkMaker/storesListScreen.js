import { StyleSheet, View, Text, SafeAreaView, TextInput, StatusBar, Image, ImageBackground, TouchableOpacity } from "react-native";

// import images
const searchBGImage = require("../../assets/searchbg.png");
const backArrow = require("../../assets/images/arrowLeft.png")

export default function StoresListScreen({ navigation }) {
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


			{/* section for background image container
					inside: bag with boba tea custom options
			*/}
			<ImageBackground source = {searchBGImage} style = {{flex: 10}}>

				
			</ImageBackground>
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
		flex: 1, 
		alignItems: "center",
        flexDirection: "row",
		paddingBottom: 10
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
});
