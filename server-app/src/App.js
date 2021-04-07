import React from "react";

import Navbars from "./components/navbars";
import Stage from "./components/carousel";

import "./App.css";

const App = () => (
  <div className="App">
    <Navbars />
    <div>
      <Stage />
    </div>
  </div>
);

export default App;
