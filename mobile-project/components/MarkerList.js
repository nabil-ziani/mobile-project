import React from 'react';
import { Marker } from 'react-native-maps';

export default MarkerList = ({ data, setShowDetailPopup, setDetailInfo }) => {
	return (
		data.map((marker, index) => (
			<Marker
				key={index}
				coordinate={{ latitude: marker.geometry.coordinates[1], longitude: marker.geometry.coordinates[0] }}
				onPress={() => {
					setShowDetailPopup(true);
					setDetailInfo({
						title: marker.properties.naam,
						address: `${marker.properties.postcode} ${marker.properties.district}, ${marker.properties.straat} ${marker.properties.huisnummer} `,
						properties: marker.properties
					})
				}}
				image={require("../assets/marker-icon.png")}
				style={{ width: 25, height: 25 }}
			/>
		))
	)
}