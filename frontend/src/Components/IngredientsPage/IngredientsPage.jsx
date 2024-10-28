import React, { useEffect, useState, useCallback } from "react";
import "./IngredientsPage.css";
import { Navbar } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const IngredientsPage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch("http://localhost:8090/api/ingredients")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setIngredients(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  const throttle = (func, delay) => {
    let lastCall = 0;
    return (...args) => {
      const now = Date.now();
      if (now - lastCall < delay) return;
      lastCall = now;
      return func(...args);
    };
  };

  const handleSearchChange = useCallback(
    throttle((event) => {
      setSearchQuery(event.target.value);
      setCurrentPage(1);
    }, 300),
    []
  );

  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastIngredient = currentPage * itemsPerPage;
  const indexOfFirstIngredient = indexOfLastIngredient - itemsPerPage;
  const currentIngredients = filteredIngredients.slice(
    indexOfFirstIngredient,
    indexOfLastIngredient
  );

  const handlePageChange = (direction) => {
    if (
      direction === "next" &&
      currentPage < Math.ceil(filteredIngredients.length / itemsPerPage)
    ) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo(0, 0);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <Navbar />
      <div className="ingredients-container">
        <h2 className="ingredients-title">Ingredients</h2>
        <p className="ingredients-description">
          Discover a variety of ingredients used in different recipes and
          cuisines around the world, organized for easy exploration.
        </p>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search ingredients..."
            onChange={handleSearchChange}
            className="search-bar"
          />
        </div>
        <div className="ingredients-list">
          {currentIngredients.map((ingredient) => (
            <div key={ingredient.id} className="ingredient-item">
              {ingredient.photoUrl !== "NULL" && (
                <img
                  src={ingredient.photoUrl}
                  alt={ingredient.name}
                  className="ingredient-photo"
                />
              )}
              <h3 className="ingredient-title">{ingredient.name}</h3>
              <p className="ingredient-description">{ingredient.description}</p>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>
            Page {currentPage} of{" "}
            {Math.ceil(filteredIngredients.length / itemsPerPage)}
          </span>
          <button
            onClick={() => handlePageChange("next")}
            disabled={
              currentPage >=
              Math.ceil(filteredIngredients.length / itemsPerPage)
            }
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default IngredientsPage;
