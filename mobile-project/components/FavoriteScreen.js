import React, {useEffect, useState} from 'react';
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
// Custom Component
import ListItem from './ListItem';

export default FavoriteScreen = ({data, navigation}) => {
	const [locations, setLocations] = useState([]);
	const [isEmpty, setIsEmpty] = useState(true);
	// function to fill the array with favoriteLocations. if there aren't any, "isEmpty" is set to true
	const searchFavorites = async () => {
		try {
			let array = new Array;
			let count = 0;
			// looping over data and checking if we find any of the locations stored in asyncStorage,
			// if there are locations stored they are pushed into "array" and then our state will get the value of this array
			data.forEach(async (location) => {
				if(await AsyncStorage.getItem(`@${location.properties.id}`) !== null){
					array.push(location);
					setLocations([...array]);
					setIsEmpty(false);
					count += 1; // this is used to determine if there was a location stored
				} else if (count == 0) { // if there wasn't we come here:
					setIsEmpty(true);
				}
			});
		} catch (e) {
			console.log(e)
		}
	}

	// when screen is rendered first time this should be triggered
	useEffect(() => {
		navigation.addListener("focus", async () => {
			await searchFavorites();
		});
	}, [])

	return (
		<ScrollView>
			{!isEmpty ? locations.map((location, index) => {
				location = location.properties;
				return (
					<TouchableOpacity key={index} onPress={() => navigation.navigate('List', {screen : 'Detail', initial: false, params: {itemInfo: location}})}>
							<ListItem data={location} />
					</TouchableOpacity>
				)}) :
					<View style={{padding: 20}}>
						<Text style={{fontSize: 16, fontWeight: 'bold'}}>Er zijn nog geen favorieten toegevoegd.</Text>
					</View>}
		</ScrollView>
	);
}