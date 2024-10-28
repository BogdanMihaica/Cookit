import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import logo from "./../../../src/logo.png";
import { Popup } from "./Login";

export const Navbar = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const jwtToken = sessionStorage.getItem("jwt"); // Check for JWT in session storage

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  return (
    <div id="menuDemo">
      <div id="cssmenu">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="Logo" />
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
            <a
              href={jwtToken ? "/profile" : "#"}
              onClick={jwtToken ? undefined : togglePopup}
            >
              {jwtToken ? "Profile" : "Sign in/up"}
            </a>
          </li>
        </ul>
      </div>
      <Popup isOpen={isPopupOpen} onClose={togglePopup} />
    </div>
  );
};
