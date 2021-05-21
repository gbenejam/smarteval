import React, { Component } from "react";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";

import classes from "./User.module.css";

class NewUser extends Component {
  state = {
    name: "",
    username: "",
    email: "",
    password: "randomPass",
    isAdmin: false,
  };

  newUserHandler = (event) => {
    const token = localStorage.getItem("token");
    event.preventDefault();

    axios
      .post("http://localhost:3030/users", this.state, {
        crossDomain: true,
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        alert("User added");
        window.location.assign("/users");
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <Container>
        <Row className={classes.CenteredHorizontally}>
          <Col xs={8} md={8}>
            <div className={classes.Container}>
              <h1>New user details</h1>
            </div>
            <Form className={`${classes.Container} ${classes.RegisterForm}`}>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={(event) =>
                    this.setState({ email: event.target.value })
                  } required/>
              </Form.Group>
              <Form.Row className={classes.FormRow}>
                <Form.Group
                  as={Col}
                  controlId="formGridName"
                  className={classes.FormColumn}
                >
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter name" value={this.state.name} onChange={(event) =>
                    this.setState({ name: event.target.value })
                  } required/>
                </Form.Group>

                <Form.Group
                  as={Col}
                  controlId="formGridUsername"
                  className={classes.FormColumn}
                >
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="@Username" value={this.state.username} onChange={(event) =>
                    this.setState({ username: event.target.value })
                  } required />
                </Form.Group>
              </Form.Row>
              <Alert variant="secondary">
                The default password for all new users is randomPass.
              </Alert>
              <Button
                className={classes.RegisterButton}
                variant="primary"
                type="submit"
                onClick={this.newUserHandler}
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

export default NewUser;
