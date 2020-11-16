import React, { useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native';
import MapView from "react-native-maps";
import MarkerList from './MarkerList';
import { Feather } from "@expo/vector-icons";

const ANTWERPEN_COORDS = {
  latitude: 51.216667,
  longitude: 4.416078,
  delta: 0.1
}

export default MapScreen = ({ navigation, data }) => {
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [detailInfo, setDetailInfo] = useState({ title: "", address: "", properties: {} });

  return (
    <View style={styles.container}>
      <MapView
        style={styles.container}
        initialRegion={{
          latitude: ANTWERPEN_COORDS.latitude,
          longitude: ANTWERPEN_COORDS.longitude,
          latitudeDelta: ANTWERPEN_COORDS.delta,
          longitudeDelta: ANTWERPEN_COORDS.delta
        }}>

        {/* Data undefined voordat de json fetch wordt binnen gehaald */}
        {data.length > 0 && <MarkerList data={data} setShowDetailPopup={setShowDetailPopup} setDetailInfo={setDetailInfo} />}

      </MapView>
      {
        showDetailPopup &&
        <View style={styles.popup}>
          <View style={styles.detailbox}>
            <View style={{ flex: 0.9 }}>
              <Text style={styles.locationName}>{detailInfo.title}</Text>
              <Text style={styles.locationAddress}>{detailInfo.address}</Text>
            </View>
            <Feather style={{ flex: 0.1 }} name="x-square" size={35} color="red" onPress={() => setShowDetailPopup(false)} />
          </View>
          <Button title="Detail" onPress={() => navigation.navigate("Detail", { itemInfo: detailInfo.properties })}></Button>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  popup: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    justifyContent: "center",
    padding: 10
  },
  locationName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  locationAddress: {
    fontSize: 15,
  },
  detailbox: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 10
  }
})