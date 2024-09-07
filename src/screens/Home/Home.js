import React from "react";
import './Home.css';  // Import the CSS file
import { Frame } from "../../components/Frame/Frame"; // Adjust if the path is different
import { GameFilter } from "../../components/GameFilter/GameFilter";

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-text">
          <h1>ZEAL</h1>
          <p>CHOOSE YOUR NEXT MOVE</p>
        </div>
        <div className="noiseeffect"></div> {/* Adding the noise effect */}
      </div>

      {/* Upcoming Games Section */}
      <div className="upcoming-games">
        <Frame />
      </div>
      <GameFilter />

    </div>
  );
}

export default Home;
