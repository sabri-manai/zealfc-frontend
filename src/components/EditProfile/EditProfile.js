import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EditProfile.css";
import Button from "../../components/Button/Button3";
import { useNavigate } from "react-router-dom";

function EditProfile({ onEditSuccess }) {
  const [firstName, setFirstName]   = useState("");
  const [lastName, setLastName]     = useState("");
  const [email, setEmail]           = useState("");
  const [newEmail, setNewEmail]     = useState("");
  const [confirmNewEmail, setConfirmNewEmail] = useState("");
  const [message, setMessage]       = useState("");
  const [loading, setLoading]       = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const idToken = localStorage.getItem("idToken");
        if (!idToken) {
          setMessage("You must be logged in to view your profile.");
          return;
        }

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/profile/user-profile`, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        const { first_name, last_name, email } = response.data;
        setFirstName(first_name || "");
        setLastName(last_name || "");
        setEmail(email || "");
      } catch (error) {
        setMessage("Failed to load profile data.");
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const handleSaveChanges = async () => {
    setMessage("");
    setLoading(true);

    let finalEmail = email;
    if (newEmail.trim()) {
      if (newEmail !== confirmNewEmail) {
        setMessage("New emails do not match.");
        setLoading(false);
        return;
      }
      finalEmail = newEmail;
    }

    try {
      const idToken = localStorage.getItem("idToken");
      if (!idToken) {
        setMessage("You must be logged in to update your profile.");
        setLoading(false);
        return;
      }

      await axios.put(
        `${process.env.REACT_APP_API_URL}/profile/user-profile`,
        {
          firstName,
          lastName,
          email: finalEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      if (newEmail.trim()) {
        setEmail(finalEmail);
        setNewEmail("");
        setConfirmNewEmail("");
      }

      setMessage("Profile updated successfully!");
      
      // Exit edit mode
      if (typeof onEditSuccess === 'function') {
        onEditSuccess();
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Exit edit mode without saving
    if (typeof onEditSuccess === 'function') {
      onEditSuccess();
    }
  };

  return (
    <div className="edit-profile-form-container">
      <p className="edit-profile-title">EDIT YOUR PROFILE</p>
      <form className="edit-profile-form" onSubmit={(e) => e.preventDefault()}>
        <div className="edit-profile-field">
          <span>First Name:</span>
          <input
            type="text"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="edit-profile-input-line"
          />
        </div>
        <div className="edit-profile-field">
          <span>Last Name:</span>
          <input
            type="text"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="edit-profile-input-line"
          />
        </div>
        <div className="edit-profile-field">
          <span>Current Email:</span>
          <input
            type="email"
            placeholder="Your current email"
            value={email}
            disabled
            className="edit-profile-input-line"
          />
        </div>
        <div className="edit-profile-field">
          <span>New Email (optional):</span>
          <input
            type="email"
            placeholder="Enter your new email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="edit-profile-input-line"
          />
        </div>
        {newEmail.trim() && (
          <div className="edit-profile-field">
            <span>Confirm New Email:</span>
            <input
              type="email"
              placeholder="Confirm your new email"
              value={confirmNewEmail}
              onChange={(e) => setConfirmNewEmail(e.target.value)}
              className="edit-profile-input-line"
            />
          </div>
        )}

        {message && <p className="edit-profile-message">{message}</p>}

        <div className="edit-profile-button-container">
          <Button
            variant="small"
            primaryText={loading ? "Saving..." : "Update"}
            onClick={handleSaveChanges}
          />
          <Button
            variant="small"
            primaryText="Cancel"
            onClick={handleCancel}
          />
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
