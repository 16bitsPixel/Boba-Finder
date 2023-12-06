import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import FavButton from './FavButton';

// Makes array of favorite buttons
const FavButtonArray = ({ data }) => {
  return (
    <View>
      {data.map((drink, index) => (
        <FavButton key={index} {...drink} />
      ))}
    </View>
  );
};

export default FavButtonArray;