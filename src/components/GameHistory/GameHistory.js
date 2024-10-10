import React, { useState, useRef } from "react";
import { Carousel } from '../Carousel/Carousel';
import { GameCard } from '../GameCard/GameCard';
import "./GameHistory.css"; // Add any styles you need for the GameHistory
import Button from '../Button/Button'; // Assuming you have a Button component

const GameHistory = ({ games }) => {
  const [gameFilter, setGameFilter] = useState("played"); // Default filter to 'played'
  const carouselRef = useRef(null);

  const handleFilterClick = (filter) => {
    setGameFilter(filter);
  };

  // Function to filter games based on the selected filter
  const filteredGames = games.filter((game) => {
    if (gameFilter === "played") return true;
    if (gameFilter === "won") return game.result === "won";
    if (gameFilter === "lost") return game.result === "lost";
    return false; // Default case
  });

  // Render the game history cards inside the carousel
  return (
    <div className="game-history-container">
      {/* Game Filters */}
      <div className="game-filters">
        <Button
          text="LOST"
          onClick={() => handleFilterClick('lost')}
          styleType={gameFilter === 'lost' ? 'active' : 'inactive'}
        />
        <Button
          text="PLAYED"
          onClick={() => handleFilterClick('played')}
          styleType={gameFilter === 'played' ? 'active' : 'inactive'}
        />
        <Button
          text="WON"
          onClick={() => handleFilterClick('won')}
          styleType={gameFilter === 'won' ? 'active' : 'inactive'}
        />
      </div>

      {/* Carousel for game cards */}
      <Carousel ref={carouselRef}>
        {filteredGames.map((game) => (
          <GameCard
            key={game.id}
            imageSrc={game.imageSrc}
            gameName={game.name}
            gameSubtitle={game.gameSubtitle}
            gameDay={game.gameDay}
            gameId={game.gameId}
            className={game.className}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default GameHistory;
