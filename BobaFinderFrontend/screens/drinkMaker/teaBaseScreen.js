import React, {useState} from "react";
import { StyleSheet, View, Text, SafeAreaView, TextInput, StatusBar, Image, TouchableOpacity, ScrollView } from "react-native";
import Accordion from "react-native-collapsible/Accordion";

// import teas list
import classicTeaList from "../../assets/data/classicTeas.json"

export default function TeaBaseScreen({ navigation }) {
    // parameters: user's drink, user's topping
    const [ activeSections, setActiveSections ] = useState([0, 1, 2]);

    // section for Classic Teas
    const sections = [
        {
            title: "Classic Teas",
            content:
            <View style = {styles.customizationContainer}>
                {
                    classicTeaList.map(tea => {
                        return (
                            <TouchableOpacity 
                            style={styles.customizationButton} 
                            key={tea.id} 
                            >
                                <Text style = {{fontSize: 20, marginLeft: "5%", flex: 1}}>
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
            {/* section for search input */}
			<View style = {styles.searchContainer}>
				<TextInput placeholder = "Search" style = {styles.searchInput} />
			</View>

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

const styles = StyleSheet.create({
	safeContainer: {
		flex: 1,
		backgroundColor: "#C5E7E2",
		paddingTop: StatusBar.currentHeight,
		shadowRadius: 2,
		shadowOpacity: 0.1
	},

    // styles for the search input at top of screen
	searchContainer: {
		flex: 0.4, 
		alignItems: "center",
        paddingTop: "5%"
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
    accordContainer: {
        paddingBottom: 5,
    },

    accordHeader: {
        padding: 12,
        backgroundColor: '#A4D9D1',
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
        width: "100%"
    },

    accordTitle: {
        fontSize: 20,
        width: "100%",
        textAlign: "center"
    },

    customizationContainer: {
        backgroundColor: "#C5E7E2",
        flex: 1,
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: "4%"
    },

    customizationButton: {
        backgroundColor: "white",
        width: "80%",
        height: 80,
        marginTop: "5%",
        borderRadius: "12px",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1
    },

    customizationIcon: {
        height: "100%",
        flex: 1
    },
});