import React, { useEffect, useState } from "react";
import "./CookingTechniques.css";
import { Navbar } from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const CookingTechniques = () => {
  const [techniques, setTechniques] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8090/api/techniques")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const sortedTechniques = data.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        setTechniques(sortedTechniques);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="techniques-container">
        <h2 className="techniques-title">Cooking Techniques</h2>
        <p className="techniques-description">
          Here you can explore and learn most of the techniques used in various
          kitchens, ordered alphabetically!
        </p>

        <div className="techniques-list">
          {techniques.map((technique) => (
            <div key={technique.id} className="technique-item">
              <h3 className="technique-title">{technique.title}</h3>
              <p className="technique-description">{technique.description}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CookingTechniques;
