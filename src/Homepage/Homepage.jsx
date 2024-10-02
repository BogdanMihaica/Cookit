import { Navbar } from "../Components/Navbar/Navbar";
import "./Homepage.css";
import "./RecipeAnimation.css";
import gordonImage from "../Chefs/gordon.webp";
import wolfgang from "../Chefs/wolfgang.png";
import yannick from "../Chefs/yannick.png";
import beefWellington from "../Home-food/beefwellington.webp";
import salmon from "../Home-food/salmonpizza.jpg";
import cheese from "../Home-food/cheesesouffle.jpg";
import { Recipe } from "../Components/Recipe/Recipe";
import Footer from "../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { Popup } from "../Components/Navbar/Login";
import { useState } from "react";
export default function Homepage() {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };
  const nav = useNavigate();
  return (
    <>
      <Navbar />
      <div className="homepage-container">
        <div className="section-one">
          <div className="home-login-info">
            <p className="welcome">You've come to the right place!</p>
            <p className="info">
              Welcome to our cooking haven! Here, you'll discover a wide variety
              of delicious recipes from all over the world, tailored for every
              taste and occasion. Whether you're a beginner or an experienced
              chef, our easy-to-follow instructions, tips, and tricks will guide
              you to create mouth-watering dishes. Explore, cook, and savor the
              joy of homemade meals with us!
            </p>
            <div className="button-container">
              <button className="button-sign-in" onClick={togglePopup}>
                Sign In
              </button>
              <button className="button-explore">Explore</button>
            </div>
          </div>

          <div className="background-circle"></div>
        </div>
        <div className="section-two">
          <div className="chef-and-signature">
            <img
              src={gordonImage}
              alt="Gordon Ramsay"
              className="chef-img from-left"
            />
            <h1>Gordon Ramsay</h1>
            <div className="recipe from-right">
              <Recipe
                imgUrl={beefWellington}
                title="Beef Wellington"
                duration="90min"
                description="Gordon Ramsay's signature dish"
              />
            </div>
          </div>

          <div className="chef-and-signature">
            <div className="recipe from-left">
              <Recipe
                imgUrl={salmon}
                title="Smoked Salmon Pizza"
                duration="90min"
                description="Wolfgang Puck's signature dish"
              />
            </div>
            <h1>Wolfgang Puck</h1>
            <img
              src={wolfgang}
              alt="Wolfgang Puck"
              className="chef-img from-right"
            />
          </div>

          <div className="chef-and-signature">
            <img
              src={yannick}
              alt="Yannick Alleno"
              className="chef-img from-left"
            />
            <h1>Yannick Alleno</h1>
            <div className="recipe from-right">
              <Recipe
                imgUrl={cheese}
                title="Cheese Souffle"
                duration="40min"
                description="Yannick Alleno's signature dish"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Popup isOpen={isPopupOpen} onClose={togglePopup} />
    </>
  );
}
