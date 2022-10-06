import React from "react";
import "./App.css";
import "./styles/SideNav.css";
import Navigator from "./navigation/Navigator";
import SideNav from "./components/SideNav";

const App = () => {
  return (
    <>
      <SideNav />
      <Navigator />;
    </>
  );
};

export default App;
