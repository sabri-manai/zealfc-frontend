import React from 'react';
import './AboutUs.css';
import WhoWeAreImage from '../../assets/images/turia.png'; // Replace with your own image
import OurMissionImage from '../../assets/images/loading.png'; // Replace with your own image
import HowDoesItWorkImage from '../../assets/images/turia.png'; // Replace with your own image

export const AboutUs = () => {
  return (
    <div className="about-us-container">
      {/* Who We Are Section */}
      <div className="section section-first">
        <div className="section-image-container">
          <img src={WhoWeAreImage} alt="Who We Are" className="section-image" />
        </div>        
        <div className="section-content">
          <p className="section-title">WHO WE ARE</p>
          <p className="section-text">
            ZEAL was created by a team of passionate football lovers who wanted
            to make it easier for players to connect and join local matches.
            We’re a group of experienced players, coaches, and tech enthusiasts
            who share a deep love for the game. Our mission is to build an
            inclusive community where everyone can play, grow, and celebrate
            football together.
          </p>
        </div>

      </div>

      {/* Our Mission Section */}
      <div className="section section-second">
        <div className="section-content">
          <p className="section-title">OUR MISSION</p>
          <p className="section-text">
            Our mission is simple: to unite local football players. At ZEAL, we
            believe football is for everyone—no matter your skill level. We're
            here to build a strong, supportive community, inspire an active
            lifestyle, and create connections that last far beyond the pitch.
          </p>
        </div>
        <div className="section-image-container">
          <img
            src={OurMissionImage}
            alt="Our Mission"
            className="section-image"
          />
        </div>
      </div>

      {/* How Does It Work Section */}
    <div className="section section-third">
        <div className="section-image-container">
            <img
            src={HowDoesItWorkImage}
            alt="How Does It Work?"
            className="section-image"
            />
        </div>
        <div className="section-content">
            <p className="section-title">SIGN&nbsp;&nbsp;UP</p>
            <p className="section-text">
            Join the ZEAL community and take your first step into the game you love. Create an account, choose the subscription that suits you, and get started—quick and easy!
            </p>

            <p className="section-title">FIND&nbsp;&nbsp;MATCHES</p>
            <p className="section-text">
            Discover football matches near you with ease. Use filters for date, location, and skill level to find the perfect game. ZEAL ensures you always have the right options at your fingertips.
            </p>

            <p className="section-title">JOIN&nbsp;&nbsp;THE&nbsp;&nbsp;GAME</p>
            <p className="section-text">
            Ready to play? Use your points to join a match with just a few clicks. Get all the details and step onto the field to connect, compete, and enjoy every moment.
            </p>
        </div>
    </div>


    </div>
  );
};

export default AboutUs;
