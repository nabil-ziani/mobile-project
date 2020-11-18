import React, {useEffect, useState} from "react";
import { View, Button, StyleSheet } from "react-native";
import InfoField from "./InfoField";
import AsyncStorage from "@react-native-community/async-storage";

export default DetailScreen = ({route, navigation}) => {
	const [title, setTitle] = useState("Voeg toe aan favorieten");
	const [isStored, setIsStored] = useState(false);

	const storeFavorite = async () => {
		try {
			await AsyncStorage.setItem(`@${location.id}`, JSON.stringify(location));
			setTitle("Verwijder uit favorieten");
		} catch (e) {
			console.log(e);
		}
	};
	const removeFavorite = async () => {
		try {
			await AsyncStorage.removeItem(`@${location.id}`);
			setTitle("Voeg toe aan favorieten")
		} catch (e) {
			console.log(e)
		}
	};
	const loadFavorite = async () => {
		try {
			const result = await AsyncStorage.getItem(`@${location.id}`);
			// if current/clicked location is stored:
			if (result !== null) {
				setTitle("Verwijder uit favorieten");
				setIsStored(true);
			}
		} catch (e) {
			console.log(e);
		}
	};

	let location = route.params.itemInfo;
	// removing screenTitle and loading favorite locations
	useEffect(() => {
		navigation.setOptions({ title: "" });
		loadFavorite();
	}, []);

	return (
		<View style={styles.container}>
			<InfoField title="Naam:" info={location.naam} />
			<InfoField title="Adres:" info={`${location.postcode} ${location.district}, ${location.straat} ${location.huisnummer}`} />
			<InfoField title="Type:" info={`${location.type} (${location.subtype})`} />
			<InfoField title="Eigenaar:" info={location.eigenaar == null ? "Onbekend" : location.eigenaar} />
			<InfoField title="Beheerder:" info={location.beheerder == null ? "Onbekend" : location.beheerder} />
			<Button title="Naam een foto" onPress={() => navigation.navigate("Camera")} />
			<Button title={title} onPress={() => {
				isStored ? removeFavorite() : storeFavorite();
				setIsStored(!isStored);
			}} />
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