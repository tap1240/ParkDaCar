import React, { useEffect, useState, useRef } from "react";
import "../App.css";
import "../styles/ValetHistory.css";

export default function ValetHistory() {
  const [history, setHistory] = useState(null);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const searchRef = useRef();

  // fetch history from backend
  useEffect(() => {
    async function fetchHistory() {
      const res = await fetch("http://localhost:8080/history");
      const data = await res.json();
      // sort data by check in time
      data.sort((a, b) => (a.checkInTime > b.checkInTime ? 1 : -1));
      setHistory(data);
    }
    fetchHistory();
  }, []);

  function renderHistoryList() {
    if (!history) {
      return null;
    }

    let res;
    if (filteredHistory.length > 0) {
      res = filteredHistory;
    } else {
      res = history;
    }

    return res.map((item) => {
      return (
        <div key={item._id} className="history-card">
          <div className="history-info">
            <p>VIN: {item.vin}</p>
            <p>Make: {item.make}</p>
            <p>Model: {item.model}</p>
            <p>Year: {item.year}</p>
            <p>Trim: {item.trim}</p>
          </div>
          <div className="history-info">
            <p>Owner: {item.ownerName}</p>
            <p>Address: {item.ownerAddress}</p>
            <p>Phone: {item.ownerPhone}</p>
          </div>
          <div className="history-info">
            <p>Facility: {item.facilityName}</p>
            <p>Address: {item.facilityAddress}</p>
            <p>Check In Time: {item.checkInTime}</p>
            <p>Check Out Time: {item.checkOutTime}</p>
            <p>Parking Spot: {item.parkingSpot}</p>
          </div>
        </div>
      );
    });
  }

  // render search bar that history by phone number with clear button
  function renderSearchBar() {
    function handleClear() {
      searchRef.current.value = "";
      setFilteredHistory([]);
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

  // filter items by phone number
  function handleSearch(e) {
    const search = e.target.value;
    const filteredHistory = history.filter((item) => {
      return item.ownerPhone.includes(search);
    });
    setFilteredHistory(filteredHistory);
  }

  return (
    <div className="main-container">
      <h3>Valet History</h3>
      {renderSearchBar()}
      <div className="history-list">{renderHistoryList()}</div>
    </div>
  );
}
