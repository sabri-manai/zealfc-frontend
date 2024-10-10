import React from "react";
import { useNavigate } from "react-router-dom";
import "./GameCard.css";

export const GameCard = ({ imageSrc, gameName, gameSubtitle, gameDay, gameId, className }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/games/${gameId}`); // Navigate to the game details screen with the game ID
  };

  // Helper function to format the date
  const formatGameDay = (dateString) => {
    // Assuming the dateString is in the format "23/09/2024 22:00:00"
    const [day, month, yearAndTime] = dateString.split('/');
    const [year, time] = yearAndTime.split(' ');

    // Reformat into a valid date string for JavaScript: "YYYY-MM-DDTHH:mm:ss"
    const validDateString = `${year}-${month}-${day}T${time}`;

    const date = new Date(validDateString);
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
          <img src={imageSrc} alt={`${gameName} Background`} className="card-image" />
          <div className="overlay-gradient"></div>
          <div className="overlay-content">
            <div className="game-name">{gameName}</div>
            <div className="game-subtitle">{gameSubtitle}</div>
          </div>
        </div>
      </div>
      <div className="game-day">{formatGameDay(gameDay)}</div>
    </div>
  );
};
