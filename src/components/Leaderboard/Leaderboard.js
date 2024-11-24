// src/components/Leaderboard/Leaderboard.js

import React from 'react';
import './Leaderboard.css';

const Leaderboard = ({ leaderboardData, currentUserId }) => {
  return (
    <div className="leaderboard-container">
      {/* Leaderboard Ranking */}
      <div className="ranking">
        {leaderboardData.map((user, index) => (
          <div
            key={user._id}
            className={`ranking-item ${
              user._id.toString() === currentUserId.toString() ? 'highlight' : ''
            }`}
          >
            <span className="rank">{index + 1}.</span>
            <img
              src={
                user.profilePictureUrl
                  ? user.profilePictureUrl
                  : '/path/to/default/avatar.png'
              }
              alt={`${user.first_name} ${user.last_name}'s avatar`}
              className="avatar"
            />
            <span className="name">{`${user.first_name} ${user.last_name}`}</span>
            <span className="points">{user.points} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
