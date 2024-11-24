// src/components/ProfileFilter/ProfileFilter.js

import React, { useState } from 'react';
import './ProfileFilter.css';
import Stats from '../Stats/Stats';
import SubscriptionInfo from '../SubscriptionInfo/SubscriptionInfo';
import GameHistory from '../GameHistory/GameHistory';
import UpcomingGames from '../UpcomingGames/UpcomingGames';

const ProfileFilter = ({ games, user }) => {
  const [activeTab, setActiveTab] = useState('games');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="profile-filter-container">
      {/* Tab Menu */}
      <div className="tab-menu">
        <span
          className={activeTab === 'ranking' ? 'active' : ''}
          onClick={() => handleTabClick('ranking')}
        >
          RANKING
        </span>
        <span
          className={activeTab === 'subscription' ? 'active' : ''}
          onClick={() => handleTabClick('subscription')}
        >
          SUBSCRIPTION
        </span>
        <span
          className={activeTab === 'games' ? 'active' : ''}
          onClick={() => handleTabClick('games')}
        >
          GAMES
        </span>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'ranking' && <Stats />}
        {activeTab === 'subscription' && <SubscriptionInfo user={user} />}
        {activeTab === 'games' && (
          <div>
            {/* Game History */}
            <GameHistory games={games} />

            {/* Upcoming Games */}
            <UpcomingGames games={games} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileFilter;
