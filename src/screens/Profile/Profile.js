// src/pages/Profile/Profile.js

import React, { useState, useEffect } from "react";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import ProfileFilter from "../../components/ProfileFilter/ProfileFilter";
import './Profile.css';

function Profile({ refreshTokens, handleLogout }) {
  const [userData, setUserData] = useState(null);
  const [userGames, setUserGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data and games securely using the idToken
  useEffect(() => {
    const fetchUserDataAndGames = async () => {
      let idToken = localStorage.getItem("idToken");
  
      if (!idToken) {
        setError("No token found, please log in.");
        setLoading(false);
        return;
      }

      try {
        // Fetch user profile
        const profileResponse = await fetch(`${process.env.REACT_APP_API_URL}/profile/user-profile`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${idToken}`,
            "Content-Type": "application/json",
          },
        });

        if (profileResponse.status === 401) {
          const tokenRefreshed = await refreshTokens();
          if (tokenRefreshed) {
            idToken = localStorage.getItem("idToken");
            const retryProfileResponse = await fetch(`${process.env.REACT_APP_API_URL}/profile/user-profile`, {
              method: "GET",
              headers: {
                "Authorization": `Bearer ${idToken}`,
                "Content-Type": "application/json",
              },
            });
            if (!retryProfileResponse.ok) {
              throw new Error("Failed to fetch user data after token refresh");
            }
            const data = await retryProfileResponse.json();
            setUserData(data);
          } else {
            handleLogout(); // Logout if refresh token fails
          }
        } else if (!profileResponse.ok) {
          throw new Error("Failed to fetch user data");
        } else {
          const userData = await profileResponse.json();
          setUserData(userData);
        }

        // Fetch user games
        const gamesResponse = await fetch(`${process.env.REACT_APP_API_URL}/profile/user-games`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${idToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!gamesResponse.ok) {
          throw new Error("Failed to fetch user games");
        } else {
          const gamesData = await gamesResponse.json();
          setUserGames(gamesData); // Set games data
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDataAndGames();
  }, [refreshTokens, handleLogout]);

  // Function to handle quitting the waitlist
  const handleQuitWaitlist = async (gameId) => {
    const idToken = localStorage.getItem("idToken");
    if (!idToken) {
      alert("You must be logged in to perform this action.");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/games/${gameId}/waitlist`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to quit waitlist");
      }

      // Remove the game from userGames
      setUserGames((prevGames) => prevGames.filter((game) => game.gameId._id !== gameId));

      alert("You have successfully left the waitlist.");
    } catch (error) {
      console.error("Error quitting waitlist:", error);
      alert("Failed to quit waitlist. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="profile-container">
      {userData ? (
        <>
          <ProfileInfo userData={userData} /> {/* Render ProfileInfo */}
          <ProfileFilter
            games={userGames}
            user={userData}
            onQuitWaitlist={handleQuitWaitlist} // Pass the function to ProfileFilter
          /> {/* Pass the fetched games to ProfileFilter */}
        </>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
}

export default Profile;
