import React from "react";
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
// Custom component
import ListItem from "./ListItem";

export default ListScreen = ({navigation, data}) => {
	// This function returns JSX for each location
	const renderItem = ({item}) => {
		let location = item.properties;

		return (
			<TouchableOpacity onPress={() => navigation.navigate('Detail', {itemInfo: location})}>
				<ListItem data={location} />
			</TouchableOpacity>
		)
	}
	const keyExtractor = (item) => item.properties.id;

	return (
		<FlatList data={data} keyExtractor={keyExtractor} renderItem={renderItem} />
	);
};