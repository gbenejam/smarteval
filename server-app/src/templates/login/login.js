import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  loginHandler = (event) => {
    event.preventDefault();
    console.log(this.state);
    axios
      .post("http://localhost:3030/users/login", this.state, {
        crossDomain: true,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.user._id);
        localStorage.setItem("isAdmin", res.data.user.isAdmin);
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <Container>
        <Row>
          <Col xs={6} md={4}></Col>
          <Col xs={6} md={4}>
            <Form onSubmit={this.loginHandler}>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your email"
                  value={this.state.email}
                  onChange={(event) =>
                    this.setState({ email: event.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={(event) =>
                    this.setState({ password: event.target.value })
                  }
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
            <a href="#new-user">New user?</a>
          </Col>
          <Col xs={6} md={4}></Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
