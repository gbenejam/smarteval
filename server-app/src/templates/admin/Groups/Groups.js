import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { FaEdit, FaRegWindowClose } from "react-icons/fa";

class AdminGroups extends Component {
  state = {
    groups: [],
    isAuth: false,
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ isAuth: true });
      axios
        .get("http://localhost:3030/groups", {
          crossDomain: true,
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.setState({ groups: res.data });
        })
        .catch((err) => console.log(err));
    }
  }

  removeGroup(idx) {
    const token = localStorage.getItem("token");
    axios.delete("http://localhost:3030/groups/" + idx, {
      crossDomain: true,
      headers: { Authorization: "Bearer " + token },
    })
    .then((res) => {
      this.setState({ groups: res.data });
    })
    .catch((err) => console.log(err));
  }

  listGroups() {
    const that = this
    const groups = this.state.groups.map(function (d, idx) {
      const editPath = "/groups?id=" + d._id;
      return (
        <tr key={idx}>
          <td>{d.name}</td>
          <td>
            <ul>{d.users.map((it, i) => {
              return (
                <li key={i}>{it.name}</li>
              )
            })}
            </ul>
          </td>
          <td>
            <Link to={editPath}><FaEdit /></Link>
             <Link onClick={() => that.removeGroup(d._id)}><FaRegWindowClose /></Link>
          </td>
        </tr>
      );
    });
    return groups;
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            {this.state.isAuth && (
              <div>
                <h1>Groups</h1>
                <Button variant="success">
                  <NavLink to="/groups/group">Create new group</NavLink>
                </Button>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Users</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>{this.listGroups()}</tbody>
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

export default AdminGroups;
