import React from "react";
import "./ProfileInfo.css";
import profilePic from "../../assets/images/profile_image.png"; // Adjust path if necessary
import Button from "../../components/Button/Button"; // Assuming you have a Button component

const ProfileInfo = ({ userData }) => {
  return (
    <div className="profile-info-container">
      <div className="profile-edit-btn">
        <Button text="Edit Profile" onClick={() => console.log('Edit Profile Clicked')} />
      </div>
      <div className="profile-info">
        <div className="profile-image">
          <img src={profilePic} alt={`${userData.first_name}'s profile`} />
        </div>
        <div className="profile-details">
          <p>{userData.first_name}</p>
          <p>{userData.email}</p>
          <p>{userData.phone_number}</p>
          <p>{userData.credits} CREDITS</p>
        </div>
      </div>
      <div className="noiseeffect"></div> {/* Adding the noise effect */}
    </div>
  );
};

export default ProfileInfo;
