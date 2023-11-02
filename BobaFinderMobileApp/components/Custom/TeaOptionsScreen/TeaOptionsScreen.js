import React, {useState} from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

/*
    Screen where users can see all options of tea bases for their custom drink
    Requires collapsible

    npm install react-native-collapsible
*/

export default function TeaOptionsScreen() {
    const [ activeSections, setActiveSections ] = useState([]);
    const sections = [
        {
            title: 'Milk Teas',
            content:
                <TouchableOpacity>
                    
                </TouchableOpacity>
        },
        {
            title: 'Fruit Teas',
            content: <Text>test2</Text>
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
          <View style={styles.accordBody}>
            {section.content}
          </View>
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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C5E7E2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    accordContainer: {
        paddingBottom: 4
    },
    accordHeader: {
        padding: 12,
        backgroundColor: '#666',
        color: '#eee',
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    accordTitle: {
        fontSize: 20,
    },
    accordBody: {
        padding: 12
    },
    textSmall: {
        fontSize: 16
    },
    seperator: {
        height: 12
    }
});