import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faHeart } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

import { Popup } from "./Login";

export const Navbar = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  return (
    <div id="menuDemo">
      <div id="cssmenu">
        <div className="logo">
          <a href="/">
            {/* Anchor to homepage */}
            <img src="logo.png" alt="Logo" />
          </a>
        </div>
        <div id="searchBarContainer">
          <input type="text" id="searchBar" placeholder="Search for a recipe" />
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
            <a href="#" onClick={togglePopup}>
              Sign in/up
            </a>
          </li>
        </ul>
      </div>
      <Popup isOpen={isPopupOpen} onClose={togglePopup} />
    </div>
  );
};

// Popup Component
