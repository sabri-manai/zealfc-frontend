// UpcomingGames.js

import React, { useState } from 'react';
import './UpcomingGames.css';
import {GameCard} from '../GameCard/GameCard';
import {Carousel} from '../Carousel/Carousel';
import CarmenImage from "../../assets/images/carmen.png";

const UpcomingGames = ({ registeredGames, waitlistGames }) => {
  const [activeTab, setActiveTab] = useState('registered');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Function to transform game data
  const transformGame = (game) => ({
    gameId: game.gameId?._id || game._id || 'Unknown ID',
    gameName: game.stadium || 'Unknown Game',
    gameSubtitle: game.gameId?.type || 'Unknown Type',
    gameDay: game.date || 'Date not available',
    imageSrc: game.imageSrc || CarmenImage,
  });

  // Transform games
  const transformedRegisteredGames = registeredGames.map(transformGame);
  const transformedWaitlistGames = waitlistGames.map(transformGame);

  // Select games to display based on active tab
  const displayedGames =
    activeTab === 'registered' ? transformedRegisteredGames : transformedWaitlistGames;

  return (
    <div className="upcoming-games-container">
      {/* Tab Menu */}
      <div className="upcoming-tab-menu">
        <span
          className={activeTab === 'registered' ? 'active' : ''}
          onClick={() => handleTabClick('registered')}
        >
          REGISTERED
        </span>
        <span
          className={activeTab === 'waitlist' ? 'active' : ''}
          onClick={() => handleTabClick('waitlist')}
        >
          WAITLIST
        </span>
      </div>


      {/* Carousel for game cards */}
      <Carousel className={displayedGames.length <= 5 ? 'centered' : ''}>
        {displayedGames.map((game) => (
          <GameCard
            key={game.gameId}
            imageSrc={game.imageSrc}
            gameName={game.gameName}
            gameSubtitle={game.gameSubtitle}
            gameDay={game.gameDay}
            gameId={game.gameId}
            className="game-card-container"
          />
        ))}
      </Carousel>
    </div>
  );
};

export default UpcomingGames;
