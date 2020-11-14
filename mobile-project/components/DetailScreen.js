import React from "react";
import { View, Text } from "react-native";

export default DetailScreen = (props) => {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
			<Text>Dit is de detail-screen waarnaar beide screens verwijzen.</Text>
		</View>
	);
};
