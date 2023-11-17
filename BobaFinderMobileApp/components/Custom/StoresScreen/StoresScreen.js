import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
    FlatList
} from 'react-native';
//comment this back in to use axios, i commented it out b/c it was given me errors for now
//import axios from 'axios';

import styles from './StoresScreenStyles';

export default function StoresScreen({ navigation }) {
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
   
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

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

            <View style={{flex: 1, padding: 24}}>
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                <FlatList
                  data={data}
                  keyExtractor={({id}) => id}
                  renderItem={({item}) => (
                    <Text>
                      {item.Description}, {item.Price}
                    </Text>
                  )}
                />
              )}
            </View>
          </View>
        </SafeAreaView>
    );
}
