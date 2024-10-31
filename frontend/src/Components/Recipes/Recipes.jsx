import React, { useEffect, useState } from "react";
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
    category: "Dinner",
  },
  {
    imgUrl: salmon,
    title: "Salmon Pizza",
    duration: "30 mins",
    description: "Tasty salmon pizza with fresh ingredients.",
    category: "Lunch",
  },
  {
    imgUrl: cheese,
    title: "Cheese Souffle",
    duration: "45 mins",
    description: "Fluffy and cheesy soufflé.",
    category: "Dessert",
  },
];

const Recipes = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const recipesPerPage = 12;
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8090/api/recipes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setRecipes(Array.from(new Set(data)));
        setCategories(
          Array.from(new Set(data.map((recipe) => recipe.category))).sort()
        );
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategories(
      (prevCategories) =>
        prevCategories.includes(category)
          ? prevCategories.filter((c) => c !== category) // Remove category if already selected
          : [...prevCategories, category] // Add category if not selected
    );
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(recipe.category);
    return matchesSearch && matchesCategory;
  });

  const displayedRecipes = filteredRecipes.slice(
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
            {displayedRecipes
              .filter((recipe, index) => recipe.status === true)
              .map((recipe, index) => (
                <Recipe
                  key={index}
                  {...recipe}
                  imgUrl={recipe.photo}
                  duration={recipe.preparationTime}
                />
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
