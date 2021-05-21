import React, { Component } from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Accordion from 'react-bootstrap/Accordion'
import { FaRegEdit, FaRegWindowClose, FaGraduationCap } from "react-icons/fa";

import dateFormat from "../../../utils/dateFormat";

class AdminExams extends Component {
  state = {
    exams: [],
    isAuth: false,
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ isAuth: true });
      axios
        .get("http://localhost:3030/admin/exams/exam/mark/" + id, {
          crossDomain: true,
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.setState({ exams: res.data });
        })
        .catch((err) => console.log(err));
    }
  }

  removeExam = (idx) => {
    const token = localStorage.getItem("token");
    axios
      .delete("http://localhost:3030/admin/exams/" + idx, {
        crossDomain: true,
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        this.setState({ exams: res.data });
      })
      .catch((err) => console.log(err));
  };

  listExams() {
    const that = this;
    const exams = this.state.exams.map(function (d, idx) {
      const editPath = "/admin/exams/exam?id=" + d._id;
      const markPath = "/admin/exams/exam/mark?id=" + d._id;

      return (
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Access exam
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>Hello! I'm the body</Card.Body>
          </Accordion.Collapse>
        </Card>
      );
    });
    return exams;
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1 style={{ marginBottom: "30px" }}>Mark exam</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            {this.state.isAuth && (
              <Accordion defaultActiveKey="0">{this.listExams()}</Accordion>
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

export default AdminExams;
