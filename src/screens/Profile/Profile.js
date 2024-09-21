import React, { useState, useEffect } from "react";
import './Profile.css';

function Profile({ refreshTokens, handleLogout }) { // Added refreshTokens and handleLogout props
  // State to store user data
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
            "Authorization": `Bearer ${idToken}`, // Ensure token is correctly formatted
            "Content-Type": "application/json",
          },
        });
  
        if (response.status === 401) { // Token is expired or invalid
          const tokenRefreshed = await refreshTokens(); // Try to refresh the token
          if (tokenRefreshed) {
            // Retry fetching user data with the new token
            idToken = localStorage.getItem("idToken");
            const retryResponse = await fetch(`${process.env.REACT_APP_API_URL}/profile/user-profile`, {
              method: "GET",
              headers: {
                "Authorization": `Bearer ${idToken}`, // Use the new token
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
  }, [refreshTokens, handleLogout]); // Added refreshTokens and handleLogout as dependencies

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
          <h1>Welcome, {userData.first_name} {userData.last_name}</h1>
          <p>Email: {userData.email}</p>
          <p>Phone: {userData.phone_number}</p>
        </>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
}

export default Profile;
