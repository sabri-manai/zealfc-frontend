import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import GameInfo from "../../components/GameInfo/GameInfo"; // Import the new GameInfo component
import Map from "../../components/Map/Map";
import Host from "../../components/Host/Host";

import "./GameDetails.css";

const GameDetails = () => {
  const { gameId } = useParams(); // Retrieve the game ID from the route
  const [game, setGame] = useState(null); // Game details state
  const [isSignedUp, setIsSignedUp] = useState(false); // Signup status
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [onWaitlist, setOnWaitlist] = useState(false);
  

  const fetchGameDetails = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/games/${gameId}`);
      setGame(response.data);
      
      // Check if user is signed up or on the waitlist
      const idToken = localStorage.getItem("idToken");
  
      if (idToken) {
        // Fetch user profile to get user's email
        const userResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/profile/user-profile`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
  
        const userEmail = userResponse.data.email;
  
        // Check if user's email exists in any team
        const userInTeam = response.data.teams.some(team =>
          team.some(player => player && player.email === userEmail)
        );
  
        setIsSignedUp(userInTeam);
  
        // **Check if user's email exists in the waitlist**
        const userOnWaitlist = response.data.waitlist.some(
          waitlistUser => waitlistUser.email === userEmail
        );
  
        // **Update the `onWaitlist` state**
        setOnWaitlist(userOnWaitlist);
      }
    } catch (error) {
      console.error("Error fetching game details:", error);
      setError(error);
    } finally {
      setLoading(false); // Loading complete
    }
  };
  


  const handleJoinWaitlist = async () => {
    const idToken = localStorage.getItem("idToken");
    if (!idToken) {
      alert("Please log in to join the waitlist.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/games/waitlist/${gameId}`,
        {},
        { headers: { Authorization: `Bearer ${idToken}` } }
      );
      alert(response.data.message);
      setOnWaitlist(true);
      fetchGameDetails();
    } catch (error) {
      alert(error.response?.data?.error || "Error joining waitlist.");
    }
  };


  const handleLeaveWaitlist = async () => {
    const idToken = localStorage.getItem("idToken");
    if (!idToken) {
      alert("Please log in to leave the waitlist.");
      return;
    }

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/games/waitlist/${gameId}`,
        { headers: { Authorization: `Bearer ${idToken}` } }
      );
      alert(response.data.message);
      setOnWaitlist(false);
      fetchGameDetails();
    } catch (error) {
      alert(error.response?.data?.error || "Error leaving waitlist.");
    }
  };


  useEffect(() => {
    fetchGameDetails();
  }, [gameId]);

  // Sign-up logic
  const handleSignup = async () => {
    const idToken = localStorage.getItem("idToken");

    if (!idToken) {
      alert("Please log in to sign up for this game.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/games/signup/${gameId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      alert(response.data.message || "Signed up successfully for the game!");
      setIsSignedUp(true);
      fetchGameDetails();
    } catch (error) {
      console.error("Error signing up for the game:", error);
      alert(error.response?.data?.error || "Error signing up for the game.");
    }
  };

  // Cancel signup logic
  const handleCancelSignup = async () => {
    const idToken = localStorage.getItem("idToken");

    if (!idToken) {
      alert("Please log in to cancel your signup.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/games/cancel-signup/${gameId}`,
        {}, // No body needed
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      alert("You have successfully canceled your signup for the game.");
      setIsSignedUp(false);
      fetchGameDetails();
    } catch (error) {
      console.error("Error canceling signup for the game:", error);
      alert(error.response?.data?.error || "Error canceling your signup for the game.");
    }
  };

  const calculatePlacesLeft = (game) => {
    if (!game || !game.teams) return 0;
    const totalSlots = game.teams.reduce((total, team) => total + team.length, 0);
    const occupiedSlots = game.teams.reduce(
      (total, team) => total + team.filter((player) => player !== null).length,
      0
    );
    return totalSlots - occupiedSlots;
  };

  const isGameFull = game ? calculatePlacesLeft(game) === 0 : false;

  if (loading) {
    return <p>Loading game details...</p>;
  }

  if (error) {
    return (
      <p>Error fetching game details: {error.response?.data?.error || error.message}</p>
    );
  }

  if (!game) {
    return <p>Game not found.</p>;
  }

  // Extract relevant game information

  const gameDate = new Date(game.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="game-details-container">
      <GameInfo
        time={game.time}
        date={gameDate}
        gameName={game.stadium.name}
        tournament={game.type}
        placesLeft={calculatePlacesLeft(game)}
        onSignUp={isSignedUp ? handleCancelSignup : handleSignup}
        isSignedUp={isSignedUp}
        onWaitlistToggle={onWaitlist ? handleLeaveWaitlist : handleJoinWaitlist}
        isWaitlisted={onWaitlist}
        isGameFull={isGameFull}
      />
      <Map address={game.stadium.address} />
      <Host host={game.host} />
    </div>
  );
};

export default GameDetails;
