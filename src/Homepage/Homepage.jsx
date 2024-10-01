import { Navbar } from "../Components/Navbar/Navbar";
import "./Homepage.css";
import gordonImage from "../Chefs/gordon.webp";
export default function Homepage() {
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
              <button className="button-sign-in">Sign In</button>
              <button className="button-explore">Explore</button>
            </div>
          </div>

          <div className="background-circle"></div>
        </div>
        <div className="section-two">
          <div className="chef-and-signature">
            <img src={gordonImage} alt="Gordon Ramsay" className="chef-img" />
          </div>
        </div>
      </div>
    </>
  );
}
