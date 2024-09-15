import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

import icon from "../../assets/icons/icon.png";
import line from "../../assets/images/line.png"; // Make sure to adjust the path

function Navbar({ isAuthenticated, handleLogout }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null); // Reference to the button

  const toggleDropdown = (event) => {
    event.stopPropagation(); // Prevent the event from bubbling up to the document
    setIsExpanded((prev) => !prev); // Toggle the dropdown state
  };

  const handleItemClick = (path) => {
    setIsExpanded(false); // Collapse the navbar when an item is clicked
    navigate(path); // Navigate to the clicked path
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsExpanded(false); // Close dropdown if clicked outside and not on the button
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const idToken = localStorage.getItem("idToken");
      if (!idToken) {
        setError("No token found, please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/profile/user-profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${idToken}`, // Ensure token is correctly formatted
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className={`navbar ${isExpanded ? "expanded" : ""}`}>
        <div className="navbar-container">
          <div className="nav-left">
            <div className="nav-item" onClick={() => navigate("/")}>
              ZEAL
            </div>
          </div>
          <div className="nav-center">
            <img
              src={icon}
              alt="Icon"
              className="nav-icon"
              onClick={toggleDropdown}
              ref={buttonRef} // Attach the reference to the button
              style={{ cursor: "pointer" }} // Add cursor pointer to indicate it's clickable
            />
          </div>
          <div className="nav-right">
            {isAuthenticated ? (
              <>
                <div className="nav-item" onClick={() => navigate("/profile")}>
                  {userData ? userData.first_name : "User"}
                </div>
              </>
            ) : (
              <>
                <div className="nav-item">
                  <Link to="/login">Login</Link>
                </div>
                <div className="nav-item">
                  <Link to="/register">Register</Link>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
      {isExpanded && (
        <div
          className="dropdown-overlay"
          ref={dropdownRef}
          onClick={() => setIsExpanded(false)} // Close dropdown if overlay is clicked
        >
          <div
            className="expanded-menu"
            onClick={(e) => e.stopPropagation()} // Prevent the dropdown from closing when clicking inside
          >
            <div className="line">
              <img src={line} alt="Line" className="line-img" />
            </div>
            <div
              className="dropdown-item"
              onClick={() => handleItemClick("/about")}
            >
              ABOUT US
            </div>
            <div
              className="dropdown-item"
              onClick={() => handleItemClick("/choose-game")}
            >
              CHOOSE A GAME
            </div>
            {isAuthenticated && (
              <>
                <div
                  className="dropdown-item"
                  onClick={() => handleItemClick("/profile")}
                >
                  PROFILE
                </div>
                <div className="dropdown-item" onClick={handleLogout}>
                  LOG OUT
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
