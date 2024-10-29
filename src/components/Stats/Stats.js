import React from 'react';
import './Stats.css';
import LineChart from '../LineChart/LineChart';

const Stats = () => {
  const pointsData = [5, 10, 15, 20, 25, 30, 40];
  const dates = ["01.01.2024", "05.01.2024", "10.01.2024", "15.01.2024", "20.01.2024", "25.01.2024", "30.01.2024"];
  const pointLineLabel = "Your Points Over Time";

  return (
    <div className="stats-container">
      <div className="points-display">785 POINTS</div>
      
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
      
      {/* Horizontal separator */}
      <div className="separator">
        IN YOUR <span className="highlight">15</span> GAMES
      </div>
      
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

      {/* Points progression line */}
      <LineChart dataPoints={pointsData} dates={dates} title={pointLineLabel} />

    </div>
  );
};

export default Stats;
