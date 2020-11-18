import React, { useEffect, useState, useRef } from 'react';
import { Camera } from 'expo-camera';
import { View, Button, StyleSheet, Text,Image } from "react-native";

export default CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState();
  const [image, setImage] = useState();
  const camera = useRef();

  const takePicture = async () => {
    let picture = await camera.current.takePictureAsync();
    setImage(picture.uri);
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

      {image && <Image source={{uri: image}} style={styles.image} />}

      {/*on click navigate back to Detail and show detail with the image..*/}
      <Button title="Neem foto" onPress={takePicture} />
    </View>
  )
}

const styles = StyleSheet.create({
	image: {
    position: 'absolute',
    left: 5,
    top: 5,
    height: 300,
    width: 150
	},
});