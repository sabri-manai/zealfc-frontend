import React, { useState, useRef, useEffect, useCallback } from "react";
import { Carousel } from "../Carousel/Carousel";
import "./GameFilter.css";
import Button from "../Button/Button";
import { GameCard } from "../GameCard/GameCard";
// Import the images
import TuriaImage from "../../assets/images/turia.png";
import CarmenImage from "../../assets/images/carmen.png";
import BeteroImage from "../../assets/images/betero.png";

export const GameFilter = () => {
    const carouselRef = useRef(null);
    const scrollIntervalRef = useRef(null);

    const startAutoScroll = useCallback(() => {
        stopAutoScroll();
        scrollIntervalRef.current = setInterval(() => {
            scrollRight();
        }, 1000); // Scroll every 3 seconds
    }, []);

    const stopAutoScroll = () => {
        if (scrollIntervalRef.current) {
            clearInterval(scrollIntervalRef.current);
        }
    };

    useEffect(() => {
        const carousel = carouselRef.current;
        if (carousel) {
            carousel.scrollLeft = 0;
            startAutoScroll();
        }
        return () => {
            stopAutoScroll();
        };
    }, [startAutoScroll]);

    const scrollRight = () => {
        const carousel = carouselRef.current;
        if (carousel) {
            const cardWidth = carousel.offsetWidth / 5;
            const maxScrollLeft = carousel.scrollWidth - carousel.offsetWidth;

            if (carousel.scrollLeft + carousel.offsetWidth < carousel.scrollWidth - cardWidth) {
                carousel.scrollBy({ left: cardWidth, behavior: "smooth" });
            } else {
                carousel.scrollTo({ left: maxScrollLeft, behavior: "smooth" });
                setTimeout(() => {
                    carousel.scrollTo({ left: 0, behavior: "smooth" });
                }, 1500);
            }
        }
    };

    const scrollLeft = () => {
        const carousel = carouselRef.current;
        if (carousel) {
            const cardWidth = carousel.offsetWidth / 5;
            carousel.scrollBy({ left: -cardWidth, behavior: "smooth" });
        }
    };

    const [activeFilters, setActiveFilters] = useState({
        level: null,
        date: null,
        gameName: null,
    });

    const [filterType, setFilterType] = useState("level");

    const handleFilterClick = (category, selectedFilter) => {
        setActiveFilters((prevFilters) => ({
            ...prevFilters,
            [category]: prevFilters[category] === selectedFilter ? null : selectedFilter,
        }));
    };

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
        // More games...
    ];

    const filteredGames = games.filter((game) => {
        const levelMatches = !activeFilters.level || game.level === activeFilters.level;
        const dateMatches = !activeFilters.date || game.gameDay.includes(activeFilters.date);
        const placeMatches = !activeFilters.gameName || game.gameName === activeFilters.gameName;

        return levelMatches && dateMatches && placeMatches;
    });

    return (
        <div className="game-filter-container">
            <div className="filter-titles">
                <span onClick={() => setFilterType("date")}>DATE</span>
                <span onClick={() => setFilterType("level")}>LEVEL</span>
                <span onClick={() => setFilterType("place")}>PLACE</span>
            </div>

            <div className="filter-options-container" onMouseEnter={stopAutoScroll} onMouseLeave={startAutoScroll}>

                <Carousel ref={carouselRef}>
                    {filterType === "level" && (
                        <>
                            <div className="filter-option">
                                <Button
                                    text="BEGINNER"
                                    onClick={() => handleFilterClick("level", "BEGINNER")}
                                    styleType={activeFilters.level === "BEGINNER" ? "active" : "inactive"}
                                />
                            </div>
                            <div className="filter-option">
                                <Button
                                    text="RISING"
                                    onClick={() => handleFilterClick("level", "RISING")}
                                    styleType={activeFilters.level === "RISING" ? "active" : "inactive"}
                                />
                            </div>
                            <div className="filter-option">
                                <Button
                                    text="CHAMPION"
                                    onClick={() => handleFilterClick("level", "CHAMPION")}
                                    styleType={activeFilters.level === "CHAMPION" ? "active" : "inactive"}
                                />
                            </div>
                        </>
                    )}
                    {filterType === "date" && (
                        <>
                            <div className="filter-option">
                                <Button
                                    text="Monday"
                                    onClick={() => handleFilterClick("date", "Monday")}
                                    styleType={activeFilters.date === "Monday" ? "active" : "inactive"}
                                />
                            </div>
                            <div className="filter-option">
                                <Button
                                    text="Tuesday"
                                    onClick={() => handleFilterClick("date", "Tuesday")}
                                    styleType={activeFilters.date === "Tuesday" ? "active" : "inactive"}
                                />
                            </div>
                            <div className="filter-option">
                                <Button
                                    text="Monday"
                                    onClick={() => handleFilterClick("date", "Monday")}
                                    styleType={activeFilters.date === "Monday" ? "active" : "inactive"}
                                />
                            </div>
                            <div className="filter-option">
                                <Button
                                    text="Tuesday"
                                    onClick={() => handleFilterClick("date", "Tuesday")}
                                    styleType={activeFilters.date === "Tuesday" ? "active" : "inactive"}
                                />
                            </div>
                            <div className="filter-option">
                                <Button
                                    text="Monday"
                                    onClick={() => handleFilterClick("date", "Monday")}
                                    styleType={activeFilters.date === "Monday" ? "active" : "inactive"}
                                />
                            </div>
                            <div className="filter-option">
                                <Button
                                    text="Tuesday"
                                    onClick={() => handleFilterClick("date", "Tuesday")}
                                    styleType={activeFilters.date === "Tuesday" ? "active" : "inactive"}
                                />
                            </div>
                            <div className="filter-option">
                                <Button
                                    text="Monday"
                                    onClick={() => handleFilterClick("date", "Monday")}
                                    styleType={activeFilters.date === "Monday" ? "active" : "inactive"}
                                />
                            </div>
                            <div className="filter-option">
                                <Button
                                    text="Tuesday"
                                    onClick={() => handleFilterClick("date", "Tuesday")}
                                    styleType={activeFilters.date === "Tuesday" ? "active" : "inactive"}
                                />
                            </div>
                        </>
                    )}
                    {filterType === "place" && (
                        <>
                            <div className="filter-option">
                                <Button
                                    text="BETERO"
                                    onClick={() => handleFilterClick("gameName", "BETERO")}
                                    styleType={activeFilters.gameName === "BETERO" ? "active" : "inactive"}
                                />
                            </div>
                            <div className="filter-option">
                                <Button
                                    text="TURIA"
                                    onClick={() => handleFilterClick("gameName", "TURIA")}
                                    styleType={activeFilters.gameName === "TURIA" ? "active" : "inactive"}
                                />
                            </div>
                            <div className="filter-option">
                                <Button
                                    text="CARMEN"
                                    onClick={() => handleFilterClick("gameName", "CARMEN")}
                                    styleType={activeFilters.gameName === "CARMEN" ? "active" : "inactive"}
                                />
                            </div>
                        </>
                    )}
                </Carousel>
                <div className="carousel-header">
                    <button className="carousel-nav left" onClick={scrollLeft}>{"<"}</button>
                    <h4 className="carousel-title">UPCOMING GAMES</h4>
                    <button className="carousel-nav right" onClick={scrollRight}>{">"}</button>
                </div>
            </div>

            <div className="filtered-games">
                {filteredGames.length > 0 ? (
                    filteredGames.map((game, index) => (
                        <GameCard key={index} imageSrc={game.imageSrc} gameName={game.gameName} gameSubtitle={game.gameSubtitle} gameDay={game.gameDay} />
                    ))
                ) : (
                    <p>No games available for the selected filters.</p>
                )}
            </div>
        </div>
    );
};

export default GameFilter;
