import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import icon from "../../assets/icons/icon.png";
import line from "../../assets/images/line.png";

function Navbar({ isAuthenticated, handleLogout, onUserFetch, refreshTokens }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  const handleItemClick = (path) => {
    setIsExpanded(false);
    navigate(path);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      let idToken = localStorage.getItem("idToken");
      if (!idToken) {
        setError("No token found, please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/profile/user-profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${idToken}`,
            "Content-Type": "application/json",
          },
        });

        // Check if token is expired
        if (response.status === 401) {
          const tokenRefreshed = await refreshTokens();
          if (tokenRefreshed) {
            // Retry fetching user data with the new token
            idToken = localStorage.getItem("idToken");
            const retryResponse = await fetch(`${process.env.REACT_APP_API_URL}/profile/user-profile`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${idToken}`,
                "Content-Type": "application/json",
              },
            });
            if (!retryResponse.ok) {
              throw new Error("Failed to fetch user data after token refresh");
            }
            const data = await retryResponse.json();
            setUserData(data);
            if (onUserFetch) {
              onUserFetch(data); // Callback to pass user data back to parent component
            }
          } else {
            handleLogout(); // Logout if refresh token fails
          }
        } else {
          const data = await response.json();
          setUserData(data);
          if (onUserFetch) {
            onUserFetch(data); // Callback to pass user data back to parent component
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchUserData();
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAuthenticated, onUserFetch, refreshTokens]); // Added refreshTokens as a dependency

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
            {isAuthenticated ? (
              <>
                <div className="nav-item" onClick={() => navigate("/profile")}>
                  {userData ? userData.first_name : "Loading..."} {/* Show Loading if userData is not yet available */}
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
        <div className="dropdown-overlay" ref={dropdownRef} onClick={() => setIsExpanded(false)}>
          <div className="expanded-menu" onClick={(e) => e.stopPropagation()}>
            <div className="line">
              <img src={line} alt="Line" className="line-img" />
            </div>
            <div className="dropdown-item" onClick={() => handleItemClick("/about")}>
              ABOUT US
            </div>
            <div className="dropdown-item" onClick={() => handleItemClick("/choose-game")}>
              CHOOSE A GAME
            </div>
            {isAuthenticated && (
              <>
                <div className="dropdown-item" onClick={() => handleItemClick("/profile")}>
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
