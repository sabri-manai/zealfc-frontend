import React from 'react';
import './GameInfo.css';
import CarmenImage from "../../assets/images/carmen.png";
import Button from '../../components/Button/Button3';

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
          {/* If user is signed up */}
          {isSignedUp && (
            <Button 
              primaryText="CANCEL"
              variant="medium" 
              onClick={onSignUp} 
              styleType="cancel" 
              className="sign-up-button"
            />
          )}

          {/* If user is not signed up */}
          {!isSignedUp && (
            <>
              {/* If user is on the waitlist */}
              {isWaitlisted ? (
                <Button
                  primaryText="LEAVE WAITLIST"
                  variant="medium"
                  onClick={onWaitlistToggle}
                  styleType="cancel" 
                  className="waitlist-button"
                />
              ) : (
                <>
                  {/* If game is full */}
                  {isGameFull ? (
                    <Button
                      primaryText="JOIN WAITLIST"
                      variant="medium"
                      onClick={onWaitlistToggle}
                      styleType="default" 
                      className="waitlist-button"
                    />
                  ) : (
                    <Button
                      primaryText="JOIN"
                      variant="medium"
                      onClick={onSignUp}
                      styleType="default"
                      className="sign-up-button"
                    />
                  )}
                </>
              )}
            </>
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
