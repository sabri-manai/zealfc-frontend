import React, { useState, useCallback } from "react";
import "./ProfileInfo.css";
import profilePic from "../../assets/images/profile_image.jpg";
import Button from "../../components/Button/Button3";
import axios from "axios";
import Cropper from 'react-easy-crop';
import getCroppedImg from '../../utils/getCroppedImg';
import getShapedImg from '../../utils/getShapedImg';
import EditProfile from "../EditProfile/EditProfile";

const CLIP_PATH_D = "M153.032 0.744141C193.713 0.744141 230.687 16.618 258.097 42.5097L258.097 42.5081C292.09 74.6073 310.897 72.8477 326.946 55.8512L327.004 56.1437C340.951 41.4066 360.695 32.2128 382.587 32.2128C424.845 32.2128 459.102 66.4696 459.102 108.728C459.102 143.497 435.91 172.85 404.153 182.161C376.248 194.303 363.738 215.317 380.546 261.872C386.064 275.778 389.097 290.941 389.097 306.812C389.097 374.14 334.518 428.719 267.19 428.719C209.797 428.719 161.667 389.058 148.714 335.647C144.097 318.551 140.215 311.541 124.296 305.292C76.3543 305.713 74.7998 343.25 80.3086 355.418C82.7718 360.216 84.1618 365.655 84.1618 371.419C84.1618 390.794 68.4553 406.501 49.0802 406.501C29.7052 406.501 13.9987 390.794 13.9987 371.419C13.9987 354.541 25.9185 340.446 41.7996 337.094C55.6976 333.571 87.69 304.953 45.0568 262.22C17.2255 234.509 0 196.154 0 153.776C0 69.2588 68.5147 0.744141 153.032 0.744141Z";

const ProfileInfo = ({ userData }) => {
  const [profileImageUrl, setProfileImageUrl] = useState(userData.profilePictureUrl || profilePic);
  const [selectedFile, setSelectedFile] = useState(null);

  const [showCropModal, setShowCropModal] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [cropImageSrc, setCropImageSrc] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  const handleEditSuccess = () => {
    // Callback to be passed to EditProfile to close edit mode after a successful update
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxSizeInBytes = 5 * 1024 * 1024;
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

      if (!allowedTypes.includes(file.type)) {
        alert('Only JPEG, PNG, and GIF files are allowed.');
        return;
      }

      if (file.size > maxSizeInBytes) {
        alert('File size is too large. Max limit is 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setCropImageSrc(reader.result);
        setShowCropModal(true);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  
  const handleConfirmCrop = async () => {
    try {
      if (!cropImageSrc || !croppedAreaPixels) {
        alert("Image or crop area not set correctly.");
        return;
      }
  
      const croppedBlob = await getCroppedImg(cropImageSrc, croppedAreaPixels, zoom);
      const croppedUrl = URL.createObjectURL(croppedBlob);
      setProfileImageUrl(croppedUrl);

      const croppedFile = new File([croppedBlob], selectedFile.name, { type: "image/png" });
      handleImageUpload(croppedFile);

      setShowCropModal(false);
    } catch (error) {
      console.error("Error cropping image:", error);
      alert("Failed to crop the image. Please try again.");
    }
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

      if (response.data.profilePictureUrl) {
        setProfileImageUrl(response.data.profilePictureUrl);
        alert('Profile picture uploaded successfully!');
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("Failed to upload profile picture. Please try again.");
    }
  };

  if (isEditing) {
    // Pass the handleEditSuccess callback to EditProfile
    return <EditProfile onEditSuccess={handleEditSuccess} />;
  }

  return (
    <div className="profile-info-container">
      <div className="profile-edit-btn">

      </div>
      <div className="profile-info">
        <div className="profile-image">
          <label htmlFor="profilePictureInput" className="image-label">
            <div className="overlay">
              <span>Update Picture</span>
            </div>
            <img src={profileImageUrl} alt={`${userData.first_name}'s profile`} />
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
          <Button
            variant="small"
            primaryText="Edit Profile"
            styleType="default"
            onClick={() => setIsEditing(true)}
          />
          <p className="first-name">{userData.first_name}</p>
          <p>{userData.email}</p>
          <p>{userData.phone_number}</p>
          <p>{userData.credits} CREDITS</p>
        </div>
      </div>

      {showCropModal && (
        <div className="crop-modal">
          <div className="crop-container">
            <Cropper
              image={cropImageSrc}
              crop={crop}
              zoom={zoom}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              showGrid={false}
              cropShape="rect"
              aspect={2 / 3}
              mediaProps={{ style: { objectFit: 'contain' }}} 
              style={{
                containerStyle: {
                  backgroundColor: '#ffff',
                  width: '100%',
                  height: '100%',
                  position: 'relative'
                },
                mediaStyle: {
                  background: 'transparent'
                },
                cropAreaStyle: {
                  background: 'transparent',
                  border: 'none'
                },
              }}
            />
          </div>

          <div className="zoom-slider-container">
            <input
              type="range"
              min="1"
              max="3"
              step="0.1"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="zoom-slider"
            />
          </div>

          <div className="crop-controls">
            <Button
              variant="small"
              primaryText="Confirm Crop"
              onClick={handleConfirmCrop}
              styleType="default"
            />
            <Button
              variant="small"
              primaryText="Cancel"
              onClick={() => setShowCropModal(false)}
              styleType="default"
            />
          </div>
        </div>
      )}

      <div className="noiseeffect"></div>
    </div>
  );
};

export default ProfileInfo;
