import React, { useState } from "react";
import "../App.css";
import CheckIn from "../components/modals/CheckIn";
import { useFacilities } from "../contexts/Facilities";
import "../styles/Home.css";

export default function Home() {
  const { renderFacilityDropdown } = useFacilities();
  const [checkInVisible, setCheckInVisible] = useState(false);

  function handleCheckIn() {
    setCheckInVisible(true);
  }

  function handleCheckOut() {
    // navigate to vehicles page
    window.location.href = "/vehicles";
  }

  function renderButtons() {
    return (
      <div className="button-container">
        <button className="button" onClick={handleCheckIn}>
          Check In
        </button>
        <button className="button" onClick={handleCheckOut}>
          Check Out
        </button>
      </div>
    );
  }

  return (
    <div className="main-container">
      <h1>Park Da Car</h1>
      <CheckIn visible={checkInVisible} setVisible={setCheckInVisible} />
      {renderFacilityDropdown()}
      {renderButtons()}
    </div>
  );
}
