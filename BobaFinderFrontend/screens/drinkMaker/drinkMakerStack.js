import { View, Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import DrinkMakerScreen from "./drinkMakerScreen";
import TeaBaseScreen from "./teaBaseScreen";
import ToppingsScreen from "./toppingsScreen";
import StoresListScreen from "./storesListScreen";

const Stack = createNativeStackNavigator();

export default function DrinkMakerStack() {
	return (
        <Stack.Navigator screenOptions = {{headerStyle: {backgroundColor: "#C5E7E2"}, gestureDirection: 'vertical'}}>
            <Stack.Screen name = "Drink Maker" component = {DrinkMakerScreen} options = {{ headerShown: false }} />
            <Stack.Screen name = "Tea Bases" component = {TeaBaseScreen} options = {{ headerShown: false }} />
            <Stack.Screen name = "Toppings" component = {ToppingsScreen} options = {{ headerShown: false }} />
            <Stack.Screen name = "Stores List" component = {StoresListScreen} options = {{ headerShown: false }} />
        </Stack.Navigator>
	);
}