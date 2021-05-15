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

class Questions extends Component {
  state = {
    questions: [],
    isAuth: false,
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ isAuth: true });
      axios
        .get("http://localhost:3030/questions", {
          crossDomain: true,
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.setState({ questions: res.data });
        })
        .catch((err) => console.log(err));
    }
  }

  listQuestions() {
    let that = this;
    console.log("this questions: " + this.state.questions);
    const questions = this.state.questions.map(function (d, idx) {
      return (
        <tr key={idx}>
            <td>{d.title}</td>
            <td>{d.type}</td>
            <td>{d.topic}</td>
            <td>
            <Link onClick={() => that.removeQuestion(d._id)}>
              <FaRegWindowClose />
            </Link>
          </td>
        </tr>
      );
    });
    return questions;
  }

  removeQuestion = () => {
    console.log("Removing the question");
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            {this.state.isAuth && (
              <div>
                <h1>Questions</h1>
                <Button variant="success">
                  <NavLink to="/questions/question">Create question</NavLink>
                </Button>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Type</th>
                      <th>Topic</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>{this.listQuestions()}</tbody>
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

export default Questions;
