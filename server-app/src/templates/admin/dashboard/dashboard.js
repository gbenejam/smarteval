import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import { FaEdit, FaRegWindowClose } from "react-icons/fa";


//import classes from './dashboard.module.css'

class AdminDashboard extends Component {
  state = {
    dashboard: '',
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
    const that = this
    if(this.state.dashboard.currentExams) {
    const currentExams = this.state.dashboard.currentExams.map(function (d, idx) {
        return (
          <tr key={idx}>
            <td>{d.title}</td>
          </tr>
        );
      });
      return currentExams;
    }
  }

  listLatestExams() {
    const that = this
    if(this.state.dashboard.currentExams) {
    const currentExams = this.state.dashboard.currentExams.map(function (d, idx) {
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
            <CardDeck>
              <Card>
                <Card.Body>
                  <Card.Title>Exams</Card.Title>
                  <Card.Text>
                    <h1>{this.state.dashboard.totalExams}</h1>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Link to="/admin/exams">Go to exams</Link>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>Questions</Card.Title>
                  <Card.Text>
                    <h1>{this.state.dashboard.totalQuestions}</h1>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Link to="/questions">Go to questions</Link>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>Users</Card.Title>
                  <Card.Text>
                    <h1>{this.state.dashboard.totalUsers}</h1>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Link to="/users">Go to users</Link>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>Groups</Card.Title>
                  <Card.Text>
                    <h1>{this.state.dashboard.totalGroups}</h1>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Link to="/groups">Go to groups</Link>
                </Card.Footer>
              </Card>
            </CardDeck>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>Exams in progress</h1>

            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                  {this.listCurrentExams()}
              </tbody>
            </Table>
          </Col>
          <Col>
            <h1>Latest exams</h1>

            <Table striped bordered hover size="sm">
            <thead>
                <tr>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                  {this.listLatestExams()}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AdminDashboard;
