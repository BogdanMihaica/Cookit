import { useEffect } from "react";
import { Navbar } from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./NotFound.css";
import scene from "./scene.svg";
import mic from "./mic.png";
import tomatoImg from "./tomato.png";

export default function NotFound() {
  useEffect(() => {
    // Function to spawn a tomato
    const spawnTomato = () => {
      const tomato = document.createElement("img");
      tomato.src = tomatoImg; // Path to tomato image
      tomato.alt = "Tomato";
      tomato.classList.add("tomato");
      const scaleMin = 1;
      const scaleMax = 3;

      const container = document.querySelector(".tomato-container");
      const containerRect = container.getBoundingClientRect();

      const randomX = Math.random() * containerRect.width;
      const randomY = Math.random() * containerRect.height;
      const randomScale = Math.random() * (scaleMax - scaleMin) + scaleMin; // Adjusted random scale
      const randomDuration = Math.random() * (8 - 4) + 4; // Slow down the tomato animation

      tomato.style.setProperty("--start-x", `${randomX}px`);
      tomato.style.setProperty("--start-y", `${randomY}px`);
      tomato.style.setProperty("--start-scale", randomScale);
      tomato.style.setProperty("--animation-duration", `${randomDuration}s`);

      // Append tomato to the container
      container.appendChild(tomato);

      let dodgeTriggered = false; // Flag to track if dodge has already been triggered

      const checkTomatoPosition = () => {
        const tomatoRect = tomato.getBoundingClientRect();
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // If the tomato reaches the center of the screen, trigger dodge animation
        if (
          tomatoRect.left < screenWidth / 2 + 50 &&
          tomatoRect.right > screenWidth / 2 - 50 &&
          tomatoRect.top < screenHeight / 2 + 50 &&
          tomatoRect.bottom > screenHeight / 2 - 50
        ) {
          // Trigger dodge only once per tomato
          if (!dodgeTriggered) {
            const error404 = document.querySelector(".error404");
            if (!error404.classList.contains("dodging")) {
              error404.classList.add("dodging");
              dodgeTriggered = true; // Set the flag to prevent further dodges

              // Wait for the dodge animation to finish before moving back
              setTimeout(() => {
                error404.classList.remove("dodging");
              }, 300); // Duration of dodge
            }
          }
        }
      };

      const intervalCheck = setInterval(checkTomatoPosition, 100);

      // Listen for when the animation ends to remove the tomato
      tomato.addEventListener("animationend", () => {
        clearInterval(intervalCheck);
        tomato.remove();
      });
    };

    // Adjusted interval for smoother appearance of tomatoes
    const interval = setInterval(
      spawnTomato,
      Math.random() * (4000 - 3000) + 3000 // Slower spawn interval
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <div className="scene">
        <div className="scene-bg">
          <img className="scene-img" src={scene} alt="scene" />
          <img className="mic" src={mic} alt="microphone" />
        </div>
        <div className="tomato-container"></div>
        <h1 className="error404">404</h1>
      </div>
      <Footer />
    </>
  );
}
