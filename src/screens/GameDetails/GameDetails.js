import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import GameInfo from "../../components/GameInfo/GameInfo"; // Import the new GameInfo component
import Map from "../../components/Map/Map"
import Host from "../../components/Host/Host"

import "./GameDetails.css";


const GameDetails = () => {
  const { gameId } = useParams(); // Retrieve the game ID from the route
  const [game, setGame] = useState(null); // Game details state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        console.log(`Fetching game details for ID: ${gameId}`); // Debugging line
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/games/${gameId}`);
        console.log("Game details fetched:", response.data); // Debugging line
        setGame(response.data); // Assuming the response contains the game details
      } catch (error) {
        console.error("Error fetching game details:", error);
        setError(error);
      } finally {
        setLoading(false); // Loading complete
      }
    };

    fetchGameDetails();
  }, [gameId]);

  // Sign-up logic using idToken from localStorage
  const handleSignup = async () => {
    const idToken = localStorage.getItem("idToken");

    if (!idToken) {
      alert("Please log in to sign up for this game.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/games/signup/${gameId}`,
        {}, // No body needed
        {
          headers: {
            Authorization: `Bearer ${idToken}`, // Include the token in the request headers
          },
        }
      );
      alert("Signed up successfully for the game!");
    } catch (error) {
      console.error("Error signing up for the game:", error);
      alert("Error signing up for the game.");
    }
  };

  if (loading) {
    return <p>Loading game details...</p>;
  }

  if (error) {
    return <p>Error fetching game details: {error.response?.data?.error || error.message}</p>;
  }

  if (!game) {
    return <p>Game not found.</p>;
  }

  // Extract relevant game information
  const gameTime = new Date(game.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const gameDate = new Date(game.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="game-details-container">
      {/* Using the new GameInfo component */}
      <GameInfo 
        time={gameTime} 
        date={gameDate} 
        gameName={game.stadium} 
        tournament={game.type} 
        placesLeft={4} // You can pass the actual dynamic value for places left
        onSignUp={handleSignup} // Use the signup logic from the Frame component
      />
      <Map/>
      <Host
      onSignUp={handleSignup} // Use the signup logic from the Frame component
      />
    </div>
  );
};

export default GameDetails;
