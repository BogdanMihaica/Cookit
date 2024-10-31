import React, { useState, useEffect } from "react";
import "./FactOfTheDay.css";
import { Navbar } from "../Navbar/Navbar";

const FactOfTheDay = () => {
  const [fact, setFact] = useState("");
  const category = { category: "Food" };
  useEffect(() => {
    fetch("https://api.fungenerators.com/fact/fod/Food")
      .then((data) => data.json())
      .then((data) => setFact(data.contents.fact))
      .catch((err) => console.log("Error fetching fact of the day: " + err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="fact-container">
        <h2 className="fact-title">Did you know that...</h2>
        <p className="fact-description">{fact}</p>
      </div>
    </>
  );
};

export default FactOfTheDay;
