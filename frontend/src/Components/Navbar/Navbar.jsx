import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import logo from "../../logo.png";
import { Popup } from "../Authentication/Login/Login";
import { MessageSidebar } from "../MessageSidebar/MessageSidebar";

export const Navbar = ({ messageOpen = false }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const jwtToken = sessionStorage.getItem("jwt");
  const [isMessagesOpen, setIsMessagesOpen] = useState(messageOpen);
  const togglePopup = () => setPopupOpen(!isPopupOpen);
  const toggleProfileDropdown = () =>
    setProfileDropdownOpen(!isProfileDropdownOpen);

  const handleSignOut = () => {
    sessionStorage.removeItem("jwt");
    window.location.reload(); // Reload to update the UI after sign-out
  };
  const spawnMessages = () => {
    if (isMessagesOpen) {
      return (
        <>
          <MessageSidebar />
          <div className="close-sidebar" onClick={handleOpenMessages}>
            <FontAwesomeIcon icon={faArrowLeft} className="arrow" />
          </div>
        </>
      );
    } else return <></>;
  };
  const handleOpenMessages = () => {
    setIsMessagesOpen(!isMessagesOpen);
  };
  return (
    <>
      <div id="menuDemo">
        <div id="cssmenu">
          <div className="logo">
            <a href="/">
              <img src={logo} alt="Logo" />
            </a>
          </div>
          <div id="searchBarContainer">
            <input
              type="text"
              id="searchBar"
              placeholder="Search for a recipe"
            />
            <button id="searchButton">
              <FontAwesomeIcon icon={faSearch} className="magnifying-glass" />
            </button>
          </div>
          <ul>
            <li>
              <span>
                Recipes <i className="arrow"></i>
              </span>
              <ul className="dropdown">
                <li>
                  <a href="/recipes">All Recipes</a>
                </li>
                <li>
                  <a href="/">Your Favourite Recipes</a>
                </li>
              </ul>
            </li>
            <li>
              <span>
                Interactive <i className="arrow"></i>
              </span>
              <ul className="dropdown">
                <li>
                  <a href="/contests">Contests</a>
                </li>
                <li>
                  <a href="/techniques">Cooking techniques</a>
                </li>
                <li>
                  <a href="/fact">Fact of the day</a>
                </li>
                <li>
                  <a href="/ingredients">Ingredients</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li className="sign">
              {jwtToken ? (
                <span onClick={toggleProfileDropdown}>
                  Profile <i className="arrow"></i>
                </span>
              ) : (
                <span onClick={togglePopup}>Sign in/up</span>
              )}
              {jwtToken && isProfileDropdownOpen && (
                <ul className="dropdown">
                  <li>
                    <a href="/profile">View Profile</a>
                  </li>
                  <li onClick={handleOpenMessages}>
                    <span>Messages</span>
                  </li>
                  <li>
                    <a href="/settings">Settings</a>
                  </li>
                  <li>
                    <span onClick={handleSignOut}>Sign out</span>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
        <Popup isOpen={isPopupOpen} onClose={togglePopup} />
      </div>
      {spawnMessages()}
    </>
  );
};
