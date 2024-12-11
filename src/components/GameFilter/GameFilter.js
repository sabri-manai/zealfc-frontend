// src/components/GameFilter/GameFilter.js
import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import { Carousel } from "../Carousel/Carousel";
import { GameCard } from "../GameCard/GameCard";
import Button from "../Button/Button3";
import "./GameFilter.css";
import moment from "moment";
import TuriaImage from "../../assets/images/turia.png";
import CarmenImage from "../../assets/images/carmen.png";
import BeteroImage from "../../assets/images/betero.png";

export const GameFilter = () => {
  const carouselRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  const [activeFilters, setActiveFilters] = useState({
    level: null,
    date: null,
    gameName: null,
  });
  const [filterType, setFilterType] = useState("date");
  const [currentWeek, setCurrentWeek] = useState({
    start: moment().startOf("isoWeek"),
    end: moment().endOf("isoWeek"),
  });

  const [games, setGames] = useState([]);

  const levelOptions = ["Beginner", "Rising", "Champion"];
  const placeOptions = ["Stadium A", "Stadium B", "Stadium C"];

  // Fetch games from the backend
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/games`);
        const upcomingGames = response.data.filter((game) => game.status !== "finished");
        setGames(upcomingGames);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    fetchGames();
  }, []);

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
      fullDate: day.format("dddd, DD.MM.YYYY"),
      dayName: day.format("ddd"),
      dateNumber: day.format("DD.MM"),
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
    const dateMatches =
      !activeFilters.date ||
      moment(game.date).format("dddd, DD.MM.YYYY") === activeFilters.date;
    const placeMatches = !activeFilters.gameName || game.stadium.name === activeFilters.gameName;

    return levelMatches && dateMatches && placeMatches;
  });

  // Auto-scroll logic
  const startAutoScroll = useCallback(() => {
    stopAutoScroll();
    scrollIntervalRef.current = setInterval(() => {
      scrollRight();
    }, 3000);
  }, []);

  const stopAutoScroll = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
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
        }, 3000);
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
      carousel.scrollLeft = 0;
      startAutoScroll();
    }

    return () => {
      stopAutoScroll();
    };
  }, [startAutoScroll]);

  const renderFilterOptions = () => {
    switch (filterType) {
      case "date":
        return (
          <>
            <Carousel ref={carouselRef}>
              {weekDays.map((dayInfo, index) => (
                <div key={index} className="filter-option">
                    <Button
                      variant="large"
                      primaryText={dayInfo.dayName}
                      secondaryText={dayInfo.dateNumber}
                      onClick={() => handleFilterClick("date", dayInfo.fullDate)}
                      styleType={activeFilters.date === dayInfo.fullDate ? "active" : "default"}
                      onMouseEnter={stopAutoScroll}
                      onMouseLeave={startAutoScroll}
                    />
                </div>
              ))}
            </Carousel>
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
          </>
        );
      case "level":
        return (
          <Carousel ref={carouselRef} centerItems>
            {levelOptions.map((level, index) => (
              <div key={index} className="filter-option">
                <Button
                  variant="large"
                  primaryText={level}
                  onClick={() => handleFilterClick("level", level)}
                  styleType={activeFilters.level === level ? "active" : "default"}
                  onMouseEnter={stopAutoScroll}
                  onMouseLeave={startAutoScroll}
                />
              </div>
            ))}
          </Carousel>
        );
      case "place":
        return (
          <Carousel ref={carouselRef} centerItems>
            {placeOptions.map((place, index) => (
              <div key={index} className="filter-option">
                <Button
                  variant="large"
                  primaryText={place}
                  onClick={() => handleFilterClick("gameName", place)}
                  styleType={activeFilters.gameName === place ? "active" : "default"}
                  onMouseEnter={stopAutoScroll}
                  onMouseLeave={startAutoScroll}
                />
              </div>
            ))}
          </Carousel>
        );
      default:
        return null;
    }
  };

  // Reorder the filters so that the active one is always in the middle
  let orderedFilters = [
    { type: "date", label: "DATE" },
    { type: "level", label: "LEVEL" },
    { type: "place", label: "PLACE" },
  ];

  if (filterType === "date") {
    // Put date in the middle: LEVEL, DATE, PLACE
    orderedFilters = [
      { type: "level", label: "LEVEL" },
      { type: "date", label: "DATE" },
      { type: "place", label: "PLACE" },
    ];
  } else if (filterType === "level") {
    // Already in middle: DATE, LEVEL, PLACE
    orderedFilters = [
      { type: "date", label: "DATE" },
      { type: "level", label: "LEVEL" },
      { type: "place", label: "PLACE" },
    ];
  } else if (filterType === "place") {
    // Put place in the middle: DATE, PLACE, LEVEL
    orderedFilters = [
      { type: "date", label: "DATE" },
      { type: "place", label: "PLACE" },
      { type: "level", label: "LEVEL" },
    ];
  }

  return (
    <div className="game-filter-container">
      <p className="choose-by-title">CHOOSE BY...</p>
      <div className="filter-titles">
        {orderedFilters.map((f) => (
          <span
            key={f.type}
            className={filterType === f.type ? "active" : ""}
            onClick={() => setFilterType(f.type)}
          >
            {f.label}
          </span>
        ))}
      </div>

      <div className="filter-options-container">{renderFilterOptions()}</div>

      <div className={`filtered-games ${filteredGames.length <= 5 ? "centered" : ""}`}>
        {filteredGames.length > 0 ? (
          filteredGames.map((game, index) => (
            <GameCard
              key={game._id}
              imageSrc={index % 2 === 0 ? TuriaImage : CarmenImage}
              gameName={game.stadium.name}
              gameSubtitle={game.type}
              gameDay={game.date}
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
