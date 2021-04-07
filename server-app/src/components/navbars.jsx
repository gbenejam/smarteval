import React, { Component } from "react";
import {
  Navbar,
  Button,
  Nav
} from "react-bootstrap";

class Navbars extends Component {
  render() {
    return (
      <div>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">SmartEval</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Features</Nav.Link>
              </Nav>
              <Nav>
                <div>
                  <Button variant="outline-primary">Login</Button>
                </div>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
      </div>
    );
  }
}

export default Navbars;
