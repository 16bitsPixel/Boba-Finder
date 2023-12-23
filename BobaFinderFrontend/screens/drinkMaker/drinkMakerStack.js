import { View, Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import DrinkMakerScreen from "./drinkMakerScreen";

const Stack = createNativeStackNavigator();

export default function DrinkMakerStack() {
	return (
        <Stack.Navigator>
            <Stack.Screen name = "Drink Maker" component = {DrinkMakerScreen} options = {{ headerShown: false }}/>
        </Stack.Navigator>
	);
}