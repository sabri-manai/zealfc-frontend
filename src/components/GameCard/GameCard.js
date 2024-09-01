import React from "react";
import "./GameCard.css";

export const GameCard = ({ imageSrc, gameName, gameSubtitle, gameDay }) => {
  return (
    <div className="game-card-container">
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
