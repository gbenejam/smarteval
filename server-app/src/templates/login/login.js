import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  render() {
    return (
      <Container>
        <Row>
          <Col xs={6} md={4}></Col>
          <Col xs={6} md={4}>
            <Form>
              <Form.Group controlId="formGroupUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={this.state.username}
                  onChange={(event) =>
                    this.setState({ username: event.target.value })
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
