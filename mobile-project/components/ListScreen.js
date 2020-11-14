import React from "react";
import { View, Text } from "react-native";

export default ListScreen = (props) => {
	//console.log('test from ListScreen');
	//console.log(props.data);

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
			<Text>Hier komt de lijst.</Text>
		</View>
	);
};
