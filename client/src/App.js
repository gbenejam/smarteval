import React, { Component } from "react";
import { HashRouter } from "react-router-dom";

import Layout from "./templates/layout/layout";

import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./App.module.css";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className={classes.App}>
          <Layout/>
        </div>
      </HashRouter>
    );
  }
}

export default App;