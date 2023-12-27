import React, {useState} from "react";
import { StyleSheet, View, Text, SafeAreaView, TextInput, StatusBar, Image, TouchableOpacity, ScrollView } from "react-native";
import Accordion from "react-native-collapsible/Accordion";

// import toppings list and topping images
import toppingsList from "../../assets/data/toppings.json"
import { toppings } from "../../assets/data/customTeaImages.js"

export default function ToppingsScreen({ navigation }) {
    // parameters: user's drink, user's topping
    const [ activeSections, setActiveSections ] = useState([0, 1, 2, 3, 4]);

    /*
        creates sections for each type of topping
            each section will contain toppings in toppings.json
            each topping is represented as a button
            when a topping is selected, the background color should change accordingly
                if not selected already turn green
                if selected already, turn to white
            the topping(s) that is/are selected should be "remembered" when travelling back to main screen
    */
    const sections = [
        {
            // section for boba/pearls
            title: "Boba/Pearls",
            content:
                <View style = {styles.customizationContainer}>
                    {
                        toppingsList.boba.map(topping => {
                            return (
                                <TouchableOpacity 
                                style={styles.customizationButton} 
                                key={topping.id} 
                                >
                                    <Image source={toppings.topName[topping.name]}
                                        style={styles.customizationIcon}
                                        resizeMode="contain"
                                    />
                                    <Text style = {{fontSize: 16, textAlign: "center"}}>
                                        {topping.name}
                                    </Text>
                                </TouchableOpacity>
                            )})
                    }
                </View>
        },
        {
            // section for jellies
            title: "Jellies",
            content:
                <View style = {styles.customizationContainer}>
                    {
                        toppingsList.jelly.map(topping => {
                            return (
                                <TouchableOpacity 
                                style={styles.customizationButton} 
                                key={topping.id} 
                                >
                                    <Image source={toppings.topName[topping.name]}
                                        style={styles.customizationIcon}
                                        resizeMode="contain"
                                    />
                                    <Text style = {{fontSize: 16, textAlign: "center"}}>
                                        {topping.name}
                                    </Text>
                                </TouchableOpacity>
                            )})
                    }
                </View>
        },
        {
            // section for puddings
            title: "Puddings",
            content:
                <View style = {styles.customizationContainer}>
                    {
                        toppingsList.pudding.map(topping => {
                            return (
                                <TouchableOpacity 
                                style={styles.customizationButton} 
                                key={topping.id} 
                                >
                                    <Image source={toppings.topName[topping.name]}
                                        style={styles.customizationIcon}
                                        resizeMode="contain"
                                    />
                                    <Text style = {{fontSize: 16, textAlign: "center"}}>
                                        {topping.name}
                                    </Text>
                                </TouchableOpacity>
                            )})
                    }
                </View>
        },
        {
            // section for fruit
            title: "Fruit",
            content:
                <View style = {styles.customizationContainer}>
                    {
                        toppingsList.fruit.map(topping => {
                            return (
                                <TouchableOpacity 
                                style={styles.customizationButton} 
                                key={topping.id} 
                                >
                                    <Image source={toppings.topName[topping.name]}
                                        style={styles.customizationIcon}
                                        resizeMode="contain"
                                    />
                                    <Text style = {{fontSize: 16, textAlign: "center"}}>
                                        {topping.name}
                                    </Text>
                                </TouchableOpacity>
                            )})
                    }
                </View>
        },

        {
            // section for foam
            title: "Foam",
            content:
                <View style = {styles.customizationContainer}>
                    {
                        toppingsList.foam.map(topping => {
                            return (
                                <TouchableOpacity 
                                style={styles.customizationButton} 
                                key={topping.id} 
                                >
                                    <Image source={toppings.topName[topping.name]}
                                        style={styles.customizationIcon}
                                        resizeMode="contain"
                                    />
                                    <Text style = {{fontSize: 16, textAlign: "center"}}>
                                        {topping.name}
                                    </Text>
                                </TouchableOpacity>
                            )})
                    }
                </View>
        },
    ];

    // Render Headers
    function renderHeader(section, _, isActive) {
        return (
          <View style={styles.accordHeader}>
            <Text style={[styles.accordTitle]}>{ section.title }</Text>
          </View>
        );
    }

    //Render Content
    function renderContent(section, _, isActive) {
        return (
          section.content
        );
    }

	return (
		<SafeAreaView style = {styles.safeContainer}>
            {/* section for search input
                    according to what user enters, should open the appropriate section(s) and only show toppings that have the input as part of their name
            */}
			<View style = {styles.searchContainer}>
				<TextInput placeholder = "Search" style = {styles.searchInput} />
			</View>

            {/* accordion that uses renderHeader and renderContent to dynamically create the topping options */}
            <ScrollView contentInsetAdjustmentBehavior="automatic" style = {{width: "100%"}} >
              <Accordion
                align="bottom"
                sections={sections}
                activeSections={activeSections}
                renderHeader={renderHeader}
                renderContent={renderContent}
                onChange={(sections) => setActiveSections(sections)}
                sectionContainerStyle={styles.accordContainer}
                expandMultiple = {true}
              />
          </ScrollView>
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
		shadowOpacity: 0.1,
        marginBottom: 78
	},

    // styles for the search input at top of screen
	searchContainer: {
		alignItems: "center",
        paddingTop: "5%",
        height: "13%",
        borderBottomWidth: 2,
        borderBottomColor: "rgba(112, 163, 156, .5)"
	},

	searchInput: {
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

    // styles for the accordion container
    accordHeader: {
        padding: 12,
        backgroundColor: '#A4D9D1',
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
        width: "100%",
        borderBottomWidth: 2,
        borderBottomColor: "rgba(112, 163, 156, .5)"
    },

    accordTitle: {
        fontSize: 20,
        width: "100%",
        textAlign: "left",
    },

    customizationContainer: {
        backgroundColor: "#C5E7E2",
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        rowGap: "3%",
        columnGap: "15%",
        paddingBottom: "5%",
        marginLeft: "2%"
    },

    customizationButton: {
        backgroundColor: "white",
        width: 110,
        height: 110,
        marginTop: "5%",
        borderRadius: "12px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },

    customizationIcon: {
        height: "100%",
        flex: 1
    },
});