import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// screens
import DrinkMakerStack from "./screens/drinkMaker/drinkMakerStack";
import FavoritesScreen from "./screens/favorites/favoriteScreen";
import AccountScreen from "./screens/account/accountScreen";

const Tab = createBottomTabNavigator();

// dynamic navigation utilizing tab nav outer and stack inner
export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen name = "Drink Maker" component = {DrinkMakerStack} />
				<Tab.Screen name = "Favorites" component = {FavoritesScreen} />
				<Tab.Screen name = "Account" component = {AccountScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}
