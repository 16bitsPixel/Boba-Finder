import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Make Star Ratings
const StarRating = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const halfStar = rating - filledStars >= 0.5;

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < filledStars; i++) {
      stars.push(<Icon key={i} name="star" size={20} color="#FFD700" />);
    }

    if (halfStar) {
      stars.push(<Icon key="half" name="star-half" size={20} color="#FFD700" />);
    }

    return stars;
  };

  return <View style={{ flexDirection: 'row' }}>{renderStars()}</View>;
};

export default StarRating;
