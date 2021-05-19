import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Countdown from "react-countdown";
import Webcam from "react-webcam";

class Exam extends Component {
  state = {
    exam: [],
    isAuth: false,
    close: false,
    show: false,
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ isAuth: true });
      if (window.location.search) {
        const id = window.location.search.replace("?id=", "");
        axios
          .get("http://localhost:3030/admin/exams/" + id, {
            crossDomain: true,
            headers: { Authorization: "Bearer " + token },
          })
          .then((res) => {
            console.log(res);
            this.setState({ exam: res.data });
          })
          .catch((err) => console.log(err));
      }
    }
  }

  Completionist = () => {
    return (
      <Modal.Dialog backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Time's up</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Time's up. The exam will be automatically submitted.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary">Continue</Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            {this.state.isAuth && (
              <Container>
                <Row>
                  <h1>{this.state.exam.title}</h1>
                </Row>
                <Row>
                  <Col></Col>
                  <Col>
                    <Row>
                      <h2>Progress</h2>
                      <Countdown date={Date.now() + 10000}>
                        {this.Completionist()}
                      </Countdown>
                    </Row>
                    <Row>
                    <Webcam />
                    </Row>
                  </Col>
                </Row>
              </Container>
            )}
            {!this.state.isAuth && (
              <Alert variant="danger">
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                  To access this page you must be authenticated. Please log in.
                </p>
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Exam;
