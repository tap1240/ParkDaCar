import React, { createContext, useContext, useEffect, useState } from "react";

export const FacilitiesContext = createContext();

export function useFacilities() {
  return useContext(FacilitiesContext);
}

export function FacilitiesProvider({ children }) {
  const [facilities, setFacilities] = useState([]);
  const [selectedName, setSelectedName] = useState(null);
  const [facilityData, setFacilityData] = useState(null);

  // fetch facilities from backend
  useEffect(() => {
    async function fetchFacilities() {
      const res = await fetch("http://localhost:8080/facility");
      const data = await res.json();
      setFacilities(data);

      // set default facility to first facility in list
      // if found in local storage, set to that
      if (localStorage.getItem("selectedName")) {
        setSelectedName(localStorage.getItem("selectedName"));
      } else {
        setSelectedName(data[0].name);
      }
    }

    fetchFacilities();
  }, []);

  // changes the selected facility from the dropdown
  useEffect(() => {
    const data = facilities.find((facility) => {
      return facility.name === selectedName;
    });
    setFacilityData(data);
  }, [selectedName, facilities]);

  // render dropdown to select facility
  function renderFacilityDropdown() {
    if (!selectedName) {
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
      <select
        id="facility-dropdown"
        value={selectedName}
        onChange={(e) => dropdownSelect(e)}
      >
        {options}
      </select>
    );
  }

  function dropdownSelect(e) {
    setSelectedName(e.target.value);
    // set local storage
    localStorage.setItem("selectedName", e.target.value);
  }

  const value = {
    facilities,
    selectedName,
    facilityData,
    setFacilityData,
    setFacilities,
    renderFacilityDropdown,
  };

  return (
    <FacilitiesContext.Provider value={value}>
      {children}
    </FacilitiesContext.Provider>
  );
}
