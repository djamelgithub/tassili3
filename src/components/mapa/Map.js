// Map.js
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = ({ locations }) => {
  const mapStyles = {
    height: '400px',
    width: '100%',
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyAZ55qFg-6uhddlCaJfv0Ar8Scmpxspcpk">
      <GoogleMap mapContainerStyle={mapStyles} zoom={8} center={{ lat: -34.397, lng: 150.644 }}>
        {locations.map((location, index) => (
          <Marker key={index} position={location} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
