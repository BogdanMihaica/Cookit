import React, { useEffect, useState } from "react";
import { replace, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import "./UserProfilePage.css";
import { Recipe } from "../Recipe/Recipe";
import { Navbar } from "../Navbar/Navbar";

const UserProfilePage = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  function replaceSpaces(str) {
    //return str.replace(/-/g, " ");
    return str;
  }
  useEffect(() => {
    const fetchData = async () => {
      let userId;

      const token = sessionStorage.getItem("jwt");
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        userId = payload.sub;
      }

      const url = username
        ? `http://localhost:8090/users/username/${replaceSpaces(username)}`
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
  }, [username]);

  if (!userData) return <div>Loading...</div>; // Show a loading state

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
          <button className="user-profile-message-button">
            <FontAwesomeIcon
              icon={faComment}
              className="user-profile-message-icon"
            />
          </button>
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
          {/* Replace this with actual recipe data if available */}
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
