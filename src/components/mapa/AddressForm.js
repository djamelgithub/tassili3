// AddressForm.js
import React, { useState } from 'react';
import axios from 'axios';
import InputButton from './InputButton';
import Map from './Map';

const AddressForm = () => {
  const [address, setAddress] = useState('');
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);
  const apiKey = 'AIzaSyAZ55qFg-6uhddlCaJfv0Ar8Scmpxspcpk'; // Reemplaza con tu API Key de Google Maps

  const handleAddAddress = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${apiKey}`
      );
      

      if (response.data.results && response.data.results.length > 0) {
        const newLocation = response.data.results[0].geometry.location;
        setLocations([...locations, newLocation]);
        setAddress('');
        setError(null); // Limpiar el mensaje de error en caso de éxito
      } else {
        setError('No se encontraron resultados de geocodificación');
      }
    } catch (error) {
      setError('Error al obtener coordenadas. Por favor, verifica la dirección e intenta nuevamente.');
    }
  };

  return (
    <div>
      <InputButton address={address} setAddress={setAddress} onAddAddress={handleAddAddress} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Map locations={locations} />
    </div>
  );
};

export default AddressForm;
