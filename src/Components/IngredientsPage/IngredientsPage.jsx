import React from "react";
import "./IngredientsPage.css";
import { Navbar } from "../Navbar/Navbar";

const IngredientsPage = () => {
  return (
    <>
      <Navbar />
      <div className="ingredients-container">
        <h2 className="ingredients-title">Ingredients</h2>
        <p className="ingredients-description">
          Discover a variety of ingredients used in different recipes and
          cuisines around the world, organized for easy exploration.
        </p>

        <div className="ingredients-list">
          <div className="ingredient-item">
            <h3 className="ingredient-title">Tomato</h3>
            <p className="ingredient-description">
              A versatile ingredient, used in salads, sauces, and much more.
              Tomatoes are rich in vitamins and add flavor to any dish.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default IngredientsPage;
