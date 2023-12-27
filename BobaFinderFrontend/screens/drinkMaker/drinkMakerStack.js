import { View, Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import DrinkMakerScreen from "./drinkMakerScreen";
import TeaBaseScreen from "./teaBaseScreen";

const Stack = createNativeStackNavigator();

export default function DrinkMakerStack() {
	return (
        <Stack.Navigator screenOptions = {{headerStyle: {backgroundColor: "#C5E7E2"}}}>
            <Stack.Screen name = "Drink Maker" component = {DrinkMakerScreen} options = {{ headerShown: false }} />
            <Stack.Screen name = "Tea Bases" component = {TeaBaseScreen} options = {{ headerShown: true }} />
        </Stack.Navigator>
	);
}