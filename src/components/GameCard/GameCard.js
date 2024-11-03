import React from "react";
import { useNavigate } from "react-router-dom";
import "./GameCard.css";

export const GameCard = ({ imageSrc, gameName, gameSubtitle, gameDay, gameId, className }) => {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/games/${gameId}`);  // Only navigate if gameId is valid
  };

  // Helper function to format the date
  const formatGameDay = (dateString) => {
    if (!dateString) {
      return "Date not available"; // Handle undefined or null dateString
    }

    const date = new Date(dateString);
    if (isNaN(date)) {
      return "Invalid Date";
    }

    // Format the date and time separately
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    const timeFormatted = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    return `${dayOfWeek}, ${timeFormatted}`;
  };

  return (
    <div className={`game-card-container ${className}`} onClick={handleClick}>
      <div className="game-card">
        <div className="image-wrapper">
          <img 
            src={imageSrc || 'path/to/default-image.png'} 
            alt={`${gameName || 'Unknown Game'} Background`} 
            className="card-image" 
          />
          <div className="overlay-gradient"></div>
          <div className="overlay-content">
            <div className="game-name">{gameName || 'Unknown Game'}</div>
            <div className="game-subtitle">{gameSubtitle || 'Unknown Type'}</div>
          </div>
        </div>
      </div>
      <div className="game-day">{formatGameDay(gameDay)}</div>
    </div>
  );
};
