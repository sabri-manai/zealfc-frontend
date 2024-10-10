import React, { useState, useEffect } from "react";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo"; // Import ProfileInfo component
import ProfileFilter from "../../components/ProfileFilter/ProfileFilter"; // Import ProfileFilter component
import './Profile.css';

// Import the images
import CarmenImage from "../../assets/images/carmen.png";
import BeteroImage from "../../assets/images/betero.png"; 

const gamesData = [
  {
    id: 1,
    name: 'Carmen',
    result: 'won',
    date: '12/03/2024 14:30:00', // Use the expected date format
    score: '2:3',
    imageSrc: BeteroImage, // Use the imported image
    gameSubtitle: 'Friendly Match', // Added 'gameSubtitle' property
    gameDay: '12/03/2024 14:30:00', // Added 'gameDay' property
    gameId: 1,                     // Added 'gameId' property
    className: '',                 // Optional, can be left empty
  },
  {
    id: 2,
    name: 'Betero',
    result: 'lost',
    date: '10/03/2024 16:00:00',
    score: '3:1',
    imageSrc: BeteroImage, // Use the imported image
    gameSubtitle: 'League Game',
    gameDay: '10/03/2024 16:00:00',
    gameId: 2,
    className: '',
  },
  // Add more game objects as needed...
];

function Profile({ refreshTokens, handleLogout }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data securely using the idToken
  useEffect(() => {
    const fetchUserData = async () => {
      let idToken = localStorage.getItem("idToken");
      console.log("ID Token:", idToken); // Log the token for debugging
  
      if (!idToken) {
        setError("No token found, please log in.");
        setLoading(false);
        return;
      }
  
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/profile/user-profile`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${idToken}`,
            "Content-Type": "application/json",
          },
        });
  
        if (response.status === 401) {
          const tokenRefreshed = await refreshTokens();
          if (tokenRefreshed) {
            idToken = localStorage.getItem("idToken");
            const retryResponse = await fetch(`${process.env.REACT_APP_API_URL}/profile/user-profile`, {
              method: "GET",
              headers: {
                "Authorization": `Bearer ${idToken}`,
                "Content-Type": "application/json",
              },
            });
            if (!retryResponse.ok) {
              throw new Error("Failed to fetch user data after token refresh");
            }
            const data = await retryResponse.json();
            setUserData(data);
          } else {
            handleLogout(); // Logout if refresh token fails
          }
        } else if (!response.ok) {
          throw new Error("Failed to fetch user data");
        } else {
          const data = await response.json();
          setUserData(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
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
          <ProfileFilter games={gamesData} /> {/* Render ProfileFilter after ProfileInfo */}
        </>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
}

export default Profile;
