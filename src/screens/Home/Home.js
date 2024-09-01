// src/components/Home.js
import React from "react";
import './Home.css';  // Import the CSS file
import Button from '../../components/Button/Button';
import { Frame } from "../../components/Frame/Frame";

function Home() {
  const handleClick = (action) => {
    alert(`${action} button clicked!`);
  };

  return (
    <div className="home-container">
      <Button text="Cancel" styleType="default" onClick={() => handleClick('Cancel')} />
      <Frame />
    </div>
  );
}

export default Home;
