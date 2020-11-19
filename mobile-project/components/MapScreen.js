import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import MapView from "react-native-maps";
import MarkerList from './MarkerList';
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";

const COORDS_START = {
  latitude: 51.216667,
  longitude: 4.416078,
  delta: 0.1
}

export default MapScreen = ({ navigation, data }) => {
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [detailInfo, setDetailInfo] = useState({ title: "", address: "", properties: {} });
  const [coordinates, setCoordinates] = useState(COORDS_START);
  const [loading, setLoading] = useState(true);
  const [userlocation, setUserlocation] = useState(false);

  const getGeoLocation = async () => {
    try {
      const { status } = await Location.requestPermissionsAsync();

      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        setCoordinates({ latitude: location.coords.latitude, longitude: location.coords.longitude, delta: 0.1 });
        setUserlocation(true);
      }
    } catch (ex) {
      console.error(ex);
    }

    setLoading(false);
  }

  const changeCoords = (coord) => {
    setCoordinates({ latitude: coord.latitude, longitude: coord.longitude, delta: 0.1 })
  }

  useEffect(() => {
    getGeoLocation();
  }, []);

  // Toont een standaard map zonder punten, na locatie ophalen zal standaard antwerpen coordinaten gebruiken of de gebruiker's coordinaten met bijbehorende markers van de api

  return (
    loading
      ? <View style={styles.container}>
        <MapView
          style={styles.container}
          initialRegion={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            latitudeDelta: coordinates.delta,
            longitudeDelta: coordinates.delta
          }}
        />
        <View style={styles.loading}>
          <ActivityIndicator color="000" size="large" />
        </View>
      </View>
      :
      <View style={styles.container}>
        <MapView
          style={styles.container}
          region={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            latitudeDelta: coordinates.delta,
            longitudeDelta: coordinates.delta
          }}
          showsUserLocation={userlocation}
          onMarkerPress={(event) => changeCoords(event.nativeEvent.coordinate)}
        >

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
  loading: {
    backgroundColor: "white",
    opacity: 0.8,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center"
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