import React, { useEffect, useState, useRef } from 'react';
import { Camera } from 'expo-camera';
import { View, Button, Text } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import * as FileSystem from 'expo-file-system';

export default CameraScreen = ({navigation, route}) => {
  const [hasPermission, setHasPermission] = useState();
  const camera = useRef();

  const takePicture = async () => {
    let picture = await camera.current.takePictureAsync();
    try {
      let location = route.params.itemInfo;
      // random string
      let randomString = new Date().toString().replace(/\s/g, "");
      // storing random string so we can use it
      await AsyncStorage.setItem(`@${location.naam}`, randomString);
      // then we store
      let path = `${FileSystem.documentDirectory}${location.id}${randomString}.jpg`;
			// storing image in app's file system
			await FileSystem.moveAsync({
				from: picture.uri,
				to: path,
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
        navigation.goBack();
      }} />
    </View>
  )
}