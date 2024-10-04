import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import "./UserProfilePage.css";
import { Recipe } from "../Recipe/Recipe";
import { Navbar } from "../Navbar/Navbar";

const UserProfilePage = ({ name }) => {
  return (
    <>
      <Navbar />
      <div className="user-profile-container">
        <div className="user-profile-square">
          <img
            src="https://via.placeholder.com/150"
            alt="User Profile"
            className="user-profile-image"
          />
        </div>
        <div className="user-profile-header">
          <h2 className="user-profile-name">Vali Greudeucis</h2>
          <button className="user-profile-message-button">
            <FontAwesomeIcon
              icon={faComment}
              className="user-profile-message-icon"
            />
          </button>
        </div>

        <div className="user-profile-awards">
          <h3 className="user-profile-awards-title">Contest Awards:</h3>
          <p className="user-profile-award-item">Best Chef 2023</p>
          <p className="user-profile-award-item">Top Recipe Creator</p>
        </div>

        <div className="user-profile-rank">
          <h3 className="user-profile-rank-title">Rank:</h3>
          <p className="user-profile-rank-value">#1</p>
        </div>

        <h3 className="user-profile-recipes-title">{name}Vali's Recipes:</h3>
        <div className="user-profile-recipes-container">
          <Recipe
            imgUrl="https://via.placeholder.com/300x200"
            title="Cheese Souffle"
            duration="40min"
            description="Yannick Alleno's signature dish"
          />
          <Recipe
            imgUrl="https://via.placeholder.com/300x200"
            title="Chocolate Cake"
            duration="50min"
            description="A rich chocolate dessert"
          />
          <Recipe
            imgUrl="https://via.placeholder.com/300x200"
            title="Pasta Primavera"
            duration="30min"
            description="A fresh vegetable pasta"
          />
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
