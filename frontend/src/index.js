import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Homepage from "./Homepage/Homepage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Register } from "./Components/Register/Register";
import Recipes from "./Components/Recipes/Recipes";
import Contact from "./Components/Contact/Contact";
import { Contests } from "./Components/Contests/Contests";
import RecipePage from "./Components/RecipePage/RecipePage";
import ContestPage from "./Components/ContestPage/ContestPage";
import UserProfilePage from "./Components/UserProfilePage/UserProfilePage";
import ProfileSettingsPage from "./Components/ProfileSettingsPage/ProfileSettingsPage";
import CookingTechniques from "./Components/CookingTechniques/CookingTechinques";
import FactOfTheDay from "./Components/FactOfTheDay/FactOfTheDay";
import IngredientsPage from "./Components/IngredientsPage/IngredientsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/recipes",
    element: <Recipes />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/contests",
    element: <Contests />,
  },
  {
    path: "/techniques",
    element: <CookingTechniques />,
  },
  {
    path: "/fact",
    element: <FactOfTheDay />,
  },
  {
    path: "/ingredients",
    element: <IngredientsPage />,
  },
  {
    path: "/sample",
    element: <RecipePage />,
  },
  {
    path: "/samplecontest",
    element: <ContestPage />,
  },
  {
    path: "/user",
    element: <UserProfilePage />,
  },
  {
    path: "/settings",
    element: <ProfileSettingsPage />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();