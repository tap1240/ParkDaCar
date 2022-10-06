import React from "react";
import "./App.css";
import "./styles/SideNav.css";
import Navigator from "./navigation/Navigator";
import SideNav from "./navigation/SideNav";

const App = () => {
  return (
    <div className="App">
      <SideNav />
      <Navigator />
    </div>
  );
};

export default App;
