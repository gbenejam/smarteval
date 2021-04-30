import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
//import classes from './dashboard.module.css'

class AdminExams extends Component {
  state = {
    exams: [
      {
        code: "0001",
        title: "Algebra I",
        description: "La calculadora no esta permesa",
        startDate: "20 Dec 2021",
        endDate: "21 Dec 2021",
      },
      {
        code: "0002",
        title: "Angles II",
        description: "Diccionari permes",
        startDate: "23 Dec 2021",
        endDate: "24 Dec 2021",
      },
    ],
    isAuth: false,
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ isAuth: true });
      axios
        .get("http://localhost:3030/admin/exams", {
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
          <Col xs={6} md={1} />
          <Col xs={6} md={10}>
            {this.state.isAuth && (
              <div>
                <h1>Exams</h1>
                <Button variant="primary">Add exam</Button>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Start date</th>
                      <th>End date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.exams.map(function (d, idx) {
                      return (
                        <tr key={idx}>
                          <td>{d.code}</td>
                          <td>{d.title}</td>
                          <td>{d.description}</td>
                          <td>{d.startDate}</td>
                          <td>{d.endDate}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
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
          <Col xs={6} md={1} />
        </Row>
      </Container>
    );
  }
}

export default AdminExams;
