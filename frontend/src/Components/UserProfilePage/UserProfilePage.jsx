import React, { useEffect, useState } from "react";
import { replace, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import "./UserProfilePage.css";
import { Recipe } from "../Recipe/Recipe";
import { Navbar } from "../Navbar/Navbar";

const UserProfilePage = () => {
  const { usernameParam } = useParams();
  const [userData, setUserData] = useState(null);
  const [userRecipes, setUserRecipes] = useState([]);
  const [username, setUserName] = useState("");
  const recipesPerPage = 4;
  const [currentPage, setCurrentPage] = useState(0);
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    if (userData != null) {
      const fetchUserRecipes = async () => {
        fetch("http://localhost:8090/api/recipes")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setUserRecipes(
              data.filter((recipe) => recipe.authorId === userData.id)
            );
          })

          .catch((error) => {
            console.error(
              "There was a problem with the fetch operation:",
              error
            );
          });
      };
      fetchUserRecipes();
    }
  }, [userData]);
  useEffect(() => {
    console.log(userRecipes);
  }, [userRecipes]);
  useEffect(() => {
    const fetchData = async () => {
      let userId;

      const token = sessionStorage.getItem("jwt");
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        userId = payload.sub;
      }
      console.log(userId);
      const url = usernameParam
        ? `http://localhost:8090/users/username/${usernameParam}`
        : `http://localhost:8090/users/username/${userId}`;

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        console.error("Failed to fetch user data");
      }
    };

    fetchData();
  }, [usernameParam]);

  if (!userData) return <div>Loading...</div>; // Show a loading state
  const displayedRecipes = userRecipes.slice(
    currentPage * recipesPerPage,
    (currentPage + 1) * recipesPerPage
  );
  return (
    <>
      <Navbar />
      <div className="user-profile-container">
        <div className="user-profile-square">
          <img
            src={userData.photoUrl || "https://via.placeholder.com/150"}
            alt="User Profile"
            className="user-profile-image"
          />
        </div>
        <div className="user-profile-header">
          <h2 className="user-profile-name">{userData.username}</h2>
          {usernameParam || usernameParam !== userData.username ? (
            <button className="user-profile-message-button">
              <FontAwesomeIcon
                icon={faComment}
                className="user-profile-message-icon"
              />
            </button>
          ) : null}
        </div>

        <div className="user-profile-awards">
          <h3 className="user-profile-awards-title">Contest Awards:</h3>
          {/* Add your awards mapping here if needed */}
        </div>

        <div className="user-profile-rank">
          <h3 className="user-profile-rank-title">Rank:</h3>
          <p className="user-profile-rank-value">{userData.userRank}</p>
        </div>

        <h3 className="user-profile-recipes-title">
          {userData.username}'s Recipes:
        </h3>
        <div className="user-profile-recipes-container">
          <div className="recipes-list">
            {displayedRecipes.map((recipe, index) => (
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

export default UserProfilePage;
