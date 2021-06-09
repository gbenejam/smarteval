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
      setTimeout(() => {
        this.setState({ isAuth: true });
        axios
          .get("/dashboard/user", {
            crossDomain: true,
            headers: { Authorization: "Bearer " + token },
          })
          .then((res) => {
            console.log(res.data);
            this.setState({ dashboard: res.data });
          })
          .catch((err) => console.log(err));
      }, 300);
    }
  }

  listExams(examsListName) {
    let exams = []
    if (this.state.dashboard[examsListName]) {
        exams = this.state.dashboard[examsListName].map((d, idx) => {
        return (
          <tr key={idx}>
            <td>{d.title}</td>
          </tr>
        );
      });
    }
    return exams;
  }

  listCurrentExams() {
    return this.listExams('currentExams');
  }

  listPastExams() {
    return this.listExams('pastExams');
  }

  listFutureExams() {
    return this.listExams('futureExams');
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
              <tbody>{this.listFutureExams()}</tbody>
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
              <tbody>{this.listPastExams()}</tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default UserDashboard;
