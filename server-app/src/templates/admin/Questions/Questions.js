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
        .get("/questions", {
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
    const questions = this.state.questions.map(function (d, idx) {
      const editPath = "/questions/question?id=" + d._id;
      return (
        <tr key={idx}>
            <td>{d.title}</td>
            <td>{d.questionType.label}</td>
            <td>
              <ul>{d.topics.map((it, i) => {
                return (
                  <li key={i}>{it.name}</li>
                )
              })}
              </ul>
            </td>
            <td>
            <Link to={editPath}><FaEdit className='smallIcon'/></Link>
            <Link onClick={() => that.removeQuestion(d._id)}>
              <FaRegWindowClose className='smallIcon'/>
            </Link>
          </td>
        </tr>
      );
    });
    return questions;
  }

  removeQuestion = (idx) => {
    const token = localStorage.getItem("token");
    axios.delete("/questions/" + idx, {
      crossDomain: true,
      headers: { Authorization: "Bearer " + token },
    })
    .then((res) => {
      this.setState({ questions: res.data });
    })
    .catch((err) => console.log(err));
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            {this.state.isAuth && (
              <React.Fragment>
                <h1 style={{marginBottom: '30px'}}>Questions</h1>
                <Button className='yellowBack button'>
                  <NavLink to="/questions/question">Create question</NavLink>
                </Button>
              </React.Fragment>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr className='yellowBack'>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Topic</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{this.listQuestions()}</tbody>
            </Table>
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
