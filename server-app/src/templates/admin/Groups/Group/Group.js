import React, { Component } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Select from "react-select";

class NewGroup extends Component {
  state = {
    users: [],
    name: "",
    userSelect: [],
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:3030/users", {
          crossDomain: true,
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          let tmmp = res.data.map((item) => {
            return { value: item._id, label: item.name };
          });
          this.setState({
            userSelect: tmmp,
          });
        })
        .catch((err) => console.log(err));

      if (window.location.search) {
        const id = window.location.search.replace("?id=", "");

        this.setState({ isAuth: true });
        axios
          .get("http://localhost:3030/groups/" + id, {
            crossDomain: true,
            headers: { Authorization: "Bearer " + token },
          })
          .then((res) => {
            const name = res.data.name ? res.data.name : "";
            const users = res.data.users ? res.data.users : [];
            this.setState({
              name,
              users: users.map((item) => {
                return { value: item._id, label: item.name };
              }),
            });
          })
          .catch((err) => console.log(err));
      }
    }
  }

  groupHandler = (event) => {
    const token = localStorage.getItem("token");
    event.preventDefault();
    var users = this.state.users.map((item) => {
      return { _id: item.value, name: item.label };
    });

    const group = {
      name: this.state.name,
      users: users,
    };
    console.log(group);
    if (window.location.search) {
      const id = window.location.search.replace("?id=", "");
      axios
        .patch("http://localhost:3030/groups/" + id, group, {
          crossDomain: true,
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          alert("Group Updated");
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("http://localhost:3030/groups", group, {
          crossDomain: true,
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          alert("Group added");
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    return (
      <Container>
        <Row>
          <Link to="/groups">Back</Link>
        </Row>
        <Row>
          <Col>
            <Form>
              <Form.Row>
                <Form.Group as={Col} controlId="formGroupTitle">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter name"
                    value={this.state.name}
                    onChange={(event) =>
                      this.setState({ name: event.target.value })
                    }
                  />
                </Form.Group>
              </Form.Row>
              <Form.Group>
                <Form.Label>Users</Form.Label>
                <Select
                  isMulti="true"
                  value={this.state.users}
                  options={this.state.userSelect}
                  onChange={(event) => {
                    this.setState({ users: event }, () =>
                      console.log(this.state.userSelect)
                    );
                  }}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={this.groupHandler}
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default NewGroup;
