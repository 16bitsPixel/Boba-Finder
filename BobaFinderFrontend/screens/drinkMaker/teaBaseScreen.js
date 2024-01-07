import React, {useState, useEffect} from "react";
import { StyleSheet, View, Text, SafeAreaView, TextInput, StatusBar, Image, TouchableOpacity, ScrollView, Pressable } from "react-native";
import Accordion from "react-native-collapsible/Accordion";

// import teas list and images
import teaList from "../../assets/data/baseTeas.json"
import { baseTeas } from "../../assets/data/customTeaImages.js"
const backArrow = require("../../assets/images/arrowLeft.png")

export default function TeaBaseScreen({ route, navigation }) {
    // parameters: user's drink, user's topping
    const [ activeSections, setActiveSections ] = useState([0, 1, 2]);
    const [ selected, setSelected ] = useState("");
    const [ toppings, setToppings ] = useState([]);
    const teas = new Map();

    // get the user's selected toppings
	useEffect(() => {
		setToppings(route.params?.toppings);
	});

    /*
        creates sections for each type of tea
            each section will contain teas in baseTeas.json
            each tea is represented as a button
            when a tea is selected, the background color should change accordingly
                if not selected already turn green and turn past selected option to white
                if selected already, turn to white
            the tea that is selected should be "remembered" when travelling back to main screen

        - have an array for all of the teas
        - when a tea is selected, go through array and change all backgrounds back to white
        - then change selected tea background to colored
    */
    const sections = [
        {
            // section for classic teas
            title: "Classic Teas",
            content:
                <View style = {styles.customizationContainer}>
                    {
                        teaList.classics.map(tea => {
                            const [ teaSelect, setTeaSelect ] = useState(false);
                            teas.set(tea.name, setTeaSelect);

                            return (
                                <TouchableOpacity 
                                    style={[styles.customizationButton, {backgroundColor: teaSelect ? "#bdffee" : "white"}]}
                                    key = {tea.id}
                                    delayPressIn={1000}
                                    onPressIn = {() => {
                                        if (selected) {
                                            teas.get(selected)(false);
                                        }
                                        setSelected(tea.name);
                                        setTeaSelect(!teaSelect);
                                    }}
                                    delayPressOut={300}
                                >
                                    <Image source={baseTeas.teaName[tea.name]}
                                        style={styles.customizationIcon}
                                        resizeMode="contain"
                                    />
                                    <Text style = {{fontSize: 16, textAlign: "center"}}>
                                        {tea.name}
                                    </Text>
                                </TouchableOpacity>
                            )})
                    }
                </View>
        },
        {
            // section for milk teas
            title: "Milk Teas",
            content:
                <View style = {styles.customizationContainer}>
                    {
                        teaList.milkTeas.map(tea => {
                            const [ teaSelect, setTeaSelect ] = useState(false);
                            teas.set(tea.name, setTeaSelect);

                            return (
                                <TouchableOpacity 
                                style={[styles.customizationButton, {backgroundColor: teaSelect ? "#bdffee" : "white"}]}
                                key={tea.id} 
                                delayPressIn={1000}
                                onPressIn = {() => {
                                    if (selected) {
                                        teas.get(selected)(false);
                                    }
                                    setSelected(tea.name);
                                    setTeaSelect(!teaSelect);
                                }}
                                delayPressOut={300}
                                >
                                    <Image source={baseTeas.teaName[tea.name]}
                                        style={styles.customizationIcon}
                                        resizeMode="contain"
                                    />
                                    <Text style = {{fontSize: 16, textAlign: "center"}}>
                                        {tea.name}
                                    </Text>
                                </TouchableOpacity>
                            )})
                    }
                </View>
        },
        {
            // section for fruit teas
            title: "Fruit Teas",
            content:
                <View style = {styles.customizationContainer}>
                    {
                        teaList.fruitTeas.map(tea => {
                            const [ teaSelect, setTeaSelect ] = useState(false);
                            teas.set(tea.name, setTeaSelect);

                            return (
                                <TouchableOpacity 
                                style={[styles.customizationButton, {backgroundColor: teaSelect ? "#bdffee" : "white"}]}
                                key={tea.id} 
                                delayPressIn={1000}
                                onPressIn = {() => {
                                    if (selected) {
                                        teas.get(selected)(false);
                                    }
                                    setSelected(tea.name);
                                    setTeaSelect(!teaSelect);
                                }}
                                delayPressOut={300}
                                >
                                    <Image source={baseTeas.teaName[tea.name]}
                                        style={styles.customizationIcon}
                                        resizeMode="contain"
                                    />
                                    <Text style = {{fontSize: 16, textAlign: "center"}}>
                                        {tea.name}
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

            {/* section for header */}
			<View style = {styles.headerContainer}>
                {/* back button */}
                <TouchableOpacity onPress = {() => {navigation.navigate("Drink Maker", { baseTea: selected, toppings: toppings})}} style = {{justifyContent: "center"}}>
                        <Image source = {backArrow} resizeMode = "contain" style = {{width: "5%", position: "absolute", right: 150}} />
                </TouchableOpacity>

				<Text style = {{fontSize: 20}}>Tea Bases</Text>
			</View>

            {/* section for search input
                    according to what user enters, should open the appropriate section(s) and only show teas that have the input as part of their name
            */}
			<View style = {styles.searchContainer}>
				<TextInput placeholder = "Search" style = {styles.searchInput} />
			</View>

            {/* accordion that uses renderHeader and renderContent to dynamically create the tea options */}
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

    // styles for header container
    headerContainer: {
		alignItems: "center",
        justifyContent: "center",
        paddingTop: "5%",
        height: "8%",
        borderBottomWidth: 2,
        borderBottomColor: "rgba(112, 163, 156, .5)"
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
        marginLeft: "6%",
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

    // styles for button functionality
    isSelected: {
        backgroundColor: "blue"
    },

    notSelected: {
        backgroundColor: "white"
    }
});