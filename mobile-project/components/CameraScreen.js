import React, { useEffect, useState, useRef } from 'react';
import { Camera } from 'expo-camera';
import { View, Button, StyleSheet, Text } from "react-native";
import * as FileSystem from 'expo-file-system';
import * as Permissions from "expo-permissions";

export default CameraScreen = ({navigation, route}) => {
  const [hasPermission, setHasPermission] = useState();
  const [hasAccess, setHasAccess] = useState();
  const camera = useRef();

  const takePicture = async () => {
    let picture = await camera.current.takePictureAsync();
    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    setHasAccess(status === 'granted');
    console.log(status);
    // storing image in app's file system with locationId as name
    try {
      let location = route.params.itemInfo;
      await FileSystem.moveAsync({
        from: picture.uri,
        to: FileSystem.documentDirectory + `${location.id}.jpg`
      });
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      return;
    })();
  }, []);

  if (hasPermission === null || hasAccess === null) {
    console.log(hasPermission);
    return <View />
  }
  if (hasPermission === false) {
    console.log(hasPermission);
    return <Text>No access to camera</Text>;
  }
  if (hasAccess === false) {
    console.log(hasAccess);
		return <Text>No access to photo library</Text>;
  }

  return (
    <View style={{flex: 1}}>
      <Camera style={{flex: 1}} type={Camera.Constants.Type.back} ref={camera} />
      <Button title="Neem foto" onPress={() => {
        takePicture();
        navigation.popToTop();
      }} />
    </View>
  )
}