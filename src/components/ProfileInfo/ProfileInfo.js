import React, { useState } from "react";
import "./ProfileInfo.css";
import profilePic from "../../assets/images/profile_image.png";
import Button from "../../components/Button/Button";
import axios from "axios";

const ProfileInfo = ({ userData }) => {
  const [profileImageUrl, setProfileImageUrl] = useState(userData.profilePictureUrl || profilePic);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Client-side validation
      const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

      if (!allowedTypes.includes(file.type)) {
        alert('Only JPEG, PNG, and GIF files are allowed.');
        return;
      }

      if (file.size > maxSizeInBytes) {
        alert('File size is too large. Max limit is 5MB.');
        return;
      }

      // Generate a Base64 string for the image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImageUrl(reader.result); // Preview the image
      };
      reader.readAsDataURL(file);

      // Save the selected file and show confirmation dialog
      setSelectedFile(file);
      setShowConfirmation(true);
    }
  };

  const handleConfirmUpload = async () => {
    if (selectedFile) {
      await handleImageUpload(selectedFile);
      setShowConfirmation(false);
      setSelectedFile(null);
    }
  };

  const handleCancelUpload = () => {
    setShowConfirmation(false);
    setSelectedFile(null);
    setProfileImageUrl(userData.profilePictureUrl || profilePic);
  };

  const handleImageUpload = async (file) => {
    const idToken = localStorage.getItem("idToken");
    if (!idToken) {
      alert("You must be logged in to perform this action.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/profile/upload-profile-picture`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      // Update the profile image URL after successful upload
      if (response.data.profilePictureUrl) {
        setProfileImageUrl(response.data.profilePictureUrl);
        alert('Profile picture uploaded successfully!');
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else if (error.message) {
        alert(error.message);
      } else {
        alert("Failed to upload profile picture. Please try again.");
      }
    }
  };

  return (
    <div className="profile-info-container">
      <div className="profile-edit-btn">
        <Button text="Edit Profile" onClick={() => console.log("Edit Profile Clicked")} />
      </div>
      <div className="profile-info">
        <div className="profile-image">
          <label htmlFor="profilePictureInput">
            <img src={profileImageUrl} alt={`${userData.first_name}'s profile`} />
            <div className="overlay">
              <span>Edit</span>
            </div>
          </label>
          <input
            type="file"
            id="profilePictureInput"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>
        <div className="profile-details">
          <p>{userData.first_name}</p>
          <p>{userData.email}</p>
          <p>{userData.phone_number}</p>
          <p>{userData.credits} CREDITS</p>
        </div>
      </div>
      <div className="noiseeffect"></div>
      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="confirmation-content">
            <p>Do you want to upload this image?</p>
            <button onClick={handleConfirmUpload}>Yes</button>
            <button onClick={handleCancelUpload}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
