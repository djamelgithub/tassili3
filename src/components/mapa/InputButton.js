// InputButton.js
import React from 'react';

const InputButton = ({ address, setAddress, onAddAddress }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onAddAddress(); // Corregido de handleAddAddress a onAddAddress
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Ingrese una dirección"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button type="submit">Agregar Dirección</button>
      </form>
    </div>
  );
};

export default InputButton;
