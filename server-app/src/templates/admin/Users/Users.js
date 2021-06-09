import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { FaRegWindowClose } from "react-icons/fa";

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
        .get("/users", {
          crossDomain: true,
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.setState({ users: res.data });
        })
        .catch((err) => console.log(err));
    }
  }

  removeUser = (idx) => {
    const token = localStorage.getItem("token");
    axios.delete("/users/" + idx, {
      crossDomain: true,
      headers: { Authorization: "Bearer " + token },
    })
    .then((res) => {
      console.log(res);
      this.setState({ users: res.data });
    })
    .catch((err) => console.log(err));
  };

  listUsers = () => {
    const that = this;
    const users = this.state.users.map(function (d, idx) {
      return (
        <tr key={idx}>
          <td>{d.name}</td>
          <td>{d.username}</td>
          <td>{d.email}</td>
          <td>
            <Link onClick={() => that.removeUser(d._id)}>
              <FaRegWindowClose className='smallIcon'/>
            </Link>
          </td>
        </tr>
      );
    });
    return users;
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            {this.state.isAuth && (
              <React.Fragment>
                <h1 style={{marginBottom: '30px'}}>Users</h1>
                <Button className='yellowBack button'>
                  <NavLink to="/users/user">Add new user</NavLink>
                </Button>
              </React.Fragment>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            {this.state.isAuth && (
              <Table striped bordered hover>
                <thead>
                  <tr className='yellowBack'>
                    <th>name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.listUsers()}
                </tbody>
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

export default AdminUsers;
