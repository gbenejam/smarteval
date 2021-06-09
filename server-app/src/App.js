import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

import Mainpage from "./templates/layout/layout";

import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./App.module.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className={classes.App}>
          <Mainpage />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
