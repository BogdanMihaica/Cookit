import React, { useState } from "react";
import beefWellington from "../../Home-food/beefwellington.webp";
import salmon from "../../Home-food/salmonpizza.jpg";
import cheese from "../../Home-food/cheesesouffle.jpg";
import "./Recipes.css";
import { Recipe } from "../Recipe/Recipe";
import { Navbar } from "../Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const sampleRecipes = [
  {
    imgUrl: beefWellington,
    title: "Beef Wellington",
    duration: "1 hour",
    description: "Delicious beef wrapped in pastry.",
  },
  {
    imgUrl: salmon,
    title: "Salmon Pizza",
    duration: "30 mins",
    description: "Tasty salmon pizza with fresh ingredients.",
  },
  {
    imgUrl: cheese,
    title: "Cheese Souffle",
    duration: "45 mins",
    description: "Fluffy and cheesy soufflé.",
  },
  {
    imgUrl: cheese,
    title: "Cheese Souffle",
    duration: "45 mins",
    description: "Fluffy and cheesy soufflé.",
  },
  {
    imgUrl: cheese,
    title: "Cheese Souffle",
    duration: "45 mins",
    description: "Fluffy and cheesy soufflé.",
  },
  {
    imgUrl: cheese,
    title: "Cheese Souffle",
    duration: "45 mins",
    description: "Fluffy and cheesy soufflé.",
  },
  {
    imgUrl: cheese,
    title: "Cheese Souffle",
    duration: "45 mins",
    description: "Fluffy and cheesy soufflé.",
  },
  {
    imgUrl: cheese,
    title: "Cheese Souffle",
    duration: "45 mins",
    description: "Fluffy and cheesy soufflé.",
  },
  {
    imgUrl: cheese,
    title: "Cheese Souffle",
    duration: "45 mins",
    description: "Fluffy and cheesy soufflé.",
  },
  {
    imgUrl: cheese,
    title: "Cheese Souffle",
    duration: "45 mins",
    description: "Fluffy and cheesy soufflé.",
  },
  {
    imgUrl: cheese,
    title: "Cheese Souffle",
    duration: "45 mins",
    description: "Fluffy and cheesy soufflé.",
  },
  {
    imgUrl: cheese,
    title: "Cheese Souffle",
    duration: "45 mins",
    description: "Fluffy and cheesy soufflé.",
  },
  {
    imgUrl: cheese,
    title: "Cheese Souffle",
    duration: "45 mins",
    description: "Fluffy and cheesy soufflé.",
  },
  {
    imgUrl: cheese,
    title: "Cheese Souffle",
    duration: "45 mins",
    description: "Fluffy and cheesy soufflé.",
  },
  {
    imgUrl: cheese,
    title: "Cheese Souffle",
    duration: "45 mins",
    description: "Fluffy and cheesy soufflé.",
  },
];

const Recipes = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const recipesPerPage = 12;
  const categories = [
    "Appetizer",
    "Asian",
    "Baked Good",
    "Bread",
    "Brunch",
    "Cake",
    "Cocktail",
    "Condiment",
    "Dessert",
    "Drink",
    "Easy Recipe",
    "Frozen Dessert",
    "Grain",
    "Healthy Recipe",
    "Holiday Recipe",
    "Instant Pot Recipe",
    "International Cuisine",
    "Italian",
    "Main Course",
    "Meat",
    "Mediterranean",
    "Mexican",
    "Non-Alcoholic Beverage",
    "One-Pot Meal",
    "Pasta",
    "Pie",
    "Poultry",
    "Quick Recipe",
    "Salad",
    "Sauce",
    "Seafood",
    "Side Dish",
    "Slow Cooker Recipe",
    "Smoothie",
    "Snack",
    "Special Occasion Recipe",
    "Stew",
    "Vegetarian",
    "Vegan",
  ];
  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((c) => c !== category); // Remove category if already selected
      } else {
        return [...prevCategories, category]; // Add category if not selected
      }
    });
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const displayedRecipes = sampleRecipes.slice(
    currentPage * recipesPerPage,
    (currentPage + 1) * recipesPerPage
  );

  return (
    <>
      <Navbar />
      <div className="recipes-full">
        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for a specific recipe"
            className="search-bar"
          />
          <button className="search-button">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </button>
        </div>

        <div className="category-buttons">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-button ${
                selectedCategories.includes(category) ? "selected" : ""
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="recipes-container">
          <div className="recipes-list">
            {displayedRecipes.map((recipe, index) => (
              <Recipe key={index} {...recipe} />
            ))}
          </div>
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 0}>
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={displayedRecipes.length < recipesPerPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recipes;
