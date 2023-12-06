import React, {useState} from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import styles from './TeaOptionsScreenStyles';
import { useFonts } from 'expo-font';
import { baseTeas } from '../../../constants/images'
import milkTeaList from '../../../data/milkTeas.json'
import fruitTeaList from '../../../data/fruitTeas.json'
import classicTeaList from '../../../data/classicTeas.json'

import { useRoute } from "@react-navigation/native"

/*
    Screen where users can see all options of tea bases for their custom drink
    Requires collapsible

    npm install react-native-collapsible
*/

export default function TeaOptionsScreen({ route, navigation }) {
    // parameters: user's drink, user's topping
    const { drink, topping } = route.params;
    const [ activeSections, setActiveSections ] = useState([0, 1, 2]);

    // load in fonts
    const [loaded] = useFonts({
        'Assistant': require('../../../assets/fonts/Assistant-Light.ttf'),
        'ComingSoon': require('../../../assets/fonts/ComingSoon-Regular.ttf'),
    });
    
    if (!loaded) {
        return null;
    }

    // section for Classic Teas
    const sections = [
        {
            title: "Classics",
            content:
            <View style = {styles.customizationContainer}>
                {
                    classicTeaList.map(tea => {
                        return (
                            <TouchableOpacity 
                            style={styles.customizationButton} 
                            key={tea.id} 
                            onPress={() => navigation.navigate("Custom", {drink: tea.name, topping: topping})}
                            >
                                <Text style = {{fontSize: 20, marginLeft: "5%", flex: 1, fontFamily: "Assistant"}}>
                                    {tea.name}
                                </Text>
                                <Image source={baseTeas.teaName[tea.name]}
                                    style={styles.customizationIcon}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        )})
                }
            </View>
        }, 
        {   // section for Milk Teas
            title: "Milk Teas",
            content:
                <View style = {styles.customizationContainer}>
                    {
                        milkTeaList.map(tea => {
                            return (
                                <TouchableOpacity 
                                style={styles.customizationButton} 
                                key={tea.id} 
                                onPress={() => navigation.navigate("Custom", {drink: tea.name, topping: topping})}
                                >
                                    <Text style = {{fontSize: 20, marginLeft: "5%", flex: 1, fontFamily: "Assistant"}}>
                                        {tea.name}
                                    </Text>
                                    <Image source={baseTeas.teaName[tea.name]}
                                        style={styles.customizationIcon}
                                        resizeMode="contain"
                                        loa
                                    />
                                </TouchableOpacity>
                            )})
                     }
                </View>
        },
        {   // section for Fruit Teas
            title: "Fruit Teas",
            content:
            <View style = {styles.customizationContainer}>
                {
                    fruitTeaList.map(tea => {
                        return (
                            <TouchableOpacity 
                            style={styles.customizationButton} 
                            key={tea.id} 
                            onPress={() => navigation.navigate("Custom", {drink: tea.name, topping: topping})}
                            >
                                <Text style = {{fontSize: 20, marginLeft: "5%", flex: 1, fontFamily: "Assistant"}}>
                                    {tea.name}
                                </Text>
                                <Image source={baseTeas.teaName[tea.name]}
                                    style={styles.customizationIcon}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        )})
                }
            </View>
        }
    ];

    // Render Headers
    function renderHeader(section, _, isActive) {
        return (
          <View style={styles.accordHeader}>
            <Text style={[styles.accordTitle, {fontFamily: "ComingSoon"}]}>{ section.title }</Text>
          </View>
        );
    }

    //Render Content
    function renderContent(section, _, isActive) {
        return (
          section.content
        );
    }

    // Load in Header, Content, and Sections
    return (
        <SafeAreaView style={styles.container}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic" style = {{width: "100%"}} >
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
