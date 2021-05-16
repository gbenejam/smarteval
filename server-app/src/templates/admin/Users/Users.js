import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { FaRegWindowClose } from "react-icons/fa";

//import classes from './dashboard.module.css'

class AdminUsers extends Component {
  state = {
    users: [],
    isAuth: false,
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ isAuth: true });
      axios
        .get("http://localhost:3030/users", {
          crossDomain: true,
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.setState({ users: res.data });
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
          <Col>
            {this.state.isAuth && (
              <div>
                <h1>Users</h1>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>name</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.users.map(function (d, idx) {
                      return (
                        <tr id={d._id} key={idx}>
                          <td>{d.name}</td>
                          <td>{d.username}</td>
                          <td>{d.email}</td>
                          <td>
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
        </Row>
      </Container>
    );
  }
}

export default AdminUsers;
