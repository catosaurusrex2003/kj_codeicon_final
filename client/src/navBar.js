import { React, useState } from "react";

export default function NavBar() {
  return (
    <div className="nav-parent">
      <div className="logo">
        <img className="logo-img" src={require("./assets/logo.png")} />
        <h1>Ran_42</h1>
      </div>
      <div className="right-nav">
        <p>Test</p>
        <p>Analysis</p>
      </div>
    </div>
  );
}
