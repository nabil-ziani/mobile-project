import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Icons
import { Feather } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Importing Custom Components
import MapScreen from "./components/MapScreen";
import ListScreen from "./components/ListScreen";
import DetailScreen from "./components/DetailScreen";
import FavoriteScreen from './components/FavoriteScreen';
import CameraScreen from "./components/CameraScreen";

const StackScreenMap = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Map">
        {() => <MapScreen {...props} data={props.data} />}
      </Stack.Screen>
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
    </Stack.Navigator>
  );
}
const StackScreenList = (props) => {
  return (
		<Stack.Navigator>
			<Stack.Screen name="List">
				{() => <ListScreen {...props} data={props.data} />}
			</Stack.Screen>
			<Stack.Screen name="Detail" component={DetailScreen} />
			<Stack.Screen name="Camera" component={CameraScreen} />
		</Stack.Navigator>
	);
}
const StackScreenFavorite = (props) => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Favorites">
				{() => <FavoriteScreen {...props} data={props.data} />}
			</Stack.Screen>
		</Stack.Navigator>
	);
};

export default function App() {
  const [data, setData] = useState([]);

  // Functie voor data in te laden
  const loadData = async () => {
    try {
      let response = await fetch("https://api.jsonbin.io/b/5fafb2615be6ec73e94e5d9c");
      let json = await response.json();

      setData(json.features);
    } catch (exception) {
      console.log(exception)
    }
  }
  // Functie oproepen zodra screen wordt geladen
  useEffect(() => {
    loadData();
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Map" options={{ tabBarIcon: ({ color, size }) => (<Feather name="map" size={size} color={color} />) }}>
            {props => <StackScreenMap {...props} data={data} />}
          </Tab.Screen>
          <Tab.Screen name="List" options={{ tabBarIcon: ({ color, size }) => (<Feather name="list" size={size} color={color} />) }}>
            {props => <StackScreenList {...props} data={data} />}
          </Tab.Screen>
          <Tab.Screen name="Favorites" options={{ tabBarIcon: ({ color, size }) => (<Feather name="star" size={size} color={color} />) }}>
            {props => <StackScreenFavorite {...props} data={data} />}
          </Tab.Screen>
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
