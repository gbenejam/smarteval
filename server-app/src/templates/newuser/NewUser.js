import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";

import classes from './NewUser.module.css';

class NewUser extends Component {
  state = {
    name: "",
    username: "",
    email: "",
    password: "",
    isAdmin: true,
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
        <Row className={classes.CenteredHorizontally} >
          <Col xs={8} md={8}>
            <div className={classes.Container} >
              <h1>New user details</h1>
            </div>
            <Form className={`${classes.Container} ${classes.RegisterForm}`} >
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={(event) =>
                    this.setState({ email: event.target.value })
                  }/>
              </Form.Group>
              <Form.Row className={classes.FormRow} >
                <Form.Group as={Col} controlId="formGridName" className={classes.FormColumn} >
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter name" value={this.state.name} onChange={(event) =>
                    this.setState({ name: event.target.value })
                  }/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridUsername" className={classes.FormColumn} >
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="@Username" value={this.state.username} onChange={(event) =>
                    this.setState({ username: event.target.value })
                  }/>
                </Form.Group>
              </Form.Row>
              <Form.Row className={classes.FormRow} >
                <Form.Group as={Col} controlId="formGridPassword1" className={classes.FormColumn} >
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type="password" placeholder="Enter password" value={this.state.password} onChange={(event) =>
                    this.setState({ password: event.target.value })
                  }/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword" className={classes.FormColumn} >
                  <Form.Label>Repeat password:</Form.Label>
                  <Form.Control type="password" placeholder="Please re-enter password" />
                </Form.Group>
              </Form.Row>
              <Form.Row className={classes.FormRow} >
                <Form.Group as={Col} controlId="formGridCompany" className={classes.FormColumn} >
                  <Form.Label>Company:</Form.Label>
                  <Form.Control type="text" placeholder="Company you represent" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCompanyCode" className={classes.FormColumn} >
                  <Form.Label>Company code:</Form.Label>
                  <Form.Control type="number" placeholder="Numeric code provided by company" />
                </Form.Group>
              </Form.Row>
              <Button className={classes.RegisterButton} variant="primary" type="submit" onClick={this.newUserHandler}>
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
