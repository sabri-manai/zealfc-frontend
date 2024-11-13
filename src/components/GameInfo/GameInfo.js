import React from 'react';
import './GameInfo.css';
import CarmenImage from "../../assets/images/carmen.png";
import Button from '../../components/Button/Button';

const GameInfo = ({ 
  time, date, gameName, 
  tournament, placesLeft, 
  onSignUp, isSignedUp, 
  onWaitlistToggle, isWaitlisted, 
  isGameFull 
}) => {
  return (
    <div className="game-info-container">
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
          <Button 
            text={isSignedUp ? "CANCEL" : isGameFull ? "FULL" : "JOIN"} 
            onClick={isGameFull && !isSignedUp ? null : onSignUp} 
            styleType={isSignedUp ? "cancel" : "default"} 
            className={`sign-up-button ${isGameFull && !isSignedUp ? "disabled" : ""}`}
            disabled={isGameFull && !isSignedUp}  // Only disable if the game is full and user is not signed up
          />

          {isGameFull && !isSignedUp && (
            <Button
              text={isWaitlisted ? "LEAVE WAITLIST" : "JOIN WAITLIST"}
              onClick={onWaitlistToggle}
              styleType={isWaitlisted ? "cancel" : "default"} 
              className="waitlist-button"
              disabled={isSignedUp && !isWaitlisted}  // Disable if already signed up and not waitlisted
            />
          )}
        </div>
      </div>

      <div className="game-image-container">
        <img src={CarmenImage} alt="Game" className="game-image" />
        <div className="noiseeffect"></div>
      </div>
    </div>
  );
};

export default GameInfo;
