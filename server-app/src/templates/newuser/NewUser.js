import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class NewUser extends Component {
  state = {
    name: "",
    username: "",
    email: "",
    password: "",
  };

  render() {
    return (
      <Container>
        <Row>
          <Col xs={6} md={2}></Col>
          <Col xs={6} md={8}>
              <h1>New user details</h1>
            <Form>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter name" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="@Username" />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridPassword1">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type="password" placeholder="Enter password" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Repeat password:</Form.Label>
                  <Form.Control type="password" placeholder="Please re-enter password" />
                </Form.Group>
              </Form.Row>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
          <Col xs={6} md={2}></Col>
        </Row>
      </Container>
    );
  }
}

export default NewUser;
