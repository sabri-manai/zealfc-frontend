import React from "react";
import "./Host.css"; // Create a separate CSS file for styling
import HostImage from "../../assets/images/host.png"; // Import the host image
import Button from "../../components/Button/Button"; // Use your Button component

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
          text="CONTACT" // Use Button's props like text
          styleType="default" // Assuming your Button component accepts this prop for styles
          onClick={() => console.log('Contact button clicked!')} // Define the action for the button
        />
      </div>
      <div className="host-image">
        <img src={HostImage} alt="Host Inka" />
      </div>
    </div>
  );
};

export default Host;
