// src/components/Host/Host.js
import React, { useState } from "react";
import "./Host.css";
import HostImage from "../../assets/images/host.png";
import Button from "../../components/Button/Button3";

const Host = ({ host }) => {
  const hostName = `${host.first_name}`;
  const [showContactCard, setShowContactCard] = useState(false);

  const handleContactClick = () => {
    setShowContactCard(true);
  };

  const handleCloseCard = () => {
    setShowContactCard(false);
  };

  return (
    <div className="host-container">
      <div className="host-info">
        <h1>{hostName}</h1>
        <h2>HOST</h2>
        <p>
          "I am excited to host this friendly match today and look forward to 
          seeing some excellent football. Let's remember to play with respect and 
          sportsmanship, and most importantly, have fun out there!"
        </p>
        <Button
          variant="small"
          primaryText="CONTACT"
          styleType="default"
          onClick={handleContactClick}
        />
      </div>
      <div className="host-image">
        <img src={HostImage} alt={`Host ${hostName}`} />
      </div>

      {showContactCard && (
        <div className="contact-card-overlay" onClick={handleCloseCard}>
          <div className="contact-card" onClick={(e) => e.stopPropagation()}>
            <h3>Contact {hostName}</h3>
            <p><strong>Email:</strong> {host.email}</p>
            <p><strong>Phone:</strong> {host.phone_number}</p>
            <Button
              variant="small"
              primaryText="CLOSE"
              styleType="default"
              onClick={handleCloseCard}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Host;
