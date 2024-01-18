// SearchPanel.js
import React from 'react';

const SearchPanel = ({ onClose }) => {
  return (
    <div className="search-panel">
      {/* Contenido del panel de búsqueda */}
      <h1>Search Panel</h1>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default SearchPanel;
