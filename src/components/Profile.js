// src/components/Profile.js
import React from "react";
// import styles from '../styles/Profile.css';
import Button from './Button/Button';

function Profile() {
  const handleClick = (action) => {
    alert(`${action} button clicked!`);
  };

  return (
    <div style={{ backgroundColor: "#0f0326", padding: "20px", textAlign: "center" }}>
      <Button text="Cancel" styleType="default" onClick={() => handleClick('Cancel')} />
      {/* <Button text="Delete" styleType="danger" onClick={() => handleClick('Delete')} />
      <Button text="Save" styleType="primary" onClick={() => handleClick('Save')} /> */}
    </div>
  );
}

export default Profile;
