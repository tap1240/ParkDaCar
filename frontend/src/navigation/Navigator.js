import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Facilities from "../pages/Facilities";
import Home from "../pages/Home";

export default function Navigator() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/facilities" element={<Facilities />} />
      </Routes>
    </Router>
  );
}
