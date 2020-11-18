import React, {useEffect, useState} from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Ionicons } from "@expo/vector-icons";

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
					<TouchableOpacity key={index} onPress={() => navigation.navigate('DetailList', {itemInfo: location})}>
							<View style={styles.container}>
								<Text style={styles.locationName}>{location.naam}</Text>
								<Text style={styles.locationAddress}>{location.postcode} {location.district}, {location.straat} {location.huisnummer}</Text>
								<Ionicons style={styles.icon} name="ios-arrow-forward" size={18} color="#76777c" />
							</View>
					</TouchableOpacity>
				)
			}) :
					<View style={{padding: 20}}>
						<Text style={styles.locationName}>Er zijn nog geen favorieten toegevoegd.</Text>
					</View>}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 15,
		borderBottomColor: "#e5e1dc",
		borderBottomWidth: 1,
	},
	icon: {
		position: "absolute",
		right: 20,
	},
	locationName: {
		fontWeight: "bold",
		fontSize: 16,
	},
	locationAddress: {
		fontSize: 15,
	},
});