import React, { Component } from "react";

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
          console.log(res);
          let tmmp = res.data.map((item) => {
            return {value: item._id, label: item.name};
          })
          this.setState({
              userSelect: tmmp
          })
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
              users,
            });
          })
          .catch((err) => console.log(err));
      }
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs={6} md={1}></Col>
          <Col xs={6} md={10}>
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
                  options={this.state.userSelect}
                  onChange={(event) => {
                    this.setState({ groups: event }, () =>
                      console.log(this.state.userSelect)
                    );
                  }}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
          <Col xs={6} md={1}></Col>
        </Row>
      </Container>
    );
  }
}

export default NewGroup;
