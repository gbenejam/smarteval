import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Table from "react-bootstrap/Table";


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
    if(this.state.dashboard.latestExams) {
    const currentExams = this.state.dashboard.latestExams.map(function (d, idx) {
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
            <CardDeck>
              <Card>
                <Card.Body>
                  <Card.Text>
                    <h1>{this.state.dashboard.totalExams}</h1>
                  </Card.Text>
                  <Card.Title>Exams</Card.Title>
                </Card.Body>
                <Card.Footer className='yellowBack button' >
                  <Link to="/admin/exams">Go to exams</Link>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Text>
                    <h1>{this.state.dashboard.totalQuestions}</h1>
                  </Card.Text>
                  <Card.Title>Questions</Card.Title>
                </Card.Body>
                <Card.Footer className='yellowBack button' >
                  <Link to="/questions">Go to questions</Link>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Text>
                    <h1>{this.state.dashboard.totalUsers}</h1>
                  </Card.Text>
                  <Card.Title>Users</Card.Title>
                </Card.Body>
                <Card.Footer className='yellowBack button' >
                  <Link to="/users">Go to users</Link>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Text>
                    <h1>{this.state.dashboard.totalGroups}</h1>
                  </Card.Text>
                  <Card.Title>Groups</Card.Title>
                </Card.Body>
                <Card.Footer className='yellowBack button' >
                  <Link to="/groups">Go to groups</Link>
                </Card.Footer>
              </Card>
            </CardDeck>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover size="sm">
              <thead>
                <tr className='yellowBack'>
                  <th style={{fontWeight: "500"}}>Current exams</th>
                </tr>
              </thead>
              <tbody>
                  {this.listCurrentExams()}
              </tbody>
            </Table>
          </Col>
          <Col>
            <Table striped bordered hover size="sm">
            <thead>
                <tr className='yellowBack'>
                  <th style={{fontWeight: "500"}}>Past exams</th>
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
