import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

export default ListScreen = ({navigation, data}) => {
	// This function returns JSX for each location
	const renderItem = ({item}) => {
		let location = item.properties;

		return (
			<TouchableOpacity onPress={() => navigation.navigate('DetailList', {itemInfo: location})}>
					<View style={styles.container}>
						<Text style={styles.locationName}>{location.naam}</Text>
						<Text style={styles.locationAddress}>{location.postcode} {location.district}, {location.straat} {location.huisnummer}</Text>
						<Ionicons style={styles.icon} name="ios-arrow-forward" size={18} color="#76777c" />
					</View>
			</TouchableOpacity>
		)
	}
	const keyExtractor = (item) => item.properties.id;

	return (
		<FlatList data={data} keyExtractor={keyExtractor} renderItem={renderItem}/>
	);
};

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
