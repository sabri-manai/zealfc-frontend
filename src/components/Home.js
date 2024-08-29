// src/components/Home.js
import React from "react";
import Button from './Button/Button';

function Home() {
  const handleClick = (action) => {
    alert(`${action} button clicked!`);
  };
  return (
    <div>
      <h2>Home Page</h2>
      <Button text="Cancel" styleType="default" onClick={() => handleClick('Cancel')} />

      <p>Welcome to the home page!</p>
    </div>
  );
}

export default Home;
