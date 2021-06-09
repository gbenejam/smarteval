import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import classes from "./navbar.module.css";

import logo from "../../../logo.png";

class navbar extends Component {
  state = {
    isAuth: false,
    isAdmin: false,
    token: "",
    navElements: [],
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({
        token: token,
        isAuth: true,
        navElements: [
          { label: "Exams", path: "/user/exams" },
        ],
      });
    } else {
      this.setState({
        navElements: [
          { label: "Home", path: "/" }
        ],
      });
    }
  }

  logoutHandler = (event) => {
    event.preventDefault();
    axios.post("/users/logout", {}, {
      crossDomain: true,
      headers: { Authorization: "Bearer " + this.state.token },
    }).then((res) => {
      this.setState({
        token: "",
        isAuth: false,
        navElements: [
          { label: "Home", path: "/" }
        ]
      });
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("isAdmin");
      // redirect to home page after logout
      window.location.hash = '#/';
      window.location.reload();
    }).catch((err) => console.log(err));
  };

  loginButton = () => {
    if (this.state.isAuth) {
      return (
        <Button className={classes.logoutButton} onClick={this.logoutHandler}>
          Log out
        </Button>
      );
    } else {
      return (
        <Button className={classes.loginButton}>
          <NavLink to="/">Log in</NavLink>
        </Button>
      );
    }
  };

  render() {
    console.log('navbar render');
    return (
      <div id="main-nav">
        <Navbar sticky="top" className={classes.bgPrimary} variant="dark">
          <Navbar.Brand>
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
          </Navbar.Brand>
          <Nav className="mr-auto">
            {this.state.navElements.map(function (d, idx) {
              return (
                <NavLink
                  key={idx}
                  className={classes.navigationLinks}
                  to={d.path}
                >
                  {d.label}
                </NavLink>
              );
            })}
          </Nav>
          <Form inline>{this.loginButton()}</Form>
        </Navbar>
      </div>
    );
  }
}

export default navbar;
