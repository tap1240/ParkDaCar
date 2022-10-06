import React from "react";
import "../styles/SideNav.css";

export default function SideNav() {
  const navItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Facilities",
      path: "/facilities",
    },
    // {
    //   name: "Users",
    //   path: "/users",
    // },
  ];

  function renderNavItems() {
    return navItems.map((item) => {
      return (
        <li key={item.name}>
          <a className="navbutton" href={item.path}>
            {item.name}
          </a>
        </li>
      );
    });
  }

  // render SideNav that has links to all the pages
  function renderSideNav() {
    return (
      <div className="sidenav">
        <l>{renderNavItems()}</l>
      </div>
    );
  }

  return <div>{renderSideNav()}</div>;
}
