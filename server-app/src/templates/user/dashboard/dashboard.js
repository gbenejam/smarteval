import React, { Component } from "react";
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
        .get("http://localhost:3030/admin/dashboard", {
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
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1>Dashboard</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover size="sm">
              <thead>
                <tr className='yellowBack'>
                  <th>Your exams in progress</th>
                </tr>
              </thead>
              <tbody>{this.listCurrentExams()}</tbody>
            </Table>
          </Col>
          <Col>
            <Table striped bordered hover size="sm">
              <thead>
                <tr className='yellowBack'>
                  <th>Your next exams</th>
                </tr>
              </thead>
              <tbody>{this.listCurrentExams()}</tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr className='yellowBack'>
                  <th>Your past exams</th>
                </tr>
              </thead>
              <tbody>{this.listCurrentExams()}</tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default UserDashboard;
