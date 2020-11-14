import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FlatList } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";
import MapView, { Marker } from "react-native-maps";
// Icons
import { Feather } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Importing Custom Components
import MapScreen from "./components/MapScreen";
import ListScreen from "./components/ListScreen";
import DetailScreen from "./components/DetailScreen";

const StackScreenMap = () => {
  return (
		<Stack.Navigator>
			<Stack.Screen name="AppName" component={MapScreen} />
			<Stack.Screen name="Detail" component={DetailScreen} />
		</Stack.Navigator>
	);
}
const StackScreenList = () => {
  return (
		<Stack.Navigator>
			<Stack.Screen name="AppName" component={ListScreen} />
			<Stack.Screen name="Detail" component={DetailScreen} />
		</Stack.Navigator>
	);
}

export default function App() {
  const [data, setData] = useState([]);
  // Functie voor data in te laden
  const loadData = async() => {
    try {
      let response = await fetch("https://api.jsonbin.io/b/5fafb2615be6ec73e94e5d9c");
      let json = await response.json();

      setData(json.features);
    } catch (exception) {
      console.log(exception)
    }
  }

  // Functie oproepen zodra screen worrdt geladen
  useEffect(() => {
    loadData();
  }, [])

  console.log(data) // test

  return (
		<View style={{ flex: 1 }}>
			<NavigationContainer>
				<Tab.Navigator>
					<Tab.Screen name="Map" component={StackScreenMap} options={
            {tabBarIcon: (color, size) => <Feather name="map" size={size} color={color} />}
          }/>
					<Tab.Screen name="List" component={StackScreenList} options={
            {tabBarIcon: (color, size) => <Feather name="list" size={size} color={color} />}
          }/>
				</Tab.Navigator>
			</NavigationContainer>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
