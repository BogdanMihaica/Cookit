import { useEffect, useState } from "react";
import { Navbar } from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./NotFound.css";
import scene from "./scene.svg";
import mic from "./mic.png";
import tomatoImg from "./tomato.png";

export default function NotFound() {
  const [hitCount, setHitCount] = useState(0);

  useEffect(() => {
    const spawnTomato = (x = null, y = null) => {
      const tomato = document.createElement("img");
      tomato.src = tomatoImg;
      tomato.alt = "Tomato";
      tomato.classList.add("tomato");

      const scaleMin = 1;
      const scaleMax = 3;
      const container = document.querySelector(".tomato-container");

      const randomOffsetX = () => (Math.random() < 0.5 ? 90 : -90);
      const randomOffsetY = () => (Math.random() < 0.5 ? 30 : -30);
      const centerX = window.innerWidth / 2 - 120;
      const centerY = window.innerHeight / 2 - 100;
      const screenCenterX = window.innerWidth / 2 - 120 + randomOffsetX();
      const screenCenterY = window.innerHeight / 2 - 100 + randomOffsetY();

      const randomX = x ?? Math.random() * container.offsetWidth;
      const randomY = y ?? Math.random() * container.offsetHeight;

      const randomScale = Math.random() * (scaleMax - scaleMin) + scaleMin;
      const minDuration = 1;
      const maxDuration = 2;
      const randomDuration =
        Math.random() * (maxDuration - minDuration) + minDuration;

      tomato.style.setProperty("--start-x", `${randomX}px`);
      tomato.style.setProperty("--start-y", `${randomY}px`);
      tomato.style.setProperty("--start-scale", randomScale);
      tomato.style.setProperty("--animation-duration", `${randomDuration}s`);
      tomato.style.setProperty("--center-x", `${screenCenterX}px`);
      tomato.style.setProperty("--center-y", `${screenCenterY}px`);

      container.appendChild(tomato);

      let dodgeTriggered = false;

      const checkTomatoPosition = () => {
        const tomatoRect = tomato.getBoundingClientRect();
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const epsilon = 100;
        const tomatoZIndex = window.getComputedStyle(tomato).zIndex;
        if (
          tomatoZIndex === "1" &&
          tomatoRect.left < screenWidth / 2 + epsilon &&
          tomatoRect.right > screenWidth / 2 - epsilon &&
          tomatoRect.top < screenHeight / 2 + epsilon &&
          tomatoRect.bottom > screenHeight / 2 - epsilon
        ) {
          if (!dodgeTriggered) {
            const error404 = document.querySelector(".error404");
            const randomChance = Math.random();
            let choice = "";
            if (randomChance < 0.8) {
              if (
                !error404.classList.contains("dodging") &&
                !error404.classList.contains("left") &&
                !error404.classList.contains("right") &&
                !error404.classList.contains("up") &&
                !error404.classList.contains("down")
              ) {
                error404.classList.add("dodging");
                const randomClass = ["left", "right", "up", "down"];
                const randomIndex = Math.floor(
                  Math.random() * randomClass.length
                );
                if (randomIndex <= 1) {
                  if (screenCenterX <= centerX) {
                    error404.classList.add("right");
                    choice = "right";
                  } else {
                    error404.classList.add("left");
                    choice = "left";
                  }
                } else {
                  choice = randomClass[randomIndex];
                  error404.classList.add(randomClass[randomIndex]);
                }

                dodgeTriggered = true;

                setTimeout(() => {
                  error404.classList.remove(choice);
                  error404.classList.remove("dodging");
                }, 300);
              }
            } else {
              error404.classList.add("hit");
              setHitCount((prevCount) => prevCount + 1); // Increment hit counter
              setTimeout(() => {
                error404.classList.remove("hit");
              }, 500);
            }
          }
        }
      };

      const intervalCheck = setInterval(checkTomatoPosition, 100);

      tomato.addEventListener("animationend", () => {
        clearInterval(intervalCheck);
        tomato.remove();
      });
    };

    const minSpawn = 1000;
    const maxSpawn = 2000;
    const interval = setInterval(
      () => spawnTomato(),
      Math.random() * (maxSpawn - minSpawn) + minSpawn
    );

    const handleClick = (event) => {
      spawnTomato(event.clientX, event.clientY);
    };
    window.addEventListener("click", handleClick);

    return () => {
      clearInterval(interval);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="scene">
        <div className="hit-counter">{`Hits: ${hitCount}`}</div>
        <div className="scene-bg">
          <img className="scene-img" src={scene} alt="scene" />

          <div className="shadow"></div>
          <img className="mic" src={mic} alt="microphone" />
        </div>
        <div className="tomato-container"></div>
        <h1 className="error404">404</h1>
      </div>
      <Footer />
    </>
  );
}
