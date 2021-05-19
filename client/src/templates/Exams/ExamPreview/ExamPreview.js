import React, { Component } from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

class ExamPreview extends Component {
  state = {
    exam: [],
    isAuth: false,
    examPath: ''
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
            this.setState({ exam: res.data, examPath: "/user/exams/exam?id=" + res.data._id });
          })
          .catch((err) => console.log(err));
      }
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
                  <h1>{this.state.exam.title}</h1>
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
                              <Nav.Link eventKey="second">
                                Instruccions
                              </Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </Col>
                        <Col sm={9}>
                          <Tab.Content>
                            <Tab.Pane eventKey="first">
                              <p>
                                Start date: {this.state.exam.startDate} End
                                date: {this.state.exam.endDate}
                              </p>
                              <p>Numero preguntes: {this.state.exam.questions && this.state.exam.questions.length}</p>
                              <p>
                                Topics:{" "}
                                {this.state.exam.topics &&
                                  this.state.exam.topics.map((item) => {
                                    return item.name;
                                  })}
                              </p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                              <p>Instruccions: {this.state.exam.description}</p>
                              <p>Duracio: {this.state.exam.duration} minuts</p>
                              <Button><Link to={this.state.examPath}>Access</Link></Button>
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