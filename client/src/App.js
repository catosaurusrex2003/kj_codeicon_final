import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./navBar";
import Predict_page from "./predict";
import "./styles/app.css";

function App() {
  // everything wil gather to come here
  return (
    <div className="App">
      <NavBar />
      <Predict_page />
    </div>
  );
}

export default App;
