import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import "./RecipePage.css";
import { Navbar } from "../Navbar/Navbar";
import unselected1 from "./../../../src/rating-faces/1_unselected.png";
import hover1 from "./../../../src/rating-faces/1_hover.png";
import active1 from "./../../../src/rating-faces/1_active.png";

import unselected2 from "./../../../src/rating-faces/2_unselected.png";
import hover2 from "./../../../src/rating-faces/2_hover.png";
import active2 from "./../../../src/rating-faces/2_active.png";

import unselected3 from "./../../../src/rating-faces/3_unselected.png";
import hover3 from "./../../../src/rating-faces/3_hover.png";
import active3 from "./../../../src/rating-faces/3_active.png";

import unselected4 from "./../../../src/rating-faces/4_unselected.png";
import hover4 from "./../../../src/rating-faces/4_hover.png";
import active4 from "./../../../src/rating-faces/4_active.png";

import unselected5 from "./../../../src/rating-faces/5_unselected.png";
import hover5 from "./../../../src/rating-faces/5_hover.png";
import active5 from "./../../../src/rating-faces/5_active.png";

const RecipePage = () => {
  const { param } = useParams();
  const id = param.split("-").pop();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [reviewsPage, setReviewsPage] = useState(0);
  const reviewsPerPage = 5;
  const [displayedReviews, setDisplayedReviews] = useState([]);

  const handleNextReviewPage = () => {
    if ((reviewsPage + 1) * reviewsPerPage < reviews.length) {
      setReviewsPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousReviewPage = () => {
    if (reviewsPage > 0) {
      setReviewsPage((prevPage) => prevPage - 1);
    }
  };
  const [ratingFaces, setRatingFaces] = useState([
    unselected1,
    unselected2,
    unselected3,
    unselected4,
    unselected5,
  ]);
  const [reviewText, setReviewText] = useState("");
  const [hoverIndex, setHoverIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [sortOrder, setSortOrder] = useState("best-to-worst");

  const [reviews, setReviews] = useState([]);
  const updateRecipe = async (id, value) => {
    const response = await fetch("http://localhost:8090/api/recipes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, value }),
    });

    if (response.ok) {
      const updatedRecipe = await response.json();
      console.log("Recipe updated successfully:", updatedRecipe);
    } else {
      console.error("Failed to update recipe:", response.statusText);
    }
  };
  const handlePublishReview = async () => {
    if (activeIndex === null || reviewText === "") {
      if (activeIndex === null) {
        alert("You must provide a rating!");
      } else {
        alert(
          "Please describe your rating choice by writing a meaningful text!"
        );
      }
    } else {
      const token = sessionStorage.getItem("jwt");
      let username;
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        username = payload.sub;
      }

      const existingReview = reviews.find(
        (review) => review.authorUsername === username
      );

      if (existingReview) {
        alert("You have already submitted a review for this recipe!");
        return;
      }

      let uid;
      const url = `http://localhost:8090/users/username/${username}`;
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          uid = data.id;
          const requestBody = {
            authorId: uid,
            recipeId: id,
            text: reviewText,
            value: activeIndex + 1,
            authorUsername: username,
          };

          return fetch("http://localhost:8090/reviews", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          });
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to submit review");
          }
          return response.json();
        })
        .then(() => {
          alert("Review submitted successfully!");
          setReviewText("");
          const updateRequestBody = {
            id: id,
            value: activeIndex + 1,
          };

          updateRecipe(updateRequestBody.id, updateRequestBody.value);
          setActiveIndex(null);
          fetchReviews();
        })
        .catch((error) => {
          console.error("Error submitting review:", error);
        });
    }
  };
  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:8090/reviews/${id}`);
      if (!response.ok) throw new Error("Failed to fetch reviews");
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
  useEffect(() => {
    if (reviews != null)
      setDisplayedReviews(
        reviews.slice(
          reviewsPage * reviewsPerPage,
          (reviewsPage + 1) * reviewsPerPage
        )
      );
  }, [reviewsPage, reviews]);
  const displayRatingFaces = () => {
    const faces = [
      { unselected: unselected1, hover: hover1, active: active1 },
      { unselected: unselected2, hover: hover2, active: active2 },
      { unselected: unselected3, hover: hover3, active: active3 },
      { unselected: unselected4, hover: hover4, active: active4 },
      { unselected: unselected5, hover: hover5, active: active5 },
    ];

    return faces.map((face, index) => {
      const isHovered = index === hoverIndex;
      const isActive = index === activeIndex;
      const imgSrc = isActive
        ? face.active
        : isHovered
        ? face.hover
        : face.unselected;

      return (
        <img
          key={index}
          src={imgSrc}
          alt={`Rating ${index + 1}`}
          className="rating-face"
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
          onClick={() => setActiveIndex(index)}
        />
      );
    });
  };
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

        fetchReviews();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);
  const sortReviews = (order) => {
    return [...reviews].sort((a, b) => {
      if (order === "best-to-worst") {
        return b.value - a.value; // Assuming rating is a property of review
      } else {
        return a.value - b.value;
      }
    });
  };
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    setReviewsPage(0);
  };
  useEffect(() => {
    const sortedReviews = sortReviews(sortOrder);
    const startIndex = reviewsPage * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;
    setDisplayedReviews(sortedReviews.slice(startIndex, endIndex));
  }, [sortOrder, reviews, reviewsPage]);
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
  const reviewPostContainer = () => {
    const token = sessionStorage.getItem("jwt");
    return (
      <>
        {token ? (
          <div className="review-container">
            <h2 className="recipe-page-subtitle">Write a review</h2>
            <div className="rating-faces">{displayRatingFaces()}</div>
            <textarea
              className="review-textarea"
              placeholder="Write your review here..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <button className="publish-button" onClick={handlePublishReview}>
              Publish
            </button>
          </div>
        ) : (
          <p>Please log in to write a review.</p>
        )}
      </>
    );
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
        {reviewPostContainer()}
        <div className="reviews-container">
          <h2 className="recipe-page-subtitle">Reviews</h2>
          <label htmlFor="sort-reviews">Sort reviews:</label>
          <select
            id="sort-reviews"
            value={sortOrder}
            onChange={handleSortChange}
            className="select-input"
          >
            <option value="best-to-worst">Best to Worst</option>
            <option value="worst-to-best">Worst to Best</option>
          </select>
          {displayedReviews.length > 0 ? (
            displayedReviews.map((review) => (
              <div key={review.id} className="review-item">
                <div className="review-author">
                  <strong>
                    <a
                      className="user-link"
                      style={{ color: "black", marginLeft: 0 }}
                      href={`http://localhost:3000/user/${review.authorUsername}`}
                    >
                      {review.authorUsername}
                    </a>
                  </strong>
                </div>
                <div className="review-rating">
                  <div
                    className="review-rating"
                    style={{ marginLeft: ".3rem" }}
                  >
                    {[...Array(5)].map((_, index) => (
                      <FontAwesomeIcon
                        key={index}
                        icon={index < review.value ? solidStar : regularStar}
                        className="review-star"
                        style={{ color: "#e3c920" }}
                      />
                    ))}
                  </div>
                </div>
                <p>{review.text}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
          <div className="pagination">
            <button
              onClick={handlePreviousReviewPage}
              disabled={reviewsPage === 0}
            >
              Previous
            </button>
            <button
              onClick={handleNextReviewPage}
              disabled={displayedReviews.length < reviewsPerPage}
            >
              Next
            </button>
          </div>
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
        <button
          className="recipe-page-back-button"
          onClick={() => (window.location.href = "/recipes")}
        >
          <FontAwesomeIcon icon={faArrowUp} className="recipe-page-back-icon" />
          See more recipes
        </button>
      </div>
    </>
  );
};

export default RecipePage;
