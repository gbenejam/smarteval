import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

class UserDashboard extends Component {
  state = {
    dashboard: "",
    isAuth: false,
  };
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ isAuth: true });
      axios
        .get("http://localhost:3030/user/dashboard", {
          crossDomain: true,
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.setState({ dashboard: res.data });
        })
        .catch((err) => console.log(err));
    }
  }

  listCurrentExams() {
    if (this.state.dashboard.currentExams) {
      const currentExams = this.state.dashboard.currentExams.map(function (
        d,
        idx
      ) {
        return (
          <tr key={idx}>
            <td>{d.title}</td>
          </tr>
        );
      });
      return currentExams;
    }
  }

   listPastExams() {
    if (this.state.dashboard.pastExams) {
      const currentExams = this.state.dashboard.pastExams.map(function (
        d,
        idx
      ) {
        return (
          <tr key={idx}>
            <td>{d.title}</td>
          </tr>
        );
      });
      return currentExams;
    }
  }

  listFutureExams() {
    if (this.state.dashboard.futureExams) {
      const currentExams = this.state.dashboard.futureExams.map(function (
        d,
        idx
      ) {
        return (
          <tr key={idx}>
            <td>{d.title}</td>
          </tr>
        );
      });
      return currentExams;
    }
  }
  render() {
    return (
      <Container>
        <Row>
          <Col />
          <Col>
            <h1>Dashboard</h1>
          </Col>
          <Col />
        </Row>
        <Row>
          <Col>
            <h2>Your exams in progress</h2>

            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>{this.listCurrentExams()}</tbody>
            </Table>
          </Col>
          <Col>
            <h2>Your next exams</h2>

            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>{this.listFutureExams()}</tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Your past exams</h2>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>{this.listPastExams()}</tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default UserDashboard;
