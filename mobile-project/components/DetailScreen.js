import React, {useEffect} from "react";
import { View, Text, StyleSheet } from "react-native";
import InfoField from "./InfoField";

export default DetailScreen = ({route, navigation}) => {
	let location = route.params.itemInfo;
	// different output depending on whether houseNumber is provided
		let address = `${location.straat} ${location.huisnummer}, ${location.postcode} ${location.district}`;
		if (location.huisnummer == " ")
			address = `${location.straat}, ${location.postcode} ${location.district}`;

	// removing screenTitle
	useEffect(() => {
		navigation.setOptions({ title: "" });
	}, []);

	return (
		<View style={styles.container}>
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
	}
});