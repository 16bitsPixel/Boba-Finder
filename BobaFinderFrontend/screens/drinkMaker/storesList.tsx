import React, { useCallback, useRef, useMemo, useEffect, useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, TextInput, StatusBar, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import BottomSheet, { BottomSheetScrollView, } from "@gorhom/bottom-sheet";

export default function StoresList({passDetails}) {
    // variables
    const snapPoints = useMemo(() => ['30%', '60%', '100%'], []);

    return (
        <BottomSheet
            handleStyle = {{backgroundColor: "#C5E7E2"}}
            backgroundStyle = {{backgroundColor: "#C5E7E2"}}
            index = {1}
            snapPoints = {snapPoints}
        >
            <BottomSheetScrollView
                contentContainerStyle={styles.container}
                scrollEnabled={true}
            >
                {passDetails.map(restaurant => {
                    return (
                        <Text key = {restaurant}>{restaurant}</Text>
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

    container: {
        flex: 1,
        padding: 24,
    },

    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },

});