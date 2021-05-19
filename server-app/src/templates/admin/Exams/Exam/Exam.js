import React, { Component } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Select from "react-select";
import Datetime from "react-datetime";
import Table from "react-bootstrap/Table";

import "react-datetime/css/react-datetime.css";
import classes from './Exam.module.css'

class NewExam extends Component {
  state = {
    token: "",
    isAuth: false,
    title: "",
    code: "",
    description: "",
    startDate: "",
    endDate: "",
    duration: "",
    questions: [],
    groups: [],
    topic: [],
    questionSelect: [],
    topicSelect: [],
    groupSelect: [],
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ isAuth: true, token: token });
      //Getting questions to populate the select
      axios
        .get("http://localhost:3030/questions", {
          crossDomain: true,
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          let tmp = res.data.map((item) => {
            return { value: item._id, label: item.title };
          });
          this.setState({ questionSelect: tmp });
        })
        .catch((err) => console.log(err));
      //Getting topics to populate the select
      axios
        .get("http://localhost:3030/topics", {
          crossDomain: true,
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          let tmp = res.data.map((item) => {
            return { value: item._id, label: item.name };
          });
          this.setState({ topicSelect: tmp });
        })
        .catch((err) => console.log(err));
      //Getting the groups to populate the select
      axios
        .get("http://localhost:3030/groups", {
          crossDomain: true,
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          let tmp = res.data.map((item) => {
            return { value: item._id, label: item.name };
          });
          this.setState({ groupSelect: tmp });
        })
        .catch((err) => console.log(err));
      //If there's an id param in the url, it populates the fields with the exam info from the DB
      if (window.location.search) {
        const id = window.location.search.replace("?id=", "");
        axios
          .get("http://localhost:3030/admin/exams/" + id, {
            crossDomain: true,
            headers: { Authorization: "Bearer " + token },
          })
          .then((res) => {
            const title = res.data.title ? res.data.title : "";
            const code = res.data.code ? res.data.code : "";
            const description = res.data.description
              ? res.data.description
              : "";
            const topic = res.data.topic ? res.data.topic : [];
            const startDate = res.data.startDate ? res.data.startDate : "";
            const endDate = res.data.endDate ? res.data.endDate : "";
            const questions = res.data.questions ? res.data.questions : [];
            const groups = res.data.groups ? res.data.groups : [];
            this.setState({
              title,
              code,
              description,
              topic,
              startDate,
              endDate,
              questions,
              groups,
            });
          })
          .catch((err) => console.log(err));
      }
    }
  }

  examHandler = (event) => {
    event.preventDefault();
    var topic = this.state.topic.map((item) => {
      return { _id: item.value, name: item.label };
    });

    var question = this.state.questions.map((item) => {
      return { _id: item.value, name: item.label };
    });

    var group = this.state.groups.map((item) => {
      return { _id: item.value, name: item.label };
    });

    const exam = {
      title: this.state.title,
      code: this.state.code,
      topics: topic,
      description: this.state.description,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      groups: group,
      duration: this.state.duration,
      questions: question,
    };
    axios
      .post("http://localhost:3030/admin/exams", exam, {
        crossDomain: true,
        headers: { Authorization: "Bearer " + this.state.token },
      })
      .then((res) => {
        alert("Exam added");
        window.location.assign('/admin/exams');
      })
      .catch((err) => console.log(err)); 
  };

  render() {
    const examForm = (
      <Form onSubmit={this.examHandler}>
        <Form.Row>
          <Col className={classes.Column}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGroupTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="title"
                  required
                  placeholder="Enter title"
                  value={this.state.title}
                  onChange={(event) =>
                    this.setState({ title: event.target.value })
                  }
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridCode">
                <Form.Label>Code</Form.Label>
                <Form.Control
                  type="number"
                  required
                  placeholder="Enter code"
                  value={this.state.code}
                  onChange={(event) =>
                    this.setState({ code: event.target.value })
                  }
                />
              </Form.Group>
            </Form.Row>
            <Form.Group>
              <Form.Label>Topic</Form.Label>
              <Select
                isMulti="true"
                required
                options={this.state.topicSelect}
                onChange={(event) => {
                  this.setState({ topic: event });
                }}
              />
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  required
                  placeholder="Description"
                  value={this.state.description}
                  onChange={(event) =>
                    this.setState({ description: event.target.value })
                  }
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridStartDate">
                <Form.Label>Start date</Form.Label>
                <Datetime
                  value={this.state.startDate}
                  dateFormat="YYYY-MM-DD"
                  timeFormat="HH:mm"
                  required
                  input="false"
                  onChange={(event) => {
                    this.setState({ startDate: event._d });
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridEndDate">
                <Form.Label>End date</Form.Label>
                <Datetime
                  value={this.state.endDate}
                  dateFormat="YYYY-MM-DD"
                  required
                  timeFormat="HH:mm"
                  input="false"
                  onChange={(event) => {
                    this.setState({ endDate: event._d });
                  }}
                />
              </Form.Group>
            </Form.Row>
            <Form.Group controlId="formGridCode">
                <Form.Label>Duration</Form.Label>
                <Form.Control
                  type="number"
                  required
                  placeholder="Enter duration in minutes"
                  value={this.state.duration}
                  onChange={(event) =>
                    this.setState({ duration: event.target.value })
                  }
                />
              </Form.Group>
          </Col>
          <Col className={classes.Column}>
            <Form.Group>
              <Form.Label>Groups</Form.Label>
              <Select
                isMulti="true"
                required
                options={this.state.groupSelect}
                onChange={(event) => {
                  this.setState({ groups: event });
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Questions</Form.Label>
              <Select
                isMulti="true"
                required
                options={this.state.questionSelect}
                onChange={(event) => {
                  this.setState({ questions: event });
                }}
              />
            </Form.Group>
            <Button className='yellowBack button' type="submit">
              Submit
            </Button>
          </Col>
        </Form.Row>
      </Form>
    );

    return (
      <Container>
        <Row>
          <Col>
            <Button className='yellowBack button' variant="success">
              <Link to="/admin/exams">Back</Link>
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table bordered>
              <thead>
                <tr className='yellowBack'>
                  <th>Exam</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{examForm}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default NewExam;
