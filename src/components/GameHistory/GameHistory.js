import React, { useState, useRef, useEffect } from "react";
import { Carousel } from '../Carousel/Carousel';
import { GameCard } from '../GameCard/GameCard';
import "./GameHistory.css";
import Button from '../Button/Button';
import CarmenImage from "../../assets/images/carmen.png";

const GameHistory = ({ games }) => {
    console.log("Games data in GameHistory:", games); // Log games to ensure data is passed

    const [gameFilter, setGameFilter] = useState("played");
    const carouselRef = useRef(null);
    const scrollIntervalRef = useRef(null);

    const handleFilterClick = (filter) => {
        // Toggle the filter off if it's already selected, or set the new filter
        setGameFilter(prevFilter => prevFilter === filter ? "played" : filter);
    };

    // Transform the games data to ensure proper mapping to GameCard
    const transformedGames = games.map((game) => ({
        gameId: game.gameId?._id || game._id || 'Unknown ID',
        gameName: game.stadium || 'Unknown Game',
        gameSubtitle: game.gameId?.type || 'Unknown Type',
        gameDay: game.date || 'Date not available',
        imageSrc: game.imageSrc || CarmenImage  // Placeholder image if not available
    }));

    // Filter the games based on the selected filter
    const filteredGames = transformedGames.filter((game) => {
        if (gameFilter === "played") return true; // Show all games when 'played' is selected or no filter is applied
        if (gameFilter === "won") return game.result === "won";
        if (gameFilter === "lost") return game.result === "lost";
        return false;
    });

    const scrollRight = () => {
        const carousel = carouselRef.current;
        if (carousel) {
            const cardWidth = carousel.offsetWidth / 6;
            const maxScrollLeft = carousel.scrollWidth - carousel.offsetWidth;

            if (carousel.scrollLeft + carousel.offsetWidth < carousel.scrollWidth - cardWidth) {
                carousel.scrollBy({ left: cardWidth, behavior: "smooth" });
            } else {
                carousel.scrollTo({ left: maxScrollLeft, behavior: "smooth" });
                setTimeout(() => {
                    carousel.scrollTo({ left: 0, behavior: "smooth" });
                }, 3000);
            }
        }
    };

    const scrollLeft = () => {
        const carousel = carouselRef.current;
        if (carousel) {
            const cardWidth = carousel.offsetWidth / 6;
            carousel.scrollBy({ left: -cardWidth, behavior: "smooth" });
        }
    };

    const startAutoScroll = () => {
        stopAutoScroll();
        scrollIntervalRef.current = setInterval(() => {
            scrollRight();
        }, 3000);
    };

    const stopAutoScroll = () => {
        if (scrollIntervalRef.current) {
            clearInterval(scrollIntervalRef.current);
        }
    };

    useEffect(() => {
        const carousel = carouselRef.current;
        if (carousel) {
            carousel.scrollLeft = 0; // Ensure the first card is visible
            startAutoScroll();
        }

        return () => {
            stopAutoScroll();
        };
    }, [startAutoScroll]);

    return (
        <div
            className="game-history-container"
            onMouseEnter={stopAutoScroll}
            onMouseLeave={startAutoScroll}
        >
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

            {/* Carousel Header */}
            <div className="carousel-header">
                <button className="carousel-nav left" onClick={scrollLeft}>
                    {"<"}
                </button>
                <h2 className="carousel-title">GAME HISTORY</h2>
                <button className="carousel-nav right" onClick={scrollRight}>
                    {">"}
                </button>
            </div>

            {/* Carousel for game cards */}
            <Carousel
                ref={carouselRef}
                className={filteredGames.length <= 5 ? "centered" : ""}
            >
                {filteredGames.map((game) => (
                    <GameCard
                        key={game.gameId}  // Ensure gameId is used as key
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

export default GameHistory;
