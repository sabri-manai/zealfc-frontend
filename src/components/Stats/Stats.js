import React, { useState } from 'react';
import './Stats.css';
import LineChart from '../LineChart/LineChart';
import Leaderboard from "../Leaderboard/Leaderboard";
import Button from "../Button/Button"; // Import your custom Button component
import profilePic from "../../assets/images/IMG_0116.jpg";

const Stats = () => {
  // Points and dates data for point progression chart
  const pointsData = [0, 3, 3, 6, 7, 10, 13];
  const dates = ["01.01.2024", "05.01.2024", "10.01.2024", "15.01.2024", "20.01.2024", "25.01.2024", "30.01.2024"];
  const pointLineLabel = "Your Points Over Time";

  // State for the selected filter (CITY, COUNTRY, ZEAL)
  const [selectedFilter, setSelectedFilter] = useState('CITY');

  // Data for ranking progression based on the selected filter
  const rankingProgressData = {
    CITY: {
      points: [5, 5, 5, 8, 8],
      dates: ["01.01.2024", "05.01.2024", "10.01.2024", "15.01.2024", "20.01.2024"],
    },
    COUNTRY: {
      points: [10, 10, 11, 14, 15],
      dates: ["01.01.2024", "05.01.2024", "10.01.2024", "15.01.2024", "20.01.2024"],
    },
    ZEAL: {
      points: [15, 18, 18, 21, 22],
      dates: ["01.01.2024", "05.01.2024", "10.01.2024", "15.01.2024", "20.01.2024"],
    },
  };

  // Sample leaderboard data based on the selected filter
  const leaderboardDataByFilter = {
    CITY: [
      { id: 1, name: 'Alice', points: 100, profilePictureUrl: profilePic },
      { id: 2, name: 'Bob', points: 90, profilePictureUrl: profilePic },
      { id: 3, name: 'Charlie', points: 80, profilePictureUrl: profilePic },
    ],
    COUNTRY: [
      { id: 1, name: 'David', points: 110, profilePictureUrl: profilePic },
      { id: 2, name: 'Eve', points: 95, profilePictureUrl: profilePic },
      { id: 3, name: 'Frank', points: 85, profilePictureUrl: profilePic },
    ],
    ZEAL: [
      { id: 1, name: 'Grace', points: 120, profilePictureUrl: profilePic },
      { id: 2, name: 'Heidi', points: 100, profilePictureUrl: profilePic },
      { id: 3, name: 'Ivan', points: 90, profilePictureUrl: profilePic },
    ],
  };

  return (
    <div className="stats-container">
      {/* Points Display */}
      <div className="points-display">785 POINTS</div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-value">10</div>
          <div className="stat-label">LOST</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">7</div>
          <div className="stat-label">WON</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">2</div>
          <div className="stat-label">TIED</div>
        </div>
      </div>

      {/* Separator */}
      <div className="separator">
        IN YOUR <span className="highlight">15</span> GAMES
      </div>

      {/* Goals and Assists Stats */}
      <div className="ga-stats-section">
        <div className="ga-stats-item">
          <div className="stat-label">YOU SCORED</div>
          <div className="stat-value">29</div>
          <div className="stat-label">GOALS</div>
        </div>
        <div className="ga-stats-item">
          <div className="stat-label">YOU GAVE</div>
          <div className="stat-value">27</div>
          <div className="stat-label">ASSISTS</div>
        </div>
      </div>

      {/* First Line Chart for Point Progression */}
      <div className="point-progress-chart">
      <LineChart
        dataPoints={pointsData} // Array of y-axis values (points)
        dates={dates}           // Array of x-axis values (dates)
        title={pointLineLabel}
      />
      </div>

      {/* Filter Buttons using your custom Button component */}
      <div className="filter-buttons">
        {['CITY', 'COUNTRY', 'ZEAL'].map((filter) => (
          <Button
            key={filter}
            text={filter}
            onClick={() => setSelectedFilter(filter)}
            styleType={selectedFilter === filter ? 'active' : 'default'}
          />
        ))}
      </div>

      {/* Second Line Chart and Leaderboard Side by Side */}
      <div className="chart-leaderboard-container">
        {/* Second Line Chart for Ranking Progression */}
        <div className="progress-chart">
          <LineChart
            dataPoints={rankingProgressData[selectedFilter].points}
            dates={rankingProgressData[selectedFilter].dates}
            title={`Your Ranking Progress (${selectedFilter})`}
          />
        </div>

        {/* Leaderboard */}
        <div className="leaderboard">
          <Leaderboard leaderboardData={leaderboardDataByFilter[selectedFilter]} />
        </div>
      </div>
    </div>
  );
};

export default Stats;
