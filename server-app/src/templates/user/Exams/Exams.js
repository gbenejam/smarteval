import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

import dateFormat from '../../../utils/dateFormat';

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
        .get("http://localhost:3030/user/groups", {
          crossDomain: true,
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.setState({ exams: res.data });
        })
        .catch((err) => console.log(err));
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

  listExams() {
    const exams = this.state.exams.map(function (d, idx) {
      return (
        <tr id={d._id} key={idx}>
          <td>{d.code}</td>
          <td>{d.title}</td>
          <td>
            <ul>{d.topics && d.topics.map(function (item, i) {
              return (<li key={i}>{item.name}</li>)
            })}</ul>
          </td>
          <td>{d.description}</td>
          <td>{dateFormat(d.startDate)}</td>
          <td>{dateFormat(d.endDate)}</td>
          <td>{d.duration}</td>
        </tr>
      );
    });
    return exams;
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1>Exams </h1>
          </Col>
        </Row>
        <Row>
          <Col>
            {this.state.isAuth && (
              <Table striped bordered hover>
                <thead>
                  <tr className='yellowBack'>
                    <th>Code</th>
                    <th>Title</th>
                    <th>Topics</th>
                    <th>Description</th>
                    <th>Start date</th>
                    <th>End date</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>{this.listExams()}</tbody>
              </Table>
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
