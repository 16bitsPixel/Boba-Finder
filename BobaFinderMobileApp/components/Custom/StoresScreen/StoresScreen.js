import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import axios from 'axios';

import styles from './StoresScreenStyles';

export default function StoresScreen({ navigation }) {
    // make an array for the shops
    const [shops, setShops] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:5555/shops')
            .then((response) => {
                setShops(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <SafeAreaView style={styles.container}>
          <View>
            <Text>
                StoresScreen
            </Text>
            <TouchableOpacity
                onPress={() => navigation.navigate("Map")}
            >
                <Text>
                    MapScreen
                </Text>
            </TouchableOpacity>

            {/* sample map to show that server is connected */}
            {shops.map((shop, index) => (
                <Text>{shop._id}</Text>
            ))}
          </View>
        </SafeAreaView>
    );
}
