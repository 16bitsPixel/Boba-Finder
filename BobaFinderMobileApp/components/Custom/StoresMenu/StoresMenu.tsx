import React, { useCallback, useRef, useMemo, useEffect, useState } from "react";
import {View, Text, Image, TouchableOpacity,} from 'react-native';
import BottomSheet, {BottomSheetScrollView,} from "@gorhom/bottom-sheet";
import styles from './StoresMenuStyles';
import StarRating from "./Rating";
import { images } from "../../../constants";

export default function StoresMenu() {
    // make an array for the shops
    const [shops, setShops] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getShops = async () => {
        try {
            // use iPv4 address
            const response = await fetch('https://us-west-2.aws.data.mongodb-api.com/app/application-1-agiaq/endpoint/shops');
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getShops();
    }, []);

    // hooks
    const sheetRef = useRef<BottomSheet>(null);

    // variables
    const snapPoints = useMemo(() => ["25", "90%"], []);

    // callbacks
    const handleSheetChange = useCallback((index) => {
        console.log("handleSheetChange", index);
    }, []);

    // render store card from data.json
    const renderItem = useCallback(
        (item) => (
            <TouchableOpacity
                style={styles.card}
                key={item.id}
                // Pressing a store card will route the user to the store's pin on the map
                onPress={() => { }}
            >
                {/* Left side: Image */}
                <Image source={ images.basecup } style={styles.image} resizeMode="contain" />

                {/* Right side: Details */}
                <View style={styles.detailsContainer}>
                    {/* Store Name */}
                    <Text style={styles.storeName}>
                        {item.restaurantName}
                    </Text>

                    {/* Rating */}
                    <View style={styles.ratingContainer}>
                        {/* Render stars based on store.rating */}
                        {/* You can use an external library or create your own component */}
                        {/* Example: */}
                        {/* <StarRating rating={store.rating} /> */}
                        <Text>
                            <StarRating rating="4.5"/>
                        </Text>
                    </View>

                    {/* Description */}
                    <Text style={styles.description}>
                        {/* Show matching bases */}
                        Bases: {item.teaBases.slice(0, 2).join(', ')}
                        {"\n"}
                        {/* Show matching toppings */}
                        Toppings: {item.teaToppings.slice(0, 2).join(', ')}
                    </Text>

                    {/* Store Hours and Distance */}
                    <View style={styles.infoContainer}>
                        {/* TODO: show store operational hours */}
                        <Text style={styles.hours}>
                            12:00AM-11:59PM
                        </Text>
                        {/* TODO: show euclidean distance from user to store */}
                        <Text style={styles.distance}>
                            x miles away
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        ),
        []
    );
    return (
        <BottomSheet
            handleStyle={styles.handle}
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
