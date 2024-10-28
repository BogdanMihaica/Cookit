import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./RecipePage.css";
import { Navbar } from "../Navbar/Navbar";

const RecipePage = () => {
  const { param } = useParams();
  const id = param.split("-").pop();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:8090/api/recipes/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch the recipe");
        }
        const data = await response.json();
        setRecipe(data);

        // Fetch user data
        const userResponse = await fetch(
          `http://localhost:8090/users/${data.authorId}`
        );
        if (!userResponse.ok) {
          throw new Error("Failed to fetch the user");
        }
        const userData = await userResponse.json();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);
  function replaceSpaces(str) {
    return str.replace(/ /g, "-");
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const formatCookingSteps = (steps) => {
    if (typeof steps !== "string") {
      return [steps];
    }

    return steps.split("|").map((step, index) => {
      const colonIndex = step.indexOf(":");
      if (colonIndex !== -1) {
        const beforeColon = step.slice(0, colonIndex + 1);
        const afterColon = step.slice(colonIndex + 1);
        return (
          <span key={index}>
            <strong>{beforeColon}</strong>
            <br />
            {afterColon.trim()}
          </span>
        );
      }
      return step;
    });
  };

  return (
    <>
      <Navbar />
      <div className="recipe-page-container">
        <h1 className="recipe-page-title">{recipe.title}</h1>
        <img src={recipe.photo} alt="Recipe" className="recipe-page-image" />
        <div className="recipe-page-info">
          <div className="recipe-page-info-item">
            <span className="recipe-page-info-label">Rating:</span>{" "}
            {recipe.rating}/5
          </div>
          <div className="recipe-page-info-item">
            <span className="recipe-page-info-label">Prep Time:</span>{" "}
            {recipe.preparationTime}
          </div>
          <div className="recipe-page-info-item">
            <span className="recipe-page-info-label">Serves:</span>{" "}
            {recipe.servings}
          </div>
          {user && (
            <div className="recipe-page-info-item">
              <span className="recipe-page-info-label">Published by:</span>{" "}
              <a
                href={`/user/${user.username}`}
                className="user-link"
                style={{ color: "red" }}
              >
                {user.username}{" "}
              </a>
            </div>
          )}
        </div>
        <div className="recipe-page-content">
          <p className="recipe-page-description">{recipe.description}</p>
          <h2 className="recipe-page-subtitle">Ingredients</h2>
          <ul className="recipe-page-list ingredients">
            {recipe.ingredients
              .split("|")
              .filter((ingredient) => ingredient.trim() !== "") // Filter out empty ingredients
              .map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
          </ul>
          <h2 className="recipe-page-subtitle">How to Cook It</h2>
          <ol className="recipe-page-list">
            {formatCookingSteps(recipe.howToCook).map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
        <button
          className="recipe-page-back-button"
          onClick={() => (window.location.href = "/")}
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="recipe-page-back-icon"
          />
          Back to Home
        </button>
      </div>
    </>
  );
};

export default RecipePage;
