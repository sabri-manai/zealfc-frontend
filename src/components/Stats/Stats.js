import React from 'react';
import './Stats.css';

const Stats = () => {
  return (
    <div className="stats-container">
      <h2>785 POINTS</h2>
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
    </div>
  );
};

export default Stats;
