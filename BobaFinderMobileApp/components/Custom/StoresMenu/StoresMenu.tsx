import React, { useCallback, useRef, useMemo, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import BottomSheet, { BottomSheetScrollView, } from "@gorhom/bottom-sheet";
import styles from './StoresMenuStyles';
import StarRating from "./Rating";
import { images } from "../../../constants";

export default function StoresMenu({ getAddress, passDetails }) {
    console.log(passDetails.latitude);
    console.log(passDetails.longitude);
    console.log(passDetails.base);
    console.log(passDetails.toppings);
    // make an array for the shops
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [finaldata, setFinalData] = useState([]);
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

    //Filter bases
    const bfilter = passDetails.base;
    //Filter toppings
    var tfilter = passDetails.toppings;
    if (tfilter == "creama/foam") {
        tfilter = "foam";
      } else if (tfilter == "strawberry popping boba" || tfilter == "mango popping boba") {
        tfilter = "popping boba";
      }
    var tcfilter = tfilter;
    //Filter both base and toppings
    const intersectData = data.filter((item) => {return ((item.teaBases.indexOf(bfilter) >= 0) && (item.teaToppings.indexOf(tcfilter) >= 0))});
    console.log(intersectData);
    console.log("Final Data Length: " + intersectData.length);

    // hooks
    const sheetRef = useRef<BottomSheet>(null);

    // variables
    const snapPoints = useMemo(() => ["25", "90%"], []);

    // callbacks
    const handleSheetChange = useCallback((index) => {
        console.log("handleSheetChange", index);
    }, []);

    const sendAddress = (store) => {
        getAddress(store.address)
    }

    // Image Preloader
    const ImagePreLoader = ({ imageUrl }) => {
        const [imageLoaded, setImageLoaded] = useState(false);

        useEffect(() => {
            const image = { uri: imageUrl };

            // Preload the image
            Image.prefetch(image.uri).then(
                () => {
                    setImageLoaded(true);
                },
                (error) => {
                    console.error(`Failed to load image: $(imageUrl)`, error);
                    setImageLoaded(true);
                }
            );
        }, [imageUrl]);

        return (
            <View>
                {!imageLoaded && <ActivityIndicator size="large" color="black" />}
                {imageLoaded && <Image source={{uri: imageUrl}} style={styles.image} resizeMode="contain"/>}
            </View>
        );
    };

    const imageUrl = "https://github.com/16bitsPixel/Boba-Finder/blob/main/BobaFinderMobileApp/assets/images/basecup.png?raw=true";
    // render store card from data.json
    const renderItem = useCallback(
        (item) => (
            <TouchableOpacity
                style={styles.card}
                key={item.id}
                // Pressing a store card will route the user to the store's pin on the map
                onPress={() => sendAddress(item)}
            >
                {/* Left side: Image */}
                <ImagePreLoader imageUrl={imageUrl}/>

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
                            <StarRating rating="4.5" />
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

    if (isLoading) {
        return (
            <BottomSheet
                handleStyle={styles.handle}
                ref={sheetRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChange}
            >
                <BottomSheetScrollView
                        contentContainerStyle={styles.loadingContainer}
                        scrollEnabled={true}
                >
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color="black" />
                        <Text>
                            Finding Stores...
                        </Text>
                    </View>
                </BottomSheetScrollView>
            </BottomSheet>
                )
    }
    else {

    }

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
                        {/* To run, change this to: finaldata.map(renderItem) */}
                        {/* Then Save and Expo app should update */}
                        {/* If it doesn't work, try switching between data and final data a few times */}
                        {intersectData.map(renderItem)}
                    </BottomSheetScrollView>
                </BottomSheet>
                );
};
