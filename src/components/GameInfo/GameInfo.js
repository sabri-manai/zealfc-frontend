import React from 'react';
import './GameInfo.css';
import CarmenImage from "../../assets/images/carmen.png"; // Ensure this path is correct
import Button from '../../components/Button/Button'; // Import your Button component

const GameInfo = ({ time, date, gameName, tournament, placesLeft, onSignUp }) => {
  return (
    <div className="game-info-container">
      {/* Left side for text */}
      <div className="game-info">
        <div className="game-info-sub1">
            <div className="game-time">{time}</div>
            <div className="game-date">{date}</div>
        </div>
        <div className="game-info-sub2">
        <div className="game-game-name">{gameName}</div>
            <div className="game-tournament">{tournament}</div>
            <div className="game-places-left">
            {placesLeft} places left <br /> Sign up with a teammate!
            </div>
        </div>
        <div className="sign-up-button-container">
          {/* Use the custom Button component instead of a regular button */}
          <Button 
            text="SIGN UP" 
            onClick={onSignUp} 
            styleType="default" // You can customize styleType if needed
          />
        </div>
      </div>

      {/* Right side for image */}
      <div className="game-image-container">
        <img src={CarmenImage} alt="Game" className="game-image" />
        <div className="noiseeffect"></div> {/* Adding the noise effect */}

      </div>
    </div>
  );
};

export default GameInfo;
