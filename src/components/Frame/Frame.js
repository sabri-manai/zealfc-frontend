import React, { useRef, useEffect, useCallback, useState } from "react";
import axios from "axios"; // Import axios for API calls
import { Carousel } from "../Carousel/Carousel";
import { GameCard } from "../GameCard/GameCard";
import "./Frame.css";

// Placeholder images
import TuriaImage from "../../assets/images/turia.png";
import CarmenImage from "../../assets/images/carmen.png";
import BeteroImage from "../../assets/images/betero.png";

export const Frame = () => {
    const [games, setGames] = useState([]); // State to hold the fetched games
    const carouselRef = useRef(null);
    const scrollIntervalRef = useRef(null);

    // Fetch games from the backend
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/games`); // Adjust API endpoint
                setGames(response.data); // Assuming the response is an array of games
            } catch (error) {
                console.error("Error fetching games:", error);
            }
        };

        fetchGames();
    }, []);

    const startAutoScroll = useCallback(() => {
        stopAutoScroll(); // Stop any existing interval
        scrollIntervalRef.current = setInterval(() => {
            scrollRight();
        }, 3000); // Scroll every 3 seconds
    }, []);

    const stopAutoScroll = () => {
        if (scrollIntervalRef.current) {
            clearInterval(scrollIntervalRef.current);
        }
    };

    useEffect(() => {
        const carousel = carouselRef.current;
        if (carousel) {
            // Ensure the first card is fully visible by scrolling to the start
            carousel.scrollLeft = 0;

            // Start automatic scrolling
            startAutoScroll();
        }

        // Cleanup on component unmount
        return () => {
            stopAutoScroll();
        };
    }, [startAutoScroll]);

    const scrollRight = () => {
        const carousel = carouselRef.current;
        if (carousel) {
            const cardWidth = carousel.offsetWidth / 5;
            const maxScrollLeft = carousel.scrollWidth - carousel.offsetWidth;

            // Scroll right
            if (carousel.scrollLeft + carousel.offsetWidth < carousel.scrollWidth - cardWidth) {
                carousel.scrollBy({ left: cardWidth, behavior: "smooth" });
            } else {
                // Scroll to show the last card fully
                carousel.scrollTo({ left: maxScrollLeft, behavior: "smooth" });

                // Pause before resetting to the start
                setTimeout(() => {
                    carousel.scrollTo({ left: 0, behavior: "smooth" });
                }, 1500); // Adjust delay as needed to fully display the last card
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

    return (
        <div
            className="frame"
            onMouseEnter={stopAutoScroll} // Stop auto-scroll on hover
            onMouseLeave={startAutoScroll} // Resume auto-scroll when not hovering
        >
            <div className="carousel-header">
                <button className="carousel-nav left" onClick={scrollLeft}>{"<"}</button>
                <h2 className="carousel-title">UPCOMING GAMES</h2>
                <button className="carousel-nav right" onClick={scrollRight}>{">"}</button>
            </div>
            <Carousel ref={carouselRef}>
                {games.length > 0 ? (
                    games.map((game, index) => (
                        <GameCard
                            key={game._id} // Assuming each game has a unique _id
                            imageSrc={index % 2 === 0 ? TuriaImage : CarmenImage} // Placeholder: Alternate images
                            gameName={game.stadium} // Display the stadium or game name
                            gameSubtitle={game.type} // Display the game type
                            gameDay={new Date(game.date).toLocaleString()} // Format the game date
                        />
                    ))
                ) : (
                    <p>No upcoming games available.</p>
                )}
            </Carousel>
        </div>
    );
};
