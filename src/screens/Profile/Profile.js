import React, { useState, useEffect } from "react";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo"; // Import ProfileInfo component
import ProfileFilter from "../../components/ProfileFilter/ProfileFilter"; // Import ProfileFilter component
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
      console.log("ID Token:", idToken); // Log the token for debugging
  
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
          <ProfileFilter games={userGames} /> {/* Pass the fetched games to ProfileFilter */}
        </>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
}

export default Profile;
