import React, { useState } from "react";
import "../App.css";
import CheckIn from "../components/modals/CheckIn";
import { useFacilities } from "../contexts/Facilities";
import "../styles/Home.css";

export default function Home() {
  const { renderFacilityDropdown, selectedName } = useFacilities();
  const [checkInVisible, setCheckInVisible] = useState(false);

  function handleCheckIn() {
    if (!facilityCheck()) {
      return;
    }
    setCheckInVisible(true);
    console.log("check in");
  }

  function handleCheckOut() {
    facilityCheck();
    console.log("check out");
  }

  function facilityCheck() {
    if (selectedName == null) {
      alert("Please select a facility");
      return false;
    }
    return true;
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
      <CheckIn
        checkInVisible={checkInVisible}
        setCheckInVisible={setCheckInVisible}
      />
      {renderFacilityDropdown()}
      {renderButtons()}
    </div>
  );
}
