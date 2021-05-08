import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import classes from "./navbar.module.css";

class navbar extends Component {
  state = {
    isAuth: false,
    isAdmin: false,
    navElements: [],
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin === "true") {
      this.setState({
        isAuth: true,
        isAdmin: true,
        navElements: [
          { label: "Dashboard", path: "/admin/dashboard" },
          { label: "Exams", path: "/admin/exams" },
          { label: "Questions", path: "/questions" },
          { label: "Groups", path: "/groups" },
          { label: "Users", path: "/users" },
          { label: "Topics", path: "/topics" },
        ],
      });
    } else if (token) {
      this.setState({
        isAuth: true,
        navElements: [
          { label: "Dashboard", path: "/admin/dashboard" },
          { label: "Exams", path: "/user/exams" },
          { label: "Download", path: "/download" },
        ],
      });
      console.log(this.state.navElements);
    } else {
      this.setState({
        navElements: [
          { label: "Home", path: "/" },
          { label: "Features", path: "/features" },
        ],
      });
    }
  }

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
          <NavLink to="/login">Log in</NavLink>
        </Button>
      );
    }
  };

  render() {
    return (
      <div>
        <Navbar sticky="top" className={classes.bgPrimary} variant="dark">
          <Navbar.Brand>
            <img
              alt=""
              src="/logo.svg"
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
