import React, { Component } from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { FaEye } from "react-icons/fa";

class ExamPreview extends Component {
  state = {
    exam: [],
    isAuth: false,
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ isAuth: true });
      axios
        .get("http://localhost:3030/user/exams", {
          crossDomain: true,
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.setState({ exams: res.data });
        })
        .catch((err) => console.log(err));
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            {this.state.isAuth && (
              <Container>
                <Row>
                  <h1>Titol examen</h1>
                </Row>
                <Row>
                <div style={{ backgroundColor: "white" }}>
                  <Tab.Container
                    id="left-tabs-example"
                    defaultActiveKey="first"
                  >
                    <Row>
                      <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                          <Nav.Item>
                            <Nav.Link eventKey="first">Dades</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="second">Instruccions</Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </Col>
                      <Col sm={9}>
                        <Tab.Content>
                          <Tab.Pane eventKey="first">
                            <p>
                              Hola Hola Hola Hola Hola Hola Hola Hola Hola Hola
                              Hola Hola{" "}
                            </p>
                          </Tab.Pane>
                          <Tab.Pane eventKey="second">
                              <p>
                                Adeu Adeu Adeu Adeu Adeu Adeu Adeu Adeu Adeu
                                Adeu Adeu Adeu Adeu{" "}
                              </p>
                              <Button>Access</Button>
                          </Tab.Pane>
                        </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
                  </div>
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

export default ExamPreview;
