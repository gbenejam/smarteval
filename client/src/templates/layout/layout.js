import React, { Component } from "react";
import Navbar from "../../components/navigation/navbar/navbar";
import { Switch, Route } from "react-router-dom";

import Login from "../login/login";

//import classes from './layout.module.css'

class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route path="/" exact render={() => <Login/>} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default Layout;
