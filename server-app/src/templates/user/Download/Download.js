import React, { Component } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
//import classes from './dashboard.module.css'

class Download extends Component {
  render() {
    return (
      <Container>
        <Row>
            <Col>
          <Jumbotron>
            <h1>Download the client here</h1>
            <p>
              Click here to download the client to be able to make your online
              exams.
            </p>
            <div>
              <p>
                <Button variant="primary" style={{ marginRight: "20px" }}>
                  Linux (.deb)
                </Button>
                <Button variant="primary" style={{ marginRight: "20px" }}>
                  Mac (.dmg)
                </Button>
              </p>
            </div>
          </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Download;
