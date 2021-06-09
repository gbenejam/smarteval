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
    isNewExam: true,
    examId: null, // only set if the exam is being updated
    title: "",
    code: "",
    description: "",
    startDate: "",
    endDate: "",
    duration: "",
    questions: [],
    groups: [],
    topics: [],
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
        .get("/questions", {
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
        .get("/topics", {
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
        .get("/groups", {
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
          .get("/exams/admin/" + id, {
            crossDomain: true,
            headers: { Authorization: "Bearer " + token },
          })
          .then((res) => {
            const title = res.data.title ? res.data.title : "";
            const code = res.data.code ? res.data.code : "";
            const description = res.data.description
              ? res.data.description
              : "";
            const duration = res.data.duration ? res.data.duration : "";
            const topics = res.data.topics ? res.data.topics.map(
              topic => { return {label: topic.name, value: topic._id} }) : [];
            const startDate = res.data.startDate ? new Date(res.data.startDate) : "";
            const endDate = res.data.endDate ? new Date(res.data.endDate) : "";
            const questions = res.data.questions ? res.data.questions.map(
              question => { return {label: question.name, value: question._id} }) : [];
            const groups = res.data.groups ? res.data.groups.map(
              group => { return {label: group.name, value: group._id} }) : [];

            this.setState({
              title,
              code,
              description,
              duration,
              topics,
              startDate,
              endDate,
              questions,
              groups,
              isNewExam: false,
              examId: id
            });
          })
          .catch((err) => {
            console.log(err);
            this.setState({isNewExam: false, examId: id});
          });
      }
    }
  }

  examHandler = (event) => {
    event.preventDefault();
    var topics = this.state.topics.map((item) => {
      return { _id: item.value, name: item.label };
    });

    var questions = this.state.questions.map((item) => {
      return { _id: item.value, name: item.label };
    });

    var groups = this.state.groups.map((item) => {
      return { _id: item.value, name: item.label };
    });

    const exam = {
      title: this.state.title,
      code: this.state.code,
      topics: topics,
      description: this.state.description,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      groups: groups,
      duration: this.state.duration,
      questions: questions,
    };

    if (this.state.isNewExam) {
      this.addExam(exam);
    } else {
      this.updateExam(exam);
    }
  };

  addExam(exam) {
    axios.post("/exams/admin", exam, {
      crossDomain: true,
      headers: { Authorization: "Bearer " + this.state.token },
    }).then((res) => {
      alert("Exam added");
      this.props.history.replace('/admin/exams');
    }).catch((err) => console.log(err));
  }

  updateExam(exam) {
    axios.patch("/exams/admin" + this.state.examId, exam, {
      crossDomain: true,
      headers: { Authorization: "Bearer " + this.state.token }
    }).then((res) => {
      alert("Exam updated");
      this.props.history.replace('/admin/exams');
    }).catch((err) => console.log(err));
  }

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
                value={this.state.topics}
                onChange={(event) => {
                  this.setState({ topics: event });
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
                  timeFormat="HH:mm"
                  required
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
                value={this.state.groups}
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
                value={this.state.questions}
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
