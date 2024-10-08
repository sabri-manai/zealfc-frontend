import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios"; // Import axios for API calls
import { Carousel } from "../Carousel/Carousel";
import { GameCard } from "../GameCard/GameCard";
import Button from "../Button/Button"; // Assuming you have a Button component
import "./GameFilter.css";
import moment from "moment"; // Using moment.js for date manipulation
import TuriaImage from "../../assets/images/turia.png";
import CarmenImage from "../../assets/images/carmen.png";
import BeteroImage from "../../assets/images/betero.png";

export const GameFilter = () => {
  const carouselRef = useRef(null);
  const scrollIntervalRef = useRef(null); // To store the interval for auto-scroll

  const [activeFilters, setActiveFilters] = useState({
    level: null,
    date: null,
    gameName: null,
  });
  const [filterType, setFilterType] = useState("date");
  const [currentWeek, setCurrentWeek] = useState({
    start: moment().startOf("isoWeek"), // ISO Week starts from Monday
    end: moment().endOf("isoWeek"),
  });

  const [games, setGames] = useState([]); // State to hold the fetched games

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

  // Function to handle week navigation
  const changeWeek = (direction) => {
    setCurrentWeek((prevWeek) => {
      const newStart = moment(prevWeek.start).add(direction, "week");
      const newEnd = moment(prevWeek.end).add(direction, "week");
      return { start: newStart, end: newEnd };
    });
  };

  // Generate the days of the week for the current week
  const weekDays = [];
  let day = currentWeek.start.clone();

  while (day.isSameOrBefore(currentWeek.end)) {
    weekDays.push({
      fullDate: day.format("dddd, DD.MM.YYYY"), // e.g., "Monday, 13.04.2024"
      dayName: day.format("ddd"), // e.g., "Mon"
      dateNumber: day.format("DD.MM"), // e.g., "13.04"
    });
    day.add(1, "day");
  }

  const handleFilterClick = (category, selectedFilter) => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      [category]: prevFilters[category] === selectedFilter ? null : selectedFilter,
    }));
  };

  // Filter the games based on the selected filters
  const filteredGames = games.filter((game) => {
    const levelMatches = !activeFilters.level || game.level === activeFilters.level;
    const dateMatches = !activeFilters.date || moment(game.date).format("dddd, DD.MM.YYYY") === activeFilters.date;
    const placeMatches = !activeFilters.gameName || game.stadium === activeFilters.gameName;

    return levelMatches && dateMatches && placeMatches;
  });

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
      const cardWidth = carousel.offsetWidth / 5;
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
      const cardWidth = carousel.offsetWidth / 5;
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

  // Debugging: Log the number of filtered games
  useEffect(() => {
    console.log(`Number of filtered games: ${filteredGames.length}`);
  }, [filteredGames]);

  return (
    <div className="game-filter-container">
      <div className="filter-titles">
        <span onClick={() => setFilterType("date")}>DATE</span>
        <span onClick={() => setFilterType("level")}>LEVEL</span>
        <span onClick={() => setFilterType("place")}>PLACE</span>
      </div>

      <div className="filter-options-container">
        {filterType === "date" && (
          <>
            {/* Week navigation */}
            <div className="carousel-header">
              <button className="carousel-nav left" onClick={() => changeWeek(-1)}>
                {"<"}
              </button>
              <h4 className="carousel-title">
                {currentWeek.start.format("DD.MM.YYYY")} - {currentWeek.end.format("DD.MM.YYYY")}
              </h4>
              <button className="carousel-nav right" onClick={() => changeWeek(1)}>
                {">"}
              </button>
            </div>

            {/* Display the days of the current week */}
            <Carousel ref={carouselRef}>
              {weekDays.map((dayInfo, index) => (
                <div key={index} className="filter-option">
                  <Button
                    text={`${dayInfo.dayName}\n${dayInfo.dateNumber}`}
                    onClick={() => handleFilterClick("date", dayInfo.fullDate)}
                    styleType={activeFilters.date === dayInfo.fullDate ? "active" : "inactive"}
                    onMouseEnter={stopAutoScroll}
                    onMouseLeave={startAutoScroll}
                  />
                </div>
              ))}
            </Carousel>
          </>
        )}

        {/* Add more filter options for level or place as needed */}
        {filterType === "level" && (
          <div className="filter-options">
            {/* Example Level Filters */}
            <Button
              text="Beginner"
              onClick={() => handleFilterClick("level", "Beginner")}
              styleType={activeFilters.level === "Beginner" ? "active" : "inactive"}
            />
            <Button
              text="Intermediate"
              onClick={() => handleFilterClick("level", "Intermediate")}
              styleType={activeFilters.level === "Intermediate" ? "active" : "inactive"}
            />
            <Button
              text="Advanced"
              onClick={() => handleFilterClick("level", "Advanced")}
              styleType={activeFilters.level === "Advanced" ? "active" : "inactive"}
            />
          </div>
        )}

        {filterType === "place" && (
          <div className="filter-options">
            {/* Example Place Filters */}
            <Button
              text="Stadium A"
              onClick={() => handleFilterClick("gameName", "Stadium A")}
              styleType={activeFilters.gameName === "Stadium A" ? "active" : "inactive"}
            />
            <Button
              text="Stadium B"
              onClick={() => handleFilterClick("gameName", "Stadium B")}
              styleType={activeFilters.gameName === "Stadium B" ? "active" : "inactive"}
            />
            <Button
              text="Stadium C"
              onClick={() => handleFilterClick("gameName", "Stadium C")}
              styleType={activeFilters.gameName === "Stadium C" ? "active" : "inactive"}
            />
          </div>
        )}
      </div>

      {/* Conditionally apply 'centered' class based on the number of filtered games */}
      <div className={`filtered-games ${filteredGames.length <= 5 ? 'centered' : ''}`}>
        {filteredGames.length > 0 ? (
          filteredGames.map((game, index) => (
            <GameCard
              key={game._id} // Ensure game._id is used here
              imageSrc={index % 2 === 0 ? TuriaImage : CarmenImage}
              gameName={game.stadium}
              gameSubtitle={game.type}
              gameDay={new Date(game.date).toLocaleString()}
              gameId={game._id}
            />
          ))
        ) : (
          <p className="no-games-message">No upcoming games available for the selected filters.</p>
        )}
      </div>
    </div>
  );
};

export default GameFilter;
