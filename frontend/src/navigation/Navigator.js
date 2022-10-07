import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FacilitiesProvider } from "../contexts/Facilities";
import Facilities from "../pages/Facilities";
import Home from "../pages/Home";
import ValetHistory from "../pages/ValetHistory";
import Vehicles from "../pages/Vehicles";

export default function Navigator() {
  return (
    <FacilitiesProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/history" element={<ValetHistory />} />
        </Routes>
      </Router>
    </FacilitiesProvider>
  );
}
