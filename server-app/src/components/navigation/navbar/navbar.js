import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import classes from './navbar.module.css';

const navbar = () => {
  return (
    <div>
      <Navbar sticky="top" className={classes.bgPrimary} variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
        </Nav>
        <Form inline>
          <Button className={classes.loginButton}>Log in</Button>
        </Form>
      </Navbar>
    </div>
  );
};

export default navbar;
