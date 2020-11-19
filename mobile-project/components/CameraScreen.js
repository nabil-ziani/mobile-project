import React, { useEffect, useState, useRef } from 'react';
import { Camera } from 'expo-camera';
import { View, Button, StyleSheet, Text } from "react-native";
import * as FileSystem from 'expo-file-system';

export default CameraScreen = ({navigation, route}) => {
  const [hasPermission, setHasPermission] = useState();
  const camera = useRef();

  const takePicture = async () => {
    let picture = await camera.current.takePictureAsync();
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
    })();
  }, []);

  if (hasPermission === null) {
    console.log(hasPermission);
    return <View />
  }
  if (hasPermission === false) {
    console.log(hasPermission);
    return <Text>No access to camera</Text>;
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