import React from 'react';
import './Map.css'; 
import MapImage from "../../assets/images/map.png"; // Ensure the image path is correct

const Map = () => {
  return (
    <div className="map-container">
      <div className="map-image">
        <img src={MapImage} alt="Map Location" />
      </div>
      <div className="map-info">
        <h3>Campo del Carmen</h3>
        <p>Carrer de Obladioblada 13</p>
        <p>21-042, Valencia</p>
        <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
          See in maps...
        </a>
      </div>
    </div>
  );
};

export default Map;
