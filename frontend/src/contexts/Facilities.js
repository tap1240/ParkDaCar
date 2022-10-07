import React, { createContext, useContext, useEffect, useState } from "react";

export const FacilitiesContext = createContext();

export function useFacilities() {
  return useContext(FacilitiesContext);
}

export function FacilitiesProvider({ children }) {
  const [facilities, setFacilities] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedName, setSelectedName] = useState(null);
  const [currentFacility, setCurrentFacility] = useState(null);

  // fetch facilities from backend
  useEffect(() => {
    async function fetchFacilities() {
      const res = await fetch("http://localhost:8080/facility");
      const data = await res.json();
      //sort data by name
      data.sort((a, b) => (a.name > b.name ? 1 : -1));
      setFacilities(data);

      // default facility to first facility in list
      // if found in local storage, set to that
      // if local storage selectedName is in facilities, set to that
      const found = data.find(
        (facility) => facility.name === localStorage.getItem("selectedName")
      );
      if (found) {
        setSelectedName(localStorage.getItem("selectedName"));
      }
      // }
      else {
        setSelectedName(data[0].name);
        localStorage.setItem("selectedName", data[0].name);
      }
    }
    fetchFacilities();
  }, []);

  // changes the selected facility from the dropdown
  useEffect(() => {
    const data = facilities.find((facility) => {
      return facility.name === selectedName;
    });
    setCurrentFacility(data);
  }, [selectedName, facilities]);

  // get vehicles from each facility
  // loop through each parking spot, if occupied, add the vehicle to the list
  useEffect(() => {
    function getVehicles() {
      const vehicles = [];
      facilities.forEach((facility) => {
        facility.parking.forEach((spot, index) => {
          if (spot.occupied) {
            const vehicleInfo = spot.vehicle;
            const facilityInfo = {
              name: facility.name,
              address: facility.address,
              parkingSpot: spot.id,
            };
            const ownerInfo = spot.owner;
            const checkInTime = spot.time;
            const res = { id: index, vehicleInfo, facilityInfo, ownerInfo, checkInTime };
            vehicles.push(res);
          }
        });
      });
      setVehicles(vehicles);
    }
    getVehicles();
  }, [facilities]);

  // render dropdown to select facility
  function renderFacilityDropdown() {
    if (!selectedName || !currentFacility) {
      return null;
    }

    const options = facilities.map((facility) => {
      return (
        <option key={facility.name} value={facility.name}>
          {facility.name}
        </option>
      );
    });

    return (
      <div>
        <select
          id="facility-dropdown"
          value={selectedName}
          onChange={(e) => dropdownSelect(e)}
        >
          {options}
        </select>
        <p>Address: {currentFacility.address}</p>
      </div>
    );
  }

  function dropdownSelect(e) {
    // set local storage
    localStorage.setItem("selectedName", e.target.value);
    setSelectedName(e.target.value);
  }

  const value = {
    facilities,
    selectedName,
    currentFacility: currentFacility,
    vehicles,
    setcurrentFacility: setCurrentFacility,
    setFacilities,
    renderFacilityDropdown,
    setVehicles,
  };

  return (
    <FacilitiesContext.Provider value={value}>
      {children}
    </FacilitiesContext.Provider>
  );
}
