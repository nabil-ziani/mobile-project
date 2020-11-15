import React from 'react';
import { Marker } from 'react-native-maps';

export default MarkerList = ({ data }) => {
	return (
		data.map((marker, index) => (
			<Marker
				key={index}
				coordinate={{ latitude: marker.geometry.coordinates[1], longitude: marker.geometry.coordinates[0] }}
				title={marker.properties.naam}
			/>
		))
	)
}