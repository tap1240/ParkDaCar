import React, { useState } from "react";
import "../styles/SideNav.css";

export default function SideNav() {
  const [isOpen, setIsOpen] = useState(true);
  const navItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Facilities",
      path: "/facilities",
    },
    {
      name: "Valeted\nVehicles",
      path: "/vehicles",
    },
  ];

  function renderNavItems() {
    return navItems.map((item) => {
      return (
        <li key={item.name}>
          <a className="nav-button" href={item.path}>
            {item.name}
          </a>
        </li>
      );
    });
  }

  // render button to toggle side nav
  function renderToggleButton() {
    const left = isOpen ? 125 : "0%";
    return (
      <button
        style={{ position: "absolute", left: left }}
        className="toggle-button"
        onClick={toggleSideNav}
      >
        &#9776;
      </button>
    );
  }

  function toggleSideNav() {
    setIsOpen(!isOpen);
  }

  // render SideNav that has links to all the pages
  function renderSideNav() {
    return (
      <div className="side-nav">
        <div>{renderNavItems()}</div>
      </div>
    );
  }

  return (
    <div>
      {renderToggleButton()}
      {isOpen ? renderSideNav() : null}
    </div>
  );
}
