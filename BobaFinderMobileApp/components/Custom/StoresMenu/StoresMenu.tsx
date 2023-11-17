import React, { useCallback, useRef, useMemo, useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
} from 'react-native';
import axios from 'axios';
import BottomSheet, { BottomSheetFlatList, BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";

import styles from './StoresMenuStyles';

export default function StoresMenu() {
    // make an array for the shops
    const [shops, setShops] = useState([]);

    /*
    useEffect(() => {
        fetch('http://10.0.0.77:5555/shops')
            .then((response) => {
                console.log(response);
                setShops(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);
    */

    const getMovies = async () => {
        try {
            const response = await fetch('http://10.0.0.77:5555/shops');
            const json = await response.json();
            setData(json);
            console.log(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMovies();
    }, []);
    // hooks
    const sheetRef = useRef<BottomSheet>(null);

    // variables
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
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
        <BottomSheet
            ref={sheetRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChange}
        >
            <BottomSheetFlatList
                data={data}
                keyExtractor={({ id }) => id}
                renderItem={({ item }) => (
                    <Text>
                        {item.Description}, {item.Price}
                    </Text>
                )}
            />
        </BottomSheet>
    );
};
