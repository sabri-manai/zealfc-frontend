// src/components/Footer.js
import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className="footer">
      <div className="overlap-group">
        <div className="rectangle"></div>
        <div className="noiseeffect"></div>
        <div className="text-wrapper">
          ZE<br/>AL
        </div>
        <div className="flexcontainer">
          <p className="text-i">Carrer d'Homer 3</p>
          <p className="text-i">Valencia, 12-231</p>
          <p className="text-i">email@gmail.com</p>
          <p className="text-i">+34 123 456 678</p>
        </div>
        <div className="flexcontainer-i">
          <p className="span-wrapper">Facebook</p>
          <p className="span-wrapper">Instagram</p>
          <p className="span-wrapper">Whatsapp</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
