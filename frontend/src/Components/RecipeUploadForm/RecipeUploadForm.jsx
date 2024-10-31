import React, { useState } from "react";
import axios from "axios";
import "./RecipeUploadForm.css";
import { Navbar } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../config/firebaseConfig";
import { getUser } from "../../config/getLoggedUser";

const RecipeUploadForm = () => {
  const [formData, setFormData] = useState({
    authorId: "",
    title: "",
    description: "",
    photo: null,
    ingredients: "",
    rating: "0",
    category: "",
    preparationTime: "",
    servings: "",
    howToCook: "",
    status: "0",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] }); // Set the file directly
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let photoUrl = "";
      if (formData.photo) {
        const storageRef = ref(
          storage,
          `images/recipes/${formData.photo.name}`
        ); // Use file name
        const metadata = {
          contentType: formData.photo.type,
        };
        await uploadBytes(storageRef, formData.photo, metadata);
        photoUrl = await getDownloadURL(storageRef);
      }

      const token = sessionStorage.getItem("jwt");
      const user = await getUser();

      if (user) {
        const dataToSend = {
          ...formData,
          authorId: user.id,
          status: false,
          photo: photoUrl,
        };

        const response = await fetch("http://localhost:8090/api/recipes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataToSend),
        });

        if (response.ok) {
          alert("Recipe uploaded successfully!");
          setFormData({
            authorId: "",
            title: "",
            description: "",
            photo: null,
            ingredients: "",
            rating: "0",
            category: "",
            preparationTime: "",
            servings: "",
            howToCook: "",
            status: false,
          });
        } else {
          console.error("Error uploading recipe:", response.statusText);
          alert("Failed to upload recipe. Please try again.");
        }
      } else {
        console.error("Error uploading recipe: invalid user");
        alert("Failed to upload recipe. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading recipe:", error);
      alert("Failed to upload recipe. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit} className="recipe-upload-form">
        <h2>Upload a Recipe</h2>
        <div className="form-group">
          <label>
            <FontAwesomeIcon icon={faPencilAlt} /> Title:
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>
            <FontAwesomeIcon icon={faPencilAlt} /> Description:
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group photo-upload">
          <label>
            <FontAwesomeIcon icon={faCamera} /> Photo:
          </label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>
            <FontAwesomeIcon icon={faPencilAlt} /> Ingredients:
          </label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Preparation Time:</label>
          <input
            type="text"
            name="preparationTime"
            value={formData.preparationTime}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Servings:</label>
          <input
            type="text"
            name="servings"
            value={formData.servings}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>How to Cook:</label>
          <textarea
            name="howToCook"
            value={formData.howToCook}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Submit Recipe
        </button>
      </form>
      <Footer />
    </>
  );
};

export default RecipeUploadForm;
