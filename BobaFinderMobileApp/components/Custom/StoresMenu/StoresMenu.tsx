import React, { useCallback, useRef, useMemo, useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import BottomSheet, { BottomSheetFlatList, BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";

import styles from './StoresMenuStyles';
import stores from '../../../data/stores.json';

export default function StoresMenu() {
    // make an array for the shops
    const [shops, setShops] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    // use iPv4 address
    useEffect(() => {
        fetch('http://10.0.0.112/shops')
            .then((response) => {
                console.log(response);
                setShops(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const getMovies = async () => {
        try {
            const response = await fetch('http://10.0.0.112:5555/shops');
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
    const snapPoints = useMemo(() => ["25", "90%"], []);

    // callbacks
    const handleSheetChange = useCallback((index) => {
        console.log("handleSheetChange", index);
    }, []);

    // render card from data.json
    const renderItem = useCallback(
        (item) => (
            <TouchableOpacity
                style={styles.card}
                key={item.id}
                // TODO: pressing a store card will route the user to the store's pin on the map
                onPress={() => {}}
            >
                <Text style={styles.cardText}>
                    {item.restaurantName}, {item.address}
                    {"\n"}
                    Bases: {item.teaBases.join(', ')}
                    {"\n"}
                    Toppings: {item.teaToppings.join(', ')}
                </Text>
            </TouchableOpacity>
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
            <BottomSheetScrollView
                contentContainerStyle={styles.container}
                scrollEnabled={true}
            >
                {data.map(renderItem)}
            </BottomSheetScrollView>
        </BottomSheet>
    );
};
