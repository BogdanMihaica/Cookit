import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import salmon from "../../Home-food/salmonpizza.jpg";
import "./RecipePage.css";
import { Navbar } from "../Navbar/Navbar";

const RecipePage = () => {
  return (
    <>
      <Navbar />
      <div className="recipe-page-container">
        <h1 className="recipe-page-title">Recipe Title</h1>
        <img src={salmon} alt="Recipe" className="recipe-page-image" />

        <div className="recipe-page-info">
          <div className="recipe-page-info-item">
            <span className="recipe-page-info-label">Rating:</span> 4.5/5
          </div>
          <div className="recipe-page-info-item">
            <span className="recipe-page-info-label">Prep Time:</span> 30 mins
          </div>
          <div className="recipe-page-info-item">
            <span className="recipe-page-info-label">Serves:</span> 4 people
          </div>
        </div>

        <div className="recipe-page-content">
          <p className="recipe-page-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            facilisi. Donec lacinia.
          </p>

          <h2 className="recipe-page-subtitle">Ingredients</h2>
          <ul className="recipe-page-list">
            <li>1 cup flour</li>
            <li>2 eggs</li>
            <li>1/2 cup sugar</li>
            <li>1/4 cup milk</li>
          </ul>

          <h2 className="recipe-page-subtitle">How to Cook It</h2>
          <ol className="recipe-page-list">
            <li>Mix all ingredients together.</li>
            <li>Bake at 350°F for 25 minutes.</li>
            <li>Let cool and serve.</li>
          </ol>
        </div>

        <button
          className="recipe-page-back-button"
          onClick={() => (window.location.href = "/")}
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="recipe-page-back-icon"
          />{" "}
          Back to Home
        </button>
      </div>
    </>
  );
};

export default RecipePage;
