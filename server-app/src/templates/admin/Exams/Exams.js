import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { FaEdit, FaRegWindowClose } from "react-icons/fa";

//import classes from './dashboard.module.css'

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

  removeExam = () => {
    console.log("Removing the exam");
    window.location.reload();
  };

  render() {
    return (
      <Container>
        <Row>
          <Col xs={6} md={1} />
          <Col xs={6} md={10}>
            {this.state.isAuth && (
              <div>
                <h1>Exams</h1>
                <Button variant="success">
                  <NavLink to="/admin/exams/exam">Create exam</NavLink>
                </Button>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Title</th>
                      <th>Topic</th>
                      <th>Description</th>
                      <th>Start date</th>
                      <th>End date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.exams.map(function (d, idx) {
                      const editPath = "/admin/exams/exam?id=" + d._id;
                      return (
                        <tr id={d._id} key={idx}>
                          <td>{d.code}</td>
                          <td>{d.title}</td>
                          <td>{d.topic}</td>
                          <td>{d.description}</td>
                          <td>{d.startDate}</td>
                          <td>{d.endDate}</td>
                          <td>
                            <NavLink to={editPath}>
                              <FaEdit />
                            </NavLink>
                            <FaRegWindowClose />
                          </td>
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
