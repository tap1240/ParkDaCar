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
    fetch("http://localhost:8080/facility")
      .then((response) => response.json())
      .then((data) => {
        setFacilities(data);
        setSelectedName(data[0].name);
        setFacilityData(data[0]);
      });
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
    return (
      <select
        className="facility-dropdown"
        onChange={(e) => {
          setSelectedName(e.target.value);
        }}
      >
        {/* <option key={"select"} value={null}>
          Select Facility
        </option> */}
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
