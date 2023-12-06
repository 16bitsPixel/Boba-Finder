import {
  Text,
  View,
  Pressable,
  TouchableOpacity,
  Image
} from 'react-native';

import favStyles from '../FavoriteScreen/FavoriteScreenStyles';
import { images } from '../../../constants';

// Favorite Button function
export default function FavButton({ base, topping }) {
  return (
    <View style={favStyles.pressableBG}>
      <Pressable style={favStyles.favPressable}>
        <Image source={images.logo}
          style={{
            flex: .3,
            width: "25%",
            height: "90%",
          }}
          resizeMode="contain"
        />
        <TouchableOpacity
          style={favStyles.xButton}
        >
          <Image
            source={images.x}
            style={{
              flex: 1,
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={favStyles.favPressText}>
          <View>
            <Text
              style={
                favStyles.drink
              }
            >
              {base}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              flex: .7
            }}
          >
            <Text
              style={
                favStyles.drinkdesc
              }
            >
              {topping}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}