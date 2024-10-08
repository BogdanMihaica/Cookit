import React from "react";
import "./CookingTechniques.css";
import { Navbar } from "../Navbar/Navbar";

const CookingTechniques = () => {
  return (
    <>
      <Navbar />
      <div className="techniques-container">
        <h2 className="techniques-title">Cooking Techniques</h2>
        <p className="techniques-description">
          Here you can explore and learn most of the techniques used in various
          kitchens, ordered alphabetically!
        </p>

        <div className="techniques-list">
          <div className="technique-item">
            <h3 className="technique-title">Baking</h3>
            <p className="technique-description">
              Baking is a cooking method that uses dry heat, typically in an
              oven, to cook food.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookingTechniques;
