import React, { useState, useEffect } from "react";
import "./FactOfTheDay.css";
import { Navbar } from "../Navbar/Navbar";

const FactOfTheDay = () => {
  const [fact, setFact] = useState("");

  useEffect(() => {
    // Simulating fetching a fact of the day
    const facts = [
      "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.",
      "Carrots were originally purple, not orange.",
      "Tomatoes are a fruit, but they are legally classified as a vegetable in the United States.",
    ];

    const today = new Date().getDate() % facts.length; // Get a different fact each day
    setFact(facts[today]);
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
