import React from "react";
import "../App.css";
import "../styles/Facilities.css";
import { useFacilities } from "../contexts/Facilities";

export default function Facilities() {
  const { currentFacility, renderFacilityDropdown } = useFacilities();

  //   render facility details
  function renderFacilityDetails() {
    if (!currentFacility) {
      return null;
    }

    // calculate total number of parking spots
    let totalParkingSpots = 0;
    let occupiedParkingSpots = 0;
    currentFacility.parking.forEach((spot) => {
      totalParkingSpots += 1;
      if (spot.occupied) {
        occupiedParkingSpots += 1;
      }
    });

    return (
      <div className="facility-details">
        <div className="facility-info1">
          <p>
            Capacity: {occupiedParkingSpots} / {totalParkingSpots}
          </p>
        </div>
        <div className="facility-info2">{renderParkingGrid()}</div>
      </div>
    );
  }

  // render parking grid, with each parking spot as a button, red if occupied, green if available
  // parking is in the format of a [{id: 1, occupied: true}, {id: 2, occupied: false}]
  function renderParkingGrid() {
    const parkingSpots = currentFacility.parking;
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
                onClick={() => parkingSpotClick(spot)}
              >
                {spot.id}
              </button>
            );
          })}
        </div>
      );
    });
  }

  function parkingSpotClick(spot) {
    alert(JSON.stringify(spot, null, 2));
  }

  return (
    <div className="main-container">
      <h3>Facilities</h3>
      {renderFacilityDropdown()}
      {renderFacilityDetails()}
    </div>
  );
}
