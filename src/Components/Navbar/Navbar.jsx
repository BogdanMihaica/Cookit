import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => {
  return (
    <div id="menuDemo">
      <div id="cssmenu">
        <div className="logo">
          <a href="/">
            {" "}
            {/* Anchor to homepage */}
            <img src="logo.png" alt="Logo" />
          </a>
        </div>
        <ul>
          <li>
            <span>
              Recipes <i className="arrow"></i>
            </span>
            <ul className="dropdown">
              <li>
                <a href="/">Official Recipes</a>
              </li>
              <li>
                <a href="/">Community Recipes</a>
              </li>
            </ul>
          </li>
          <li>
            <span>
              Interactive<i className="arrow"></i>
            </span>
            <ul className="dropdown">
              <li>
                <a href="/">Contests</a>
              </li>
              <li>
                <a href="/">Cooking techniques</a>
              </li>
              <li>
                <a href="/">Facts</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="/">Contact</a>
          </li>
        </ul>
        {/* Move search bar outside the ul to ensure it appears below */}
        <div id="searchBarContainer">
          <input type="text" id="searchBar" placeholder="Search for a recipe" />
          <button id="searchButton">
            <FontAwesomeIcon icon={faSearch} className="magnifying-glass" />
          </button>
        </div>
      </div>
    </div>
  );
};
