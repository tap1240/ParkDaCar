import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import { useFacilities } from "../contexts/Facilities";
import "../styles/Vehicles.css";
import CheckOut from "../components/modals/CheckOut";

export default function Vehicles() {
  const { vehicles, renderFacilityDropdown, selectedName } = useFacilities();

  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [checkOutVisible, setCheckOutVisible] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const searchRef = useRef();

  // disable scroll when modal is visible
  useEffect(() => {
    if (checkOutVisible) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [checkOutVisible]);

  // render scrollable clickable list of vehicles
  function renderVehicleList() {
    let res;
    if (filteredVehicles.length > 0) {
      res = filteredVehicles;
    } else {
      res = vehicles;
    }

    return res.map((vehicle) => {
      if (vehicle.facilityInfo.name !== selectedName) {
        return null;
      }

      // format date
      const date = new Date(vehicle.checkInTime);
      const formattedDate = date.toLocaleString();

      return (
        <div
          key={vehicle.id}
          className="vehicle-card"
          onClick={() => handleVehicleClick(vehicle)}
        >
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
    });
  }

  function handleVehicleClick(vehicle) {
    setCheckOutVisible(true);
    setSelectedVehicle(vehicle);
  }

  // render search bar that filters vehicles by phone number with clear button
  function renderSearchBar() {
    function handleClear() {
      searchRef.current.value = "";
      setFilteredVehicles([]);
    }
    return (
      <div className="search-bar">
        <input
          ref={searchRef}
          type="text"
          placeholder="Search by phone number"
          onChange={handleSearch}
        />
        <button onClick={handleClear}>X</button>
      </div>
    );
  }

  // filter vehicles by phone number
  function handleSearch(e) {
    const search = e.target.value;
    const filteredVehicles = vehicles.filter((vehicle) => {
      return vehicle.ownerInfo.phone.includes(search);
    });
    setFilteredVehicles(filteredVehicles);
  }

  return (
    <div className="main-container">
      <h3>Vehicles</h3>
      <CheckOut
        visible={checkOutVisible}
        setVisible={setCheckOutVisible}
        vehicle={selectedVehicle}
      />
      {renderFacilityDropdown()}
      {renderSearchBar()}
      <div className="vehicle-list">{renderVehicleList()}</div>
    </div>
  );
}
