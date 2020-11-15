import React from 'react'
import { View, Text } from 'react-native';
import MapView from "react-native-maps";
import MarkerList from './MarkerList';

const ANTWERPEN_COORDS = {
  latitude: 51.216667,
  longitude: 4.416078,
  delta: 0.1
}

export default MapScreen = (props) => {
  //console.log("test from MapScreen");
  //console.log(props.data.length);
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: ANTWERPEN_COORDS.latitude,
          longitude: ANTWERPEN_COORDS.longitude,
          latitudeDelta: ANTWERPEN_COORDS.delta,
          longitudeDelta: ANTWERPEN_COORDS.delta
        }}>

        {/* Data undefined voordat de json fetch wordt binnen gehaald */}
        {props.data.length > 0 && <MarkerList data={props.data} />}
      </MapView>
    </View>
  );
}