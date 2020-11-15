import React from "react";
import { View, Text, StyleSheet } from "react-native";
import InfoField from "./InfoField";

export default DetailScreen = ({route}) => {
	let location = route.params.itemInfo;
	// different output depending on whether houseNumber is provided
		let address = `${location.straat} ${location.huisnummer}, ${location.postcode} ${location.district}`;
		if (location.huisnummer == " ")
			address = `${location.straat}, ${location.postcode} ${location.district}`;

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{location.naam}</Text>
			<InfoField title="Naam:" info={location.naam} />
			<InfoField title="Adres:" info={address} />
			<InfoField title="Type:" info={`${location.type} (${location.subtype})`} />
			<InfoField title="Eigenaar" info={location.eigenaar} />
			<InfoField title="Beheerder" info={location.beheerder} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
		borderBottomColor: "#e5e1dc",
		borderBottomWidth: 1,
	},
	title: {
		fontWeight: "600",
		fontSize: 18,
		marginBottom: 10,
	}
});