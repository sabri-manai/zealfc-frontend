// src/components/GameCard/GameCard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./GameCard.css";

export const GameCard = ({ imageSrc, gameName, gameSubtitle, gameDay, gameId, className  }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/games/${gameId}`); // Navigate to the game details screen with the game ID
  };

  return (
    <div className={`game-card-container ${className}`} onClick={handleClick}>
      <div className="game-card">
        <div className="image-wrapper">
          <img src={imageSrc} alt={`${gameName} Background`} className="card-image" />
          <div className="overlay-gradient"></div>
          <div className="overlay-content">
            <div className="game-name">{gameName}</div>
            <div className="game-subtitle">{gameSubtitle}</div>
          </div>
        </div>
      </div>
      <div className="game-day">{gameDay}</div>
    </div>
  );
};
