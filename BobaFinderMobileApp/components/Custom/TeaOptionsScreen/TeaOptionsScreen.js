import React, {useState} from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

import styles from './TeaOptionsScreenStyles'
import { images } from '../../../constants'

/*
    Screen where users can see all options of tea bases for their custom drink
    Requires collapsible

    npm install react-native-collapsible
*/

export default function TeaOptionsScreen() {
    const [ activeSections, setActiveSections ] = useState([]);
    const sections = [
        {
            title: "Milk Teas",
            content:
                <View style = {styles.customizationContainer}>
                    <TouchableOpacity style = {styles.customizationButton}>
                        <Text style = {{fontSize: 20, marginLeft: "5%"}}>
                            Black Tea
                        </Text>
                        <Image source={images.basecup}
                            style={styles.customizationIcon}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.customizationButton}>
                        <Text style = {{fontSize: 20, marginLeft: "5%"}}>
                            Green Tea
                        </Text>
                        <Image source={images.basecup}
                            style={styles.customizationIcon}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
        },
        {
            title: "Fruits Teas",
            content: <Text>Test</Text>
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
            contentInsetAdjustmentBehavior="automatic">
              <Accordion
                align="bottom"
                sections={sections}
                activeSections={activeSections}
                renderHeader={renderHeader}
                renderContent={renderContent}
                onChange={(sections) => setActiveSections(sections)}
                sectionContainerStyle={styles.accordContainer}
              />
          </ScrollView>
        </SafeAreaView>
    );
}
