import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./ContestPage.css";
import { Navbar } from "../Navbar/Navbar";

const ContestPage = () => {
  return (
    <>
      <Navbar />
      <div className="contest-page-container">
        <h1 className="contest-page-title">Contest Title</h1>
        <img
          src="https://via.placeholder.com/800x400"
          alt="Contest"
          className="contest-page-image"
        />

        <div className="contest-page-info">
          <div className="contest-page-info-item">
            <span className="contest-page-info-label">Difficulty:</span>{" "}
            Intermediate
          </div>
        </div>

        <div className="contest-page-content">
          <p className="contest-page-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            facilisi. Donec lacinia.
          </p>

          <h2 className="contest-page-subtitle">Current Contestants</h2>
          <div className="contest-page-contestants">
            <div className="contestant-circle">A</div>
            <div className="contestant-circle">B</div>
            <div className="contestant-circle">C</div>
          </div>
        </div>

        <div className="contest-page-comments">
          <h2 className="contest-page-subtitle">Comments</h2>
          <textarea
            className="contest-page-comment-box"
            placeholder="Leave a comment..."
          />
          <button className="contest-page-comment-button">Submit</button>
        </div>

        <button
          className="contest-page-back-button"
          onClick={() => (window.location.href = "/")}
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="contest-page-back-icon"
          />{" "}
          Back to Home
        </button>
      </div>
    </>
  );
};

export default ContestPage;
