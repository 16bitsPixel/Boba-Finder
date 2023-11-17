import React, { useCallback, useRef, useMemo } from "react";
import {
    View,
    Text,
} from 'react-native';
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

import styles from './StoresMenuStyles';

export default function StoresMenu() {
    // hooks
    const sheetRef = useRef<BottomSheet>(null);

    // variables
    const data = useMemo(
        () =>
            Array(50)
                .fill(0)
                .map((_, index) => `index-${index}`),
        []
    );
    const snapPoints = useMemo(() => ["25", "90%"], []);

    // callbacks
    const handleSheetChange = useCallback((index) => {
        console.log("handleSheetChange", index);
    }, []);

    // render
    const renderItem = useCallback(
        (item) => (
            <View key={item} style={styles.itemContainer}>
                <Text>{item}</Text>
            </View>
        ),
        []
    );
    return (
        <View style={styles.container}>
            <BottomSheet
                ref={sheetRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChange}
            >
                <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
                    {data.map(renderItem)}
                </BottomSheetScrollView>
            </BottomSheet>
        </View>
    );
};
