import React, { Component } from "react";
import Navbar from "../../components/navigation/navbar/navbar";
import { Route } from "react-router-dom";
import Main from "../main/main";
import Features from "../features/features";
import Login from "../login/login";
import NewUser from '../newuser/NewUser';

//import classes from './mainpage.module.css'

class Layout extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Route path="/" exact component={Main} />
        <Route path="/features" exact component={Features} />
        <Route path="/login" exact component={Login} />
        <Route path="/new-user" exact component={NewUser}/>
      </div>
    );
  }
}

export default Layout;
