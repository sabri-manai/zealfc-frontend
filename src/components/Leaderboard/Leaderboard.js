import React from 'react';
import './Leaderboard.css';

const Leaderboard = ({ leaderboardData }) => {
  return (
    <div className="leaderboard-container">
      {/* Leaderboard Ranking */}
      <div className="ranking">
        {leaderboardData.map((user, index) => (
          <div key={user.id} className={`ranking-item ${index === 0 ? 'first-place' : ''}`}>
            <span className="rank">{index + 1}.</span>
            <img src={user.profilePictureUrl} alt={`${user.name}'s avatar`} className="avatar" />
            <span className="name">{user.name}</span>
            <span className="points">{user.points} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
