import React, { Component } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

import classes from "./login.module.css";

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: false,
  };

  loginHandler = (event) => {
    event.preventDefault();
    axios
      .post("/users/login", this.state, {
        crossDomain: true,
      })
      .then((res) => {
        this.setState({error: false})
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.user._id);
        localStorage.setItem("isAdmin", res.data.user.isAdmin);
        if (res.data.user.isAdmin) {
          window.location.assign("/admin/dashboard");
        } else {
          window.location.assign("/user/dashboard");
        }
      })
      .catch((err) => {
        this.setState({error: true})
        console.log(err);
      });
  };

  render() {
    return (
      <Container>
        <Row className={classes.CenteredHorizontally}>
          <Col xs={6} md={6}>
            <div className={classes.LoginContainer}>
              <h1>Log in</h1>
            </div>
            <div className={`${classes.LoginForm} ${classes.LoginContainer}`}>
              <Form onSubmit={this.loginHandler}>
                <Form.Group
                  className={classes.FormGroup}
                  controlId="formGroupEmail"
                >
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your email"
                    value={this.state.email}
                    onChange={(event) =>
                      this.setState({ email: event.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group
                  className={classes.FormGroup}
                  controlId="formGroupPassword"
                >
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
                {this.state.error ? (<Alert variant="danger">
                  Username or password is incorrect.
                </Alert>) : null}
                <Button
                  className={classes.LoginButton}
                  variant="primary"
                  type="submit"
                >
                  Sign in
                </Button>
              </Form>
            </div>
            <div className={classes.LoginContainer}>
              <p>
                New professor? <Link to="/new-user">Sign up</Link>
              </p>
              <Alert variant="secondary">
                If you are a student, your teacher should have given you your
                user/password to be able to log in.
              </Alert>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
