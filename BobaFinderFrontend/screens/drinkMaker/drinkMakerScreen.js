import { StyleSheet, View, Text, SafeAreaView, TextInput, StatusBar, Image, ImageBackground, TouchableOpacity } from "react-native";

// import images
const searchBGImage = require("../../assets/searchbg.png");
const matchaMilkTea = require("../../assets/matchaMilkTeaBase.png");
const teaBase = require("../../assets/basecup.png");
const toppingBase = require("../../assets/bobaTopping.png");


export default function DrinkMakerScreen() {
	return (
		<SafeAreaView style = {styles.safeContainer}>

			{/* section for the user's location input
				Note: will need to update later to an actual Google Places input (did not implement atm as it costs money)*/}
			<View style = {styles.locationContainer}>
				<TextInput placeholder = "Location" style = {styles.locationInput} />
			</View>


			{/* section for background image container
					inside: bag with boba tea custom options
			*/}
			<ImageBackground source = {searchBGImage} style = {{flex: 10}}>

				{/* section for the boba image that will change based on user's input
						functionality to be added later
				*/}
				<Image source = {matchaMilkTea} resizeMode = "contain" style = {{flex: 1, alignSelf: "center", height: "60%", width: "60%"}} />

				{/* section for the bag + custom buttons*/}
				<View style = {{flex: 1, flexDirection: "column"}}>

					{/* separate view container for the "handles" of the bag */}
					<View style = {{flex: 1, flexDirection: "row", justifyContent: "space-between"}}>

						{/* button for "add items to bag"*/}
						<TouchableOpacity style = {{flex: 1}}>
							<Image source = {{uri: "https://static.thenounproject.com/png/1374113-200.png"}} resizeMode = "contain" style = {[styles.handleButtons, {borderTopWidth: 2, borderRightWidth: 2, borderColor: "rgba(158, 150, 150, .5)"}]} />
						</TouchableOpacity>

						{/* button for "favorites"*/}
						<TouchableOpacity style = {{flex: 1}}>
							<Image source = {{uri: "https://www.iconpacks.net/icons/2/free-favourite-icon-2765-thumb.png"}} resizeMode = "contain" style = {[styles.handleButtons, {alignSelf: "flex-end", borderTopWidth: 2, borderLeftWidth: 2, borderColor: "rgba(158, 150, 150, .5)"}]} />
						</TouchableOpacity>

					</View>
					
					{/* view for the main bag container, contains tea base, toppings, and submit buttons */}
					<View style = {{flex: 4, backgroundColor: "#C5E7E2", borderTopWidth: 2, borderColor: "rgba(158, 150, 150, .5)", alignItems: "center"}}>

						{/* view for the two main custom buttons */}
						<View style = {{flex: 4, flexDirection: "row", marginTop: "5%", justifyContent: "center", gap: "30%"}}>

							{/* button for the tea bases 
									updates image/text on user selected input
								should navigate to the tea bases screen
							*/}
							<TouchableOpacity style = {styles.customButton}>
								<Image source = {teaBase} resizeMode = "contain" style = {{height: "80%"}}/>
								<Text style = {{fontSize: 32, paddingBottom: "10%"}}>Tea Base</Text>
							</TouchableOpacity>


							{/* button for the toppings
									updates image/text on user selected input
								should navigate to the toppings screen
							*/}
							<TouchableOpacity style = {styles.customButton}>
							<Image source = {toppingBase} resizeMode = "contain" style = {{height: "80%"}}/>
								<Text style = {{fontSize: 32, paddingBottom: "10%"}}>Toppings</Text>
							</TouchableOpacity>

						</View>

						{/* button to submit all created drinks
								should send an array to the stores list screen
						*/}
						<TouchableOpacity style = {styles.submitButton}>
							<Text style = {{fontSize: 20}}>Search</Text>
						</TouchableOpacity>

					</View>

				</View>
			</ImageBackground>
		</SafeAreaView>
	);
}

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
		fontSize: 20
	},

	// styles for the bottom bag
	handleButtons: {
		flex: 1,
		backgroundColor: "#C5E7E2",
		height: "100%",
		width: "40%",
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30
	},

	customButton: {
		backgroundColor: "white",
		height: "90%",
		width: "40%",
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center"
	},

	submitButton: {
		flex: 1, 
		backgroundColor: "#A4D9D1",
		width: "35%",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 15,
		marginBottom: "5%"
	}
});