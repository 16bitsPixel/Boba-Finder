import React, {useState} from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import styles from './TeaOptionsScreenStyles'
import { baseTeas } from '../../../constants/images'
import milkTeaList from '../../../data/milkTeas.json'
import fruitTeaList from '../../../data/fruitTeas.json'
import classicTeaList from '../../../data/classicTeas.json'

/*
    Screen where users can see all options of tea bases for their custom drink
    Requires collapsible

    npm install react-native-collapsible
*/

export default function TeaOptionsScreen({ route, navigation }) {
    const { drink, topping } = route.params;
    const [ activeSections, setActiveSections ] = useState([0, 1, 2]);
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
                                <Text style = {{fontSize: 20, marginLeft: "5%", flex: 1}}>
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
        {
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
                                    <Text style = {{fontSize: 20, marginLeft: "5%", flex: 1}}>
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
        {
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
                                <Text style = {{fontSize: 20, marginLeft: "5%", flex: 1}}>
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

    function renderHeader(section, _, isActive) {
        return (
          <View style={styles.accordHeader}>
            <Text style={styles.accordTitle}>{ section.title }</Text>
          </View>
        );
    }

    function renderContent(section, _, isActive) {
        return (
          section.content
        );
    }

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
