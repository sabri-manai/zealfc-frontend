// src/components/Footer.js
import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className="footer">
      {/* Left Side: ZEAL and Address Info */}
      <div className="left-container">
        <div className="zeal-address-container">
          <div className="text-wrapper">
            ZE<br />AL
          </div>
          <div className="address-info">
            <p className="text-i">Carrer d'Homer 3</p>
            <p className="text-i">Valencia, 12-231</p>
            <p className="text-i">email@gmail.com</p>
            <p className="text-i">+34 123 456 678</p>
          </div>
        </div>
      </div>

      {/* Right Side: Social Media Links */}
      <div className="right-container">
        <p className="span-wrapper">Facebook</p>
        <p className="span-wrapper">Instagram</p>
        <p className="span-wrapper">WhatsApp</p>
      </div>
    </div>
  );
}

export default Footer;
