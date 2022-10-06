import React from "react";
import "../App.css";
import "../styles/Home.css";

export default function Home() {
  function renderButtons() {
    return (
      <div className="buttons">
        <button className="check-in">Check In</button>
        <button className="check-out">Check Out</button>
      </div>
    );
  }

  return (
    <div className="main-container">
      <h1>Park Da Car</h1>
      {renderButtons()}
    </div>
  );
}
