import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default InfoField = (props) => {
  return (
		<View style={{ marginBottom: 15 }}>
			<Text style={styles.infoTitle}>{props.title}</Text>
			<Text style={styles.info}>{props.info}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	infoTitle: {
		fontWeight: "600",
		fontSize: 16,
	},
	info: {
		fontSize: 16,
	},
});
