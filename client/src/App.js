import React from "react";
import { Route, Routes } from "react-router-dom";
import Analytic from "./analytic";
import NavBar from "./navBar";
import Predict_page from "./predict";
import "./styles/app.css";

function App() {
  // everything wil gather to come here
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path = "/predict" element = {<Predict_page />}/>
        <Route path = "/anal" element = {<Analytic />}/>
      </Routes>
      
    </div>
  );
}

export default App;
