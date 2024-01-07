import React, { useCallback, useRef, useMemo, useEffect, useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, TextInput, StatusBar, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import BottomSheet, { BottomSheetScrollView, } from "@gorhom/bottom-sheet";

export default function StoresList({passDetails}) {
    // variables
    const snapPoints = useMemo(() => ['18%', '60%', '100%'], []);

    return (
        <BottomSheet
            handleStyle = {styles.handle}
            backgroundStyle = {{backgroundColor: "#C5E7E2"}}
            index = {1}
            snapPoints = {snapPoints}
        >
            {/* container for the bottom sheet header */}
            <View style = {styles.headerContainer}>

                {/* button for more sorting options */}
                <TouchableOpacity style = {styles.sortButton}>
                    <Text style = {{fontSize: 16, textAlign: "center"}}>Sort By</Text>
                </TouchableOpacity>

                {/* sorting for shops open right now */}
                <TouchableOpacity style = {styles.sortButton}>
                    <Text style = {{fontSize: 16, textAlign: "center"}}>Open Now</Text>
                </TouchableOpacity>

                {/* sorting for shops by pricing */}
                <TouchableOpacity style = {styles.sortButton}>
                    <Text style = {{fontSize: 16, textAlign: "center"}}>Price</Text>
                </TouchableOpacity>
            </View>

            <BottomSheetScrollView
                scrollEnabled={true}
            >
                {passDetails.map(restaurant => {
                    return (

                        // store card
                        <View style = {styles.card} >
                            
                            {/* logo of the restaurant
                            <Image source = {} />
                            */}
                            <View style = {{flex: 1, justifyContent: "center"}}>

                            </View>

                            {/* restaurant details */}
                            <View style = {{flex: 1, justifyContent: "center"}}>
                                <Text>{restaurant}</Text>
                                <Text>5 STARS</Text>
                                <Text>Location</Text>
                            </View>

                        </View>
                    )
                })}
            </BottomSheetScrollView>
        </BottomSheet>
    );
};

// styling
const styles = StyleSheet.create({
	safeContainer: {
		flex: 1,
		backgroundColor: "#C5E7E2",
		paddingTop: StatusBar.currentHeight,
		shadowRadius: 2,
		shadowOpacity: 0.1
	},

    // style for the header
    handle: {
        backgroundColor: "#C5E7E2",
        borderTopWidth: 2,
        borderTopColor: "rgba(112, 163, 156, .5)",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },

    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingBottom: "5%",
        marginTop: "3%",
        marginBottom: "3%",
        borderBottomWidth: 2,
        borderBottomColor: "rgba(112, 163, 156, .5)"
    },

    sortButton: {
        backgroundColor: "#A4D9D1",
        borderRadius: 25,
        width: "25%",
        paddingVertical: 8
    },

    // style for store cards
    card: {
        width: "80%", 
        height: 100, 
        flexDirection: "row",
        alignSelf: "center", 
        backgroundColor: "white", 
        marginTop: "3%",
        marginBottom: "3%",
        borderRadius: 15
    },

});