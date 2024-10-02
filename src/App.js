import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./Components/Navbar/Navbar";
import Homepage from "./Homepage/Homepage";
import { Register } from "./Components/Register/Register";

function App() {
  return <Homepage />;
}

export default App;
