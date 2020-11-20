import React, { useEffect, useState, useRef } from 'react';
import { Camera } from 'expo-camera';
import { View, Button, Text } from "react-native";
import * as FileSystem from 'expo-file-system';

export default CameraScreen = ({navigation, route}) => {
  const [hasPermission, setHasPermission] = useState();
  const camera = useRef();

  const takePicture = async () => {
    let location = route.params.itemInfo;
    // check if image exists and deleting it
    let path = `${FileSystem.documentDirectory}${location.id}.jpg`;
    let checkImage = await FileSystem.getInfoAsync(path);
		if (checkImage.exists) {
			await FileSystem.deleteAsync(path);
		}
    // taking new picture
    let picture = await camera.current.takePictureAsync();
    try {
			// storing image in app's file system
			await FileSystem.moveAsync({
				from: picture.uri,
				to: FileSystem.documentDirectory + `${location.id}.jpg`,
			});
		} catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{flex: 1}}>
      <Camera style={{flex: 1}} type={Camera.Constants.Type.back} ref={camera} />
      <Button title="Neem foto" onPress={async() => {
        await takePicture();
        navigation.popToTop();
      }} />
    </View>
  )
}