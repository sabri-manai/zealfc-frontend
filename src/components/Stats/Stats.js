// src/components/Stats/Stats.js

import React, { useState, useEffect } from 'react';
import './Stats.css';
import LineChart from '../LineChart/LineChart';
import Leaderboard from "../Leaderboard/Leaderboard";
import Button from "../Button/Button";

// Import CircularProgressbar components and styles
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Stats({ refreshTokens, handleLogout }) {
  // State variables
  const [userProfile, setUserProfile] = useState(null);
  const [userGames, setUserGames] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingGames, setLoadingGames] = useState(true);
  const [pointsData, setPointsData] = useState([]);
  const [dates, setDates] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('CITY');
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);
  const [error, setError] = useState(null);

  // State variables for computed stats
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [draws, setDraws] = useState(0);
  const [winPercentage, setWinPercentage] = useState(0);
  const [lossPercentage, setLossPercentage] = useState(0);
  const [drawPercentage, setDrawPercentage] = useState(0);

  // Retrieve the authentication token
  let idToken = localStorage.getItem('idToken');
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      let idToken = localStorage.getItem('idToken');

      if (!idToken) {
        setError("No token found, please log in.");
        setLoadingProfile(false);
        return;
      }

      try {
        // First attempt to fetch user profile
        let response = await fetch(`${API_URL}/profile/user-profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`,
          },
        });

        if (response.status === 401) {
          // Token expired, attempt to refresh
          const tokenRefreshed = await refreshTokens();
          if (tokenRefreshed) {
            idToken = localStorage.getItem('idToken');
            // Retry fetching user profile with new token
            response = await fetch(`${API_URL}/profile/user-profile`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`,
              },
            });
            if (!response.ok) {
              throw new Error('Failed to fetch user profile after token refresh');
            }
          } else {
            handleLogout(); // Logout if token refresh fails
            return;
          }
        } else if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        setUserProfile(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError(error.message);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchUserProfile();
  }, [refreshTokens, handleLogout, API_URL]);

  // Fetch user games data
  useEffect(() => {
    const fetchUserGames = async () => {
      let idToken = localStorage.getItem('idToken');

      if (!idToken) {
        setError("No token found, please log in.");
        setLoadingGames(false);
        return;
      }

      try {
        // First attempt to fetch user games
        let response = await fetch(`${API_URL}/profile/user-games`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`,
          },
        });

        if (response.status === 401) {
          // Token expired, attempt to refresh
          const tokenRefreshed = await refreshTokens();
          if (tokenRefreshed) {
            idToken = localStorage.getItem('idToken');
            // Retry fetching user games with new token
            response = await fetch(`${API_URL}/profile/user-games`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`,
              },
            });
            if (!response.ok) {
              throw new Error('Failed to fetch user games after token refresh');
            }
          } else {
            handleLogout(); // Logout if token refresh fails
            return;
          }
        } else if (!response.ok) {
          throw new Error('Failed to fetch user games');
        }

        const data = await response.json();
        setUserGames(data);
      } catch (error) {
        console.error('Error fetching user games:', error);
        setError(error.message);
      } finally {
        setLoadingGames(false);
      }
    };

    fetchUserGames();
  }, [refreshTokens, handleLogout, API_URL]);

  // Calculate wins, losses, draws, and percentages
  useEffect(() => {
    if (userGames && userGames.length > 0) {
      let winsCount = 0;
      let lossesCount = 0;
      let drawsCount = 0;

      userGames.forEach((game) => {
        if (game.result === 'win') {
          winsCount++;
        } else if (game.result === 'loss') {
          lossesCount++;
        } else if (game.result === 'draw') {
          drawsCount++;
        }
      });

      setWins(winsCount);
      setLosses(lossesCount);
      setDraws(drawsCount);

      const totalGames = winsCount + lossesCount + drawsCount;

      if (totalGames > 0) {
        setWinPercentage((winsCount / totalGames) * 100);
        setLossPercentage((lossesCount / totalGames) * 100);
        setDrawPercentage((drawsCount / totalGames) * 100);
      } else {
        setWinPercentage(0);
        setLossPercentage(0);
        setDrawPercentage(0);
      }
    }
  }, [userGames]);

  // Calculate points progression over time
  useEffect(() => {
    if (!loadingGames && userGames.length > 0) {
      // Sort games by date
      const sortedGames = [...userGames].sort((a, b) => new Date(a.date) - new Date(b.date));

      // Initialize arrays for points and dates
      const pointsDataArray = [];
      const datesArray = [];
      let cumulativePoints = 0;

      sortedGames.forEach((game) => {
        const points = game.pointsEarned || game.points || 0;
        cumulativePoints += points;
        pointsDataArray.push(cumulativePoints);

        const date = new Date(game.date);
        if (!isNaN(date)) {
          datesArray.push(date.toLocaleDateString());
        } else {
          console.error('Invalid date:', game.date);
          datesArray.push('Invalid Date');
        }
      });

      console.log('Points Data Array:', pointsDataArray);
      console.log('Dates Array:', datesArray);

      setPointsData(pointsDataArray);
      setDates(datesArray);
    } else {
      console.log('No games to process for chart.');
      setPointsData([]);
      setDates([]);
    }
  }, [loadingGames, userGames]);

  // Fetch leaderboard data based on selected filter
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      let idToken = localStorage.getItem('idToken');

      if (!idToken) {
        setError("No token found, please log in.");
        setLoadingLeaderboard(false);
        return;
      }

      try {
        // First attempt to fetch leaderboard data
        let response = await fetch(`${API_URL}/leaderboard?filter=${selectedFilter}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`,
          },
        });

        if (response.status === 401) {
          // Token expired, attempt to refresh
          const tokenRefreshed = await refreshTokens();
          if (tokenRefreshed) {
            idToken = localStorage.getItem('idToken');
            // Retry fetching leaderboard data with new token
            response = await fetch(`${API_URL}/leaderboard?filter=${selectedFilter}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`,
              },
            });
            if (!response.ok) {
              throw new Error('Failed to fetch leaderboard data after token refresh');
            }
          } else {
            handleLogout(); // Logout if token refresh fails
            return;
          }
        } else if (!response.ok) {
          throw new Error('Failed to fetch leaderboard data');
        }

        const data = await response.json();
        setLeaderboardData(data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        setError(error.message);
      } finally {
        setLoadingLeaderboard(false);
      }
    };

    fetchLeaderboardData();
  }, [selectedFilter, refreshTokens, handleLogout, API_URL]);

  // Handle loading states
  if (loadingProfile || loadingGames) {
    return <p>Loading your stats...</p>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userProfile) {
    return <p>Unable to load your profile data.</p>;
  }

  return (
    <div className="stats-container">
      {/* Points Display */}
      <div className="points-display">{userProfile.points} POINTS</div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-item">
          <CircularProgressbarWithChildren
            value={lossPercentage}
            strokeWidth={3} // Reduce the thickness
            styles={buildStyles({
              textColor: '#1EB62D',
              pathColor: '#1EB62D',
              trailColor: '#0F5E17',
              textSize: '16px',
              strokeLinecap: 'butt',
            })}
          >
            <div className="circle-content">
              <div className="stat-number">{losses}</div>
              <div className="stat-text">LOST</div>
            </div>
          </CircularProgressbarWithChildren>
        </div>
        <div className="stat-item">
          <CircularProgressbarWithChildren
            value={winPercentage}
            strokeWidth={3}
            styles={buildStyles({
              textColor: '#1EB62D',
              pathColor: '#1EB62D',
              trailColor: '#0F5E17',
              textSize: '16px',
              strokeLinecap: 'butt',
            })}
          >
            <div className="circle-content">
              <div className="stat-number">{wins}</div>
              <div className="stat-text">WON</div>
            </div>
          </CircularProgressbarWithChildren>
        </div>
        <div className="stat-item">
          <CircularProgressbarWithChildren
            value={drawPercentage}
            strokeWidth={3}
            styles={buildStyles({
              textColor: '#1EB62D',
              pathColor: '#1EB62D',
              trailColor: '#0F5E17',
              textSize: '16px',
              strokeLinecap: 'butt',
            })}
          >
            <div className="circle-content">
              <div className="stat-number">{draws}</div>
              <div className="stat-text">TIED</div>
            </div>
          </CircularProgressbarWithChildren>
        </div>
      </div>

      {/* Separator */}
      <div className="separator">
        IN YOUR <span className="stat-number">{userGames.length}</span> GAMES
      </div>

      {/* Goals and Assists Stats */}
      <div className="ga-stats-section">
        <div className="ga-stats-item">
          <div className="stat-label">YOU SCORED</div>
          <div className="stat-value">{userProfile.goals}</div>
          <div className="stat-label">GOALS</div>
        </div>
        <div className="ga-stats-item">
          <div className="stat-label">YOU GAVE</div>
          <div className="stat-value">{userProfile.assists}</div>
          <div className="stat-label">ASSISTS</div>
        </div>
      </div>

      {/* Line Chart for Point Progression */}
      {!loadingGames && pointsData.length > 1 ? (
        <div className="point-progress-chart">
          <LineChart dataPoints={pointsData} dates={dates} title="Your Points Over Time" />
        </div>
      ) : (
        <p>
          {pointsData.length === 1
            ? 'Play more games to see your points progression.'
            : 'Loading point progression...'}
        </p>
      )}

      {/* Filter Buttons */}
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

      {/* Leaderboard */}
      {!loadingLeaderboard && leaderboardData.length > 0 ? (
        <Leaderboard leaderboardData={leaderboardData} currentUserId={userProfile._id} />
      ) : (
        <p>Loading leaderboard...</p>
      )}
    </div>
  );
}

export default Stats;
