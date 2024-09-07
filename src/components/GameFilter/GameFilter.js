import React, { useState } from "react";
import { GameCard } from "../GameCard/GameCard";
import "./GameFilter.css";
import Button from "../Button/Button"; // Import the custom Button component

// Import the images
import TuriaImage from "../../assets/images/turia.png";
import CarmenImage from "../../assets/images/carmen.png";
import BeteroImage from "../../assets/images/betero.png";

export const GameFilter = () => {
    const [activeFilter, setActiveFilter] = useState(null); // Start with no filter selected

    // Handle filter click to toggle the active filter
    const handleFilterClick = (selectedFilter) => {
        if (activeFilter === selectedFilter) {
            // If the filter is already active, deactivate it
            setActiveFilter(null);
        } else {
            // Otherwise, activate the selected filter
            setActiveFilter(selectedFilter);
        }
    };

    // Define the games list
    const games = [
        {
            imageSrc: BeteroImage,
            gameName: "BETERO",
            gameSubtitle: "BEGINNERS",
            gameDay: "Monday, 10:00",
            level: "BEGINNER"
        },
        {
            imageSrc: TuriaImage,
            gameName: "TURIA",
            gameSubtitle: "CHAMPIONS",
            gameDay: "Monday, 17:00",
            level: "CHAMPION"
        },
        {
            imageSrc: CarmenImage,
            gameName: "CARMEN",
            gameSubtitle: "RISING",
            gameDay: "Monday, 20:30",
            level: "RISING"
        },
        {
            imageSrc: BeteroImage,
            gameName: "BETERO",
            gameSubtitle: "BEGINNERS",
            gameDay: "Monday, 21:00",
            level: "BEGINNER"
        },
        {
            imageSrc: BeteroImage,
            gameName: "BETERO",
            gameSubtitle: "BEGINNERS",
            gameDay: "Monday, 10:00",
            level: "BEGINNER"
        },
        {
            imageSrc: TuriaImage,
            gameName: "TURIA",
            gameSubtitle: "CHAMPIONS",
            gameDay: "Monday, 17:00",
            level: "CHAMPION"
        },
        {
            imageSrc: CarmenImage,
            gameName: "CARMEN",
            gameSubtitle: "RISING",
            gameDay: "Monday, 20:30",
            level: "RISING"
        },
        {
            imageSrc: BeteroImage,
            gameName: "BETERO",
            gameSubtitle: "BEGINNERS",
            gameDay: "Monday, 21:00",
            level: "BEGINNER"
        },
        {
            imageSrc: BeteroImage,
            gameName: "BETERO",
            gameSubtitle: "BEGINNERS",
            gameDay: "Monday, 10:00",
            level: "BEGINNER"
        },
        {
            imageSrc: TuriaImage,
            gameName: "TURIA",
            gameSubtitle: "CHAMPIONS",
            gameDay: "Monday, 17:00",
            level: "CHAMPION"
        },
        {
            imageSrc: CarmenImage,
            gameName: "CARMEN",
            gameSubtitle: "RISING",
            gameDay: "Monday, 20:30",
            level: "RISING"
        },
        {
            imageSrc: BeteroImage,
            gameName: "BETERO",
            gameSubtitle: "BEGINNERS",
            gameDay: "Monday, 21:00",
            level: "BEGINNER"
        },
        {
            imageSrc: BeteroImage,
            gameName: "BETERO",
            gameSubtitle: "BEGINNERS",
            gameDay: "Monday, 10:00",
            level: "BEGINNER"
        },
        {
            imageSrc: TuriaImage,
            gameName: "TURIA",
            gameSubtitle: "CHAMPIONS",
            gameDay: "Monday, 17:00",
            level: "CHAMPION"
        },
        {
            imageSrc: CarmenImage,
            gameName: "CARMEN",
            gameSubtitle: "RISING",
            gameDay: "Monday, 20:30",
            level: "RISING"
        },
        {
            imageSrc: BeteroImage,
            gameName: "BETERO",
            gameSubtitle: "BEGINNERS",
            gameDay: "Monday, 21:00",
            level: "BEGINNER"
        },
        {
            imageSrc: BeteroImage,
            gameName: "BETERO",
            gameSubtitle: "BEGINNERS",
            gameDay: "Monday, 10:00",
            level: "BEGINNER"
        },
        {
            imageSrc: TuriaImage,
            gameName: "TURIA",
            gameSubtitle: "CHAMPIONS",
            gameDay: "Monday, 17:00",
            level: "CHAMPION"
        },
        {
            imageSrc: CarmenImage,
            gameName: "CARMEN",
            gameSubtitle: "RISING",
            gameDay: "Monday, 20:30",
            level: "RISING"
        },
        {
            imageSrc: BeteroImage,
            gameName: "BETERO",
            gameSubtitle: "BEGINNERS",
            gameDay: "Monday, 21:00",
            level: "BEGINNER"
        },
        {
            imageSrc: BeteroImage,
            gameName: "BETERO",
            gameSubtitle: "BEGINNERS",
            gameDay: "Monday, 10:00",
            level: "BEGINNER"
        },
        {
            imageSrc: TuriaImage,
            gameName: "TURIA",
            gameSubtitle: "CHAMPIONS",
            gameDay: "Monday, 17:00",
            level: "CHAMPION"
        },
        {
            imageSrc: CarmenImage,
            gameName: "CARMEN",
            gameSubtitle: "RISING",
            gameDay: "Monday, 20:30",
            level: "RISING"
        },
        {
            imageSrc: BeteroImage,
            gameName: "BETERO",
            gameSubtitle: "BEGINNERS",
            gameDay: "Monday, 21:00",
            level: "BEGINNER"
        },
        {
            imageSrc: CarmenImage,
            gameName: "CARMEN",
            gameSubtitle: "RISING",
            gameDay: "Monday, 20:30",
            level: "RISING"
        },
        {
            imageSrc: BeteroImage,
            gameName: "BETERO",
            gameSubtitle: "BEGINNERS",
            gameDay: "Monday, 21:00",
            level: "BEGINNER"
        },
        // Add more games here...
    ];

    // Filter games by the selected level, or show all games if no filter is selected
    const filteredGames = activeFilter ? games.filter((game) => game.level === activeFilter) : games;

    return (
        <div className="game-filter-container">
            {/* Filter Options */}
            <h2 className="filter-title">CHOOSE BY...</h2>
            <div className="filter-options">
                <Button
                    text="BEGINNER"
                    onClick={() => handleFilterClick("BEGINNER")}
                    styleType={activeFilter === "BEGINNER" ? "active" : "inactive"}
                />
                <Button
                    text="RISING"
                    onClick={() => handleFilterClick("RISING")}
                    styleType={activeFilter === "RISING" ? "active" : "inactive"}
                />
                <Button
                    text="CHAMPION"
                    onClick={() => handleFilterClick("CHAMPION")}
                    styleType={activeFilter === "CHAMPION" ? "active" : "inactive"}
                />
            </div>

            {/* Display filtered games */}
            <div className="filtered-games">
                {filteredGames.map((game, index) => (
                    <GameCard
                        key={index}
                        imageSrc={game.imageSrc}
                        gameName={game.gameName}
                        gameSubtitle={game.gameSubtitle}
                        gameDay={game.gameDay}
                    />
                ))}
            </div>
        </div>
    );
};

export default GameFilter;
