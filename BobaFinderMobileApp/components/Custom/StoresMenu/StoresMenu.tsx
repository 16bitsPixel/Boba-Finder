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
    const bFilter = passDetails.base;

    //Filter toppings
    var tFilter = passDetails.toppings;
    var altFilter = "alternative";
    if (tFilter == "creama/foam") {
        tFilter = "foam";
        altFilter = "foam";
      } else if (tFilter == "strawberry popping boba" || tFilter == "mango popping boba") {
        altFilter = "popping boba";
      } else if (tFilter == "boba") {
        altFilter = "pearl";
      }

    //Filter both base and toppings
    const intersectData = data.filter((item) => {return ((item.teaBases.indexOf(bFilter) >= 0) && ((item.teaToppings.indexOf(tFilter) >= 0) || (item.teaToppings.indexOf(altFilter) >= 0) || (passDetails.toppings.length == 0)))});
    console.log(intersectData);
    console.log("Final Data Length: " + intersectData.length);

    //Calculates distance between store and User Location
    const calcDistance = (lat, long) => {
        var R = 3958.8; // Radius of the Earth in miles
        var rLat1 = lat * (Math.PI/180); // Convert degrees to radians
        var rLat2 = passDetails.latitude * (Math.PI/180); // Convert degrees to radians
        var diffLat = rLat2-rLat1; // Radian difference (latitudes)
        var diffLon = (long-passDetails.longitude) * (Math.PI/180); // Radian difference (longitudes)
  
        var d = 2 * R * Math.asin(Math.sqrt(Math.sin(diffLat/2)*Math.sin(diffLat/2)+Math.cos(rLat1)*Math.cos(rLat2)*Math.sin(diffLon/2)*Math.sin(diffLon/2)));
        console.log(d.toFixed(2));
        return(d.toFixed(2));
    };

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
                        {/* Use calcDistance here with lat as item.latitude and long as item.longitude */}
                        <Text style={styles.distance}>
                            {calcDistance(item.lattitude, item.longitude)} miles away
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
                        {intersectData.map(renderItem)}
                    </BottomSheetScrollView>
                </BottomSheet>
                );
};
