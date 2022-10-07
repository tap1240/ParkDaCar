import React from "react";
import "../../styles/CheckOut.css";
import { useFacilities } from "../../contexts/Facilities";

export default function CheckOut({ visible, setVisible, vehicle }) {
  const { facilities, setFacilities, currentFacility } = useFacilities();

  function handleCheckOut() {
    // get all fields from form
    const attendant = document.getElementById("attendant").value;
    let time = document.getElementById("check-out-time").value;

    if (time === "") {
      const now = new Date();
      time = now.toISOString().slice(0, 19).replace("T", " ");
    }

    // if any of the required fields are empty, alert the user
    if (!attendant) {
      alert("Please fill out the signature field");
      return;
    }

    // --- Update Facility in DB and context ---

    // get parking spot from currentFacility.parking
    for (const index in currentFacility.parking) {
      if (
        currentFacility.parking[index].id === vehicle.facilityInfo.parkingSpot
      ) {
        // update parking spot to { id: id, occupied:false }
        currentFacility.parking[index] = {
          id: currentFacility.parking[index].id,
          occupied: false,
        };

        // update currentFacility with new data
        const newCurrentFacility = { ...currentFacility };

        // update facilities where name === currentFacility.name
        const newFacilities = facilities.map((facility) => {
          if (facility.name === currentFacility.name) {
            return newCurrentFacility;
          }
          return facility;
        });

        // update facilities in context (this will update the selected facility also)
        setFacilities(newFacilities);

        // update facility in database
        fetch(`http://localhost:8080/facility/${currentFacility.name}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCurrentFacility),
        });

        break;
      }
    }

    // --- Create Check Out in DB ---

    // close modal
    setVisible(false);
    alert("Check Out successful!");
  }

  function handleCancel() {
    setVisible(false);
  }

  function renderVehicleInfo() {
    // format date
    const date = new Date(vehicle.checkInTime);
    const formattedDate = date.toLocaleString();
    return (
      <div className="modal-vehicle-card" onClick={() => {}}>
        <div className="vehicle-info">
          <p>VIN: {vehicle.vehicleInfo.vin}</p>
          <p>Make: {vehicle.vehicleInfo.make}</p>
          <p>Model: {vehicle.vehicleInfo.model}</p>
          <p>Year: {vehicle.vehicleInfo.year}</p>
          <p>Trim: {vehicle.vehicleInfo.trim}</p>
        </div>
        <div className="vehicle-info">
          <p>Owner: {vehicle.ownerInfo.owner}</p>
          <p>Address: {vehicle.ownerInfo.address}</p>
          <p>Phone: {vehicle.ownerInfo.phone}</p>
        </div>
        <div className="vehicle-info">
          <p>Facility: {vehicle.facilityInfo.name}</p>
          <p>Address: {vehicle.facilityInfo.address}</p>
          <p>Check In Time: {formattedDate}</p>
          <p>Parking Spot: {vehicle.facilityInfo.parkingSpot}</p>
        </div>
      </div>
    );
  }

  // render buttons for check out and cancel
  function renderButtons() {
    return (
      <div className="button-container">
        <button className="button" onClick={handleCheckOut}>
          Check Out
        </button>
        <button className="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    );
  }

  // render input field for attendant signature and check out time
  function renderInputFields() {
    return (
      <div className="input-container">
        <input
          type="text"
          id="attendant"
          placeholder="Attendant Signature"
        ></input>
        <input
          type="text"
          id="check-out-time"
          placeholder="Check Out Time (leave blank if now)"
        ></input>
      </div>
    );
  }

  function renderModal() {
    return (
      <div className="modal">
        <div className="modal-content">
          <div>
            <span className="close" onClick={handleCancel}>
              &times;
            </span>
            <h3>Check Out</h3>
            <p style={{ fontSize: 10 }}>
              CONFIRM THESE DETAILS ARE CORRECT BEFORE PROCEEDING
            </p>
          </div>
          {renderVehicleInfo()}
          {renderInputFields()}
          {renderButtons()}
        </div>
      </div>
    );
  }

  switch (visible) {
    case true:
      return renderModal();
    case false:
      return null;
    default:
      return null;
  }
}
