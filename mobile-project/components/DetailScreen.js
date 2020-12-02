import React, {useEffect, useState} from "react";
import { View, Button, StyleSheet, Image, Text } from "react-native";
import InfoField from "./InfoField";
import AsyncStorage from "@react-native-community/async-storage";
import * as FileSystem from "expo-file-system";
import { Camera } from "expo-camera";

export default DetailScreen = ({route, navigation}) => {
	const [title, setTitle] = useState("Voeg toe aan favorieten");
	const [isStored, setIsStored] = useState(false);
	const [image, setImage] = useState('');

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
	const loadImage = async () => {
		try {
			const randomString = await AsyncStorage.getItem(`@${location.naam}`);
			let path = `${FileSystem.documentDirectory}${location.id}${randomString}.jpg`;
			// check if there exists an image for this location
			let picture = await FileSystem.getInfoAsync(path);
			if (picture.exists) {
				setImage(picture.uri);
			}
		} catch (e) {
			console.log(e)
		}
	};
	const askPermission = async () => {
		const { status } = await Camera.requestPermissionsAsync();
		if (status === "granted") {
			return true;
		} else {
			return false;
		}
	}

	// This location is going to be sent to the CameraScreen
	let location = route.params.itemInfo;
	// removing screenTitle and loading favorite locations
	useEffect(() => {
		navigation.setOptions({ title: "" });
		loadFavorite();
		// when screen is focused, load (new) image if there is
		navigation.addListener('focus', () => {
			loadImage();
		})
	}, []);

	return (
		<View style={styles.container}>
			{image !== '' ? <Image source={{uri: image}} style={styles.image} /> : <View />}
			<InfoField title="Naam:" info={location.naam} />
			<InfoField title="Adres:" info={`${location.postcode} ${location.district}, ${location.straat} ${location.huisnummer}`} />
			<InfoField title="Type:" info={`${location.type} (${location.subtype})`} />
			<InfoField title="Eigenaar:" info={location.eigenaar == null ? "Onbekend" : location.eigenaar} />
			<InfoField title="Beheerder:" info={location.beheerder == null ? "Onbekend" : location.beheerder} />
			<Button title="Neem een foto" onPress={async () => await askPermission() && navigation.navigate("Camera", {itemInfo: location})} />
			<View style={{height: 10}} />
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
	},
	image: {
		height: '30%',
    width: '100%',
		marginBottom: 10
	}
});