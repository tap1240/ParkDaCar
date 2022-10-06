import React, { useEffect, useState } from "react";
import "../App.css";
import "../styles/Facilities.css";

export default function Facilities() {
  const [facilities, setFacilities] = useState([]);
  const [selectedName, setSelectedFacility] = useState(null);
  const [facilityData, setFacilityData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/facility")
      .then((response) => response.json())
      .then((data) => {
        setFacilities(data);
      });
  }, []);

  useEffect(() => {
    const data = facilities.find((facility) => {
      return facility.name === selectedName;
    });
    setFacilityData(data);
  }, [selectedName, facilities]);

  // render dropdown to select facility
  function renderFacilityDropdown() {
    return (
      <select
        className="facility-dropdown"
        onChange={(e) => {
          setSelectedFacility(e.target.value);
        }}
      >
        <option key={"select"} value={null}>
          Select Facility
        </option>
        {facilities.map((facility) => {
          return (
            <option key={facility.name} value={facility.name}>
              {facility.name}
            </option>
          );
        })}
      </select>
    );
  }

  //   render facility details
  function renderFacilityDetails() {
    if (!facilityData) {
      return null;
    }
    return (
      <div className="facility-details">
        <p>Address: {facilityData.address}</p>
        {renderParkingGrid()}
      </div>
    );
  }

  // render parking grid, with each parking spot as a button, red if occupied, green if available
  // parking is in the format of a [{id: 1, occupied: true}, {id: 2, occupied: false}]
  function renderParkingGrid() {
    const parkingSpots = facilityData.parking;
    // render parking spots in rows of 10
    const rows = [];
    for (let i = 0; i < parkingSpots.length; i += 10) {
      const row = parkingSpots.slice(i, i + 10);
      rows.push(row);
    }

    // render each row
    return rows.map((row, index) => {
      return (
        <div key={index} className="parking-row">
          {row.map((spot) => {
            // render each parking spot
            return (
              <button
                key={spot.id}
                className={spot.occupied ? "occupied" : "available"}
              >
                {spot.id}
              </button>
            );
          })}
        </div>
      );
    });
  }

  return (
    <div className="main-container">
      <h1>Facilities</h1>
      {renderFacilityDropdown()}
      {renderFacilityDetails()}
    </div>
  );
}
