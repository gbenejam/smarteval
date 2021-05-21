import React, { Component } from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import Badge from 'react-bootstrap/Badge'

import dateFormat from "../../../../utils/dateFormat";

class AdminExams extends Component {
  state = {
    exams: [],
    isAuth: false,
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ isAuth: true });
      if (window.location.search) {
        const id = window.location.search.replace("?id=", "");
        axios
          .get("http://localhost:3030/solved-exam/all/" + id, {
            crossDomain: true,
            headers: { Authorization: "Bearer " + token },
          })
          .then((res) => {
            this.inputRefs = res.data.map(_ => React.createRef());
            this.setState({ exams: res.data });
          })
          .catch((err) => console.log(err));
      }
    }
  }

  submitMark(event) {
    event.preventDefault();
    const test = 0;
    /*axios
      .patch("http://localhost:3030/solved-exam/update/")*/
  };

  listExams() {
    const that = this;
    let counter = 0;
    const exams = this.state.exams.map(function (d, idx) {
      counter = counter + 1;
      return (
        <Card key={idx}>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              View exam
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Col>
                <h2>{d.title}</h2>
                {!d.grade && (<Badge style={{marginBottom: '20px'}} variant="warning">Ungraded</Badge>)}
                {d.grade && (<Badge style={{marginBottom: '20px'}} variant="success">Graded</Badge>)}
                <p>Duration: {d.duration}</p>
                <p>Exam was started at: {dateFormat(d.initExam)}</p>
                <p>Exam was done at: {dateFormat(d.doneExam)}</p>
                <h3>Questions</h3>
                <ul>
                  {d.questions.map(function (el, i) {
                    return (
                      <li>
                        Question: {el.name}
                        <ul>
                          <li>{el.answer}</li>
                        </ul>
                      </li>
                    );
                  })}
                </ul>
                <h3>Grade</h3>
                {d.grade && (<p>{d.grade}</p>)}
                <Form>
                  <Row>
                    <Col>
                      <Form.Control
                        ref={that.inputRefs[idx]}
                        type="text"
                        placeholder="Add grade"
                      />
                    </Col>
                    <Col>
                      <Button
                        className="yellowBack button"
                        type="submit"
                        onClick={that.submitMark.bind({that: this, exam: d, index: idx})}>
                        Grade
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      );
    });
    return exams;
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1 style={{ marginBottom: "30px" }}>Grade exam</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            {this.state.isAuth && <Accordion>{this.listExams()}</Accordion>}
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

export default AdminExams;
