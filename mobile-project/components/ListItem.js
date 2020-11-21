import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default ListItem = (props) => {
  let location = props.data;
	return (
		<View style={styles.container}>
			<Text style={styles.locationName}>{location.naam}</Text>
			<Text style={styles.locationAddress}>{location.postcode} {location.district}, {location.straat} {location.huisnummer}</Text>
			<Ionicons style={styles.icon} name="ios-arrow-forward" size={18} color="#76777c" />
		</View>
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