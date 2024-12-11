// src/components/Host/Host.js

import React from "react";
import "./Host.css";
import HostImage from "../../assets/images/host.png";
import Button from "../../components/Button/Button3";

const Host = () => {
  return (
    <div className="host-container">
      <div className="host-info">
        <h1>INKA</h1>
        <h2>REFEREE</h2>
        <p>
          "I am excited to host this friendly match today and look forward to 
          seeing some excellent football. Let's remember to play with respect and 
          sportsmanship, and most importantly, have fun out there!"
        </p>
        <Button
          variant="small"
          primaryText="CONTACT"
          styleType="default"
          onClick={() => console.log('Contact button clicked!')}
        />
      </div>
      <div className="host-image">
        <img src={HostImage} alt="Host Inka" />
      </div>
    </div>
  );
};

export default Host;
