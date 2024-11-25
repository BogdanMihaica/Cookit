import React, { useState, useEffect } from "react";
import "./FactOfTheDay.css";
import { Navbar } from "../Navbar/Navbar";
import factsData from "../../facts.json";
import Footer from "../Footer/Footer";

const FactOfTheDay = () => {
  const [fact, setFact] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const category = { category: "Food" };
  const currentDate = new Date();
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1); // January 1st of the current year

  const factIndex = Math.floor(
    (currentDate - startOfYear) / (1000 * 60 * 60 * 24)
  );

  useEffect(() => {
    setIsLoading(true);
    const fetchFact = () => {
      setFact(factsData["food_facts"][factIndex]["fact"]);
      setIsLoading(false);
    };
    fetchFact();
  }, [factIndex]);

  return (
    <>
      <Navbar />
      <div className="background">
        <div className="fact-container">
          <h2 className="fact-title">Did you know that...</h2>
          {isLoading ? (
            <p className="fact-description loading">Loading...</p>
          ) : (
            <p className="fact-description">{fact}</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FactOfTheDay;
