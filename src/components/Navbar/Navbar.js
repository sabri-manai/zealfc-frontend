import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

import icon from "../../assets/icons/icon.png";
import line from "../../assets/images/line.png"; // Make sure the path is correct

function Navbar({ isAuthenticated, handleLogout }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleDropdown = (event) => {
    event.stopPropagation(); // Prevent event bubbling
    setIsExpanded((prev) => !prev);
  };

  const handleItemClick = (path) => {
    setIsExpanded(false); // Collapse the navbar
    navigate(path); // Navigate to the selected path
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsExpanded(false); // Close dropdown if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const idToken = localStorage.getItem("idToken");
      if (!idToken) {
        setError("No token found, please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/profile/user-profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${idToken}`,
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

    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated]);

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
              ref={buttonRef}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="nav-right">
            {loading ? (
              <div className="nav-item">Loading...</div>
            ) : error ? (
              <div className="nav-item">Error: {error}</div>
            ) : isAuthenticated && userData ? (
              <div className="nav-item" onClick={() => navigate("/profile")}>
                {userData.first_name}
              </div>
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
          onClick={() => setIsExpanded(false)}
        >
          <div
            className="expanded-menu"
            onClick={(e) => e.stopPropagation()}
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
