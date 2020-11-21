import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, Button, ActivityIndicator, Alert } from 'react-native';
import MapView from "react-native-maps";
import MarkerList from './MarkerList';
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-community/async-storage";

const COORDS_START = {
  latitude: 51.216667,
  longitude: 4.416078,
  delta: 0.1
}

export default MapScreen = ({ navigation, data }) => {
  const mapRef = useRef();
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [detailInfo, setDetailInfo] = useState({ title: "", address: "", properties: {} });
  const [loading, setLoading] = useState(true);
  const [userlocation, setUserlocation] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const getGeoLocation = async () => {
    let userRegion;

    const { status } = await Location.requestPermissionsAsync();

    if (status === "granted") {
      try {
        const location = await Location.getCurrentPositionAsync({});

        userRegion = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1
        };
      } catch (ex) {
        Alert.alert("Location error", "Location request failed due to unsatisfied device settings.")
      }

      setUserlocation(true);
    }

    setLoading(false);

    if (userRegion !== null) {
      mapRef.current.animateToRegion(userRegion);
    }
  }

  const getFavorites = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();

      if (keys.length > 0) {
        setFavorites(keys);
      } else {
        setFavorites([]);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getGeoLocation();
    navigation.addListener('focus', () => {
      getFavorites();
    });
  }, []);

  // Toont een standaard map zonder punten, na locatie ophalen zal standaard antwerpen coordinaten gebruiken of de gebruiker's coordinaten met bijbehorende markers van de api

  return (
    loading
      ? <View style={styles.container}>
        <MapView
          style={styles.container}
          initialRegion={{
            latitude: COORDS_START.latitude,
            longitude: COORDS_START.longitude,
            latitudeDelta: COORDS_START.delta,
            longitudeDelta: COORDS_START.delta
          }}
        />
        <View style={styles.loading}>
          <ActivityIndicator color="000" size="large" />
        </View>
      </View>
      :
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.container}
          initialRegion={{
            latitude: COORDS_START.latitude,
            longitude: COORDS_START.longitude,
            latitudeDelta: COORDS_START.delta,
            longitudeDelta: COORDS_START.delta
          }}
          showsUserLocation={userlocation}
        >

          {/* Data undefined voordat de json fetch wordt binnen gehaald */}
          {data.length > 0 && <MarkerList data={data} setShowDetailPopup={setShowDetailPopup} setDetailInfo={setDetailInfo} favorites={favorites} />}

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