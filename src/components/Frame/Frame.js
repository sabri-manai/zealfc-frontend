// src/components/Frame/Frame.js
import React, { useRef, useEffect, useCallback, useState } from "react";
import axios from "axios";
import { Carousel } from "../Carousel/Carousel";
import { GameCard } from "../GameCard/GameCard";
import "./Frame.css";

import TuriaImage from "../../assets/images/turia.png";
import CarmenImage from "../../assets/images/carmen.png";

export const Frame = () => {
  const [games, setGames] = useState([]);
  const carouselRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  // Fetch games from the backend
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/games`);
        setGames(response.data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, []);

  // Handle signup when user clicks the "Signup" button
  const handleSignup = async (gameId) => {
    const idToken = localStorage.getItem("idToken");

    if (!idToken) {
      alert("Please log in to sign up for this game.");
      return;
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/games/signup/${gameId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      alert("Signed up successfully for the game!");
    } catch (error) {
      console.error("Error signing up for the game:", error);
      alert("Error signing up for the game.");
    }
  };

  // Auto-scroll logic
  const startAutoScroll = useCallback(() => {
    stopAutoScroll(); // Clear any existing intervals
    scrollIntervalRef.current = setInterval(() => {
      scrollRight();
    }, 3000); // Scroll every 3 seconds
  }, []);

  const stopAutoScroll = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current); // Stop auto-scroll
    }
  };

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
        }, 3000); // Adjust delay as needed
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
      className="frame"
      onMouseEnter={stopAutoScroll}
      onMouseLeave={startAutoScroll}
    >
      <div className="carousel-header">
        <button className="carousel-nav left" onClick={scrollLeft}>
          {"<"}
        </button>
        <h2 className="carousel-title">UPCOMING GAMES</h2>
        <button className="carousel-nav right" onClick={scrollRight}>
          {">"}
        </button>
      </div>
      {games.length > 0 ? (
        <Carousel
          ref={carouselRef}
          className={games.length <= 5 ? "centered" : ""}
        >
          {games.map((game, index) => (
            <GameCard
              key={game._id}
              imageSrc={index % 2 === 0 ? TuriaImage : CarmenImage}
              gameName={game.stadium}
              gameSubtitle={game.type}
              gameDay={new Date(game.date).toLocaleString()}
              onSignup={() => handleSignup(game._id)}
              gameId={game._id}
              className="game-card-container" // Pass className
            />
          ))}
        </Carousel>
      ) : (
        <p className="no-games-message">No upcoming games available.</p>
      )}
    </div>
  );
};

export default Frame;
