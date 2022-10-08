import React, { useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import "../../styles/CheckIn.css";
import { useFacilities } from "../../contexts/Facilities";

export default function CheckIn({ visible, setVisible }) {
  const { currentFacility, facilities, setFacilities } = useFacilities();

  const [vin, setVin] = useState(null);
  const [vehicleInfo, setVehicleInfo] = useState(null);

  useDebounce(
    async () => {
      if (vin) {
        const res = await fetch(`http://localhost:8080/vehicle/${vin}`);
        const data = await res.json();
        setVehicleInfo(data);
      }
    },
    500,
    [vin]
  );

  function handleVinChange(e) {
    setVin(e.target.value);
  }

  function handleCheckIn() {
    // get all fields from form
    const attendant = document.getElementById("attendant").value;

    // if not time, set to current time
    let time = document.getElementById("check-in-time").value;
    if (time === "") {
      const now = new Date();
      time = now.toISOString().slice(0, 19).replace("T", " ");
      document.getElementById("check-in-time").value = time;
    }

    const owner = document.getElementById("owner").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;

    // if any of the required fields are empty, alert the user
    if (!attendant || !owner || !address || !phone || !vin) {
      alert("Please fill out all required fields");
      return;
    }

    // create owner object
    const ownerInfo = { owner, address, phone };

    // get first empty spot in currentFacility.parking
    let res = false;
    for (const index in currentFacility.parking) {
      if (currentFacility.parking[index].occupied === false) {
        res = true;
        currentFacility.parking[index].occupied = true;
        currentFacility.parking[index].vehicle = vehicleInfo;
        currentFacility.parking[index].owner = ownerInfo;
        currentFacility.parking[index].time = time;
        currentFacility.parking[index].attendant = attendant;

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

    // close modal
    setVisible(false);

    if (res) {
      alert("Check In successful!");
    } else {
      alert("No parking spots available");
    }
  }

  function handleCancel() {
    setVehicleInfo(null);
    setVisible(false);
  }

  // render input fields for VIN, attendant, and check in time
  function renderInputFields() {
    return (
      <div className="main-input">
        <div className="input-container">
          <div className="input-field">
            <label htmlFor="vin">VIN</label>
            <input onChange={handleVinChange} type="text" id="vin" />
          </div>
          <div className="input-field">
            <label htmlFor="attendant">Attendant</label>
            <input type="text" id="attendant" />
          </div>
          <div className="input-field">
            <label htmlFor="check-in-time">*Time</label>
            <input type="text" id="check-in-time" />
          </div>
        </div>
        <div className="input-container">
          <div className="input-field">
            <label htmlFor="owner">Owner</label>
            <input type="text" id="owner" />
          </div>
          <div className="input-field">
            <label htmlFor="address">Address</label>
            <input type="text" id="address" />
          </div>
          <div className="input-field">
            <label htmlFor="phone">Phone #</label>
            <input type="text" id="phone" />
          </div>
        </div>
      </div>
    );
  }

  // render buttons for check in and cancel
  function renderButtons() {
    return (
      <div className="button-container">
        <button className="button" onClick={handleCheckIn}>
          Check In
        </button>
        <button className="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    );
  }

  function renderVehicleInfo() {
    if (vehicleInfo == null) {
      return null;
    }

    if (vehicleInfo.message) {
      return (
        <div className="vehicle-info">
          <h5>Invalid VIN Probable</h5>
          <p>{vehicleInfo.message}</p>
        </div>
      );
    }

    return (
      <div className="vehicle-info-container">
        <h5>Vehicle Info</h5>
        <div>
          <p style={{ fontSize: 14 }}>
            Make: {vehicleInfo.make} | Model: {vehicleInfo.model}
          </p>
          <p style={{ fontSize: 14 }}>
            Year: {vehicleInfo.year} | Trim: {vehicleInfo.trim}
          </p>
        </div>
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
            <h3>Check In</h3>
          </div>
          {renderInputFields()}
          <p style={{ fontSize: 10 }}>*If left blank uses current time</p>
          {renderVehicleInfo()}
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
