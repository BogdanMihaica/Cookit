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
    path: "/sample",
    element: <RecipePage />,
  },
  {
    path: "/samplecontest",
    element: <ContestPage />,
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
