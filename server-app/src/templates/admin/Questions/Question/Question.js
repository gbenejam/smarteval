import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import Select from "react-select";

import { Link } from "react-router-dom";

//import classes from './dashboard.module.css'

class NewQuestion extends Component {
  state = {
    title: "",
    questionType: "",
    typeSelect: [
      { label: "Multichoice", value: "multichoice" },
      { label: "Text", value: "text" },
    ],
    topic: [],
    topicSelect: [],
    options: [],
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ isAuth: true });
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
      if (window.location.search) {
        const id = window.location.search.replace("?id=", "");
        axios
          .get("http://localhost:3030/questions/" + id, {
            crossDomain: true,
            headers: { Authorization: "Bearer " + token },
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => console.log(err));
      }
    }
  }

  displayQuestion = () => {
    const type = this.state.questionType;
    if (type.value === "text") {
      return (
        <Form.Group>
          <Form.Label>Answer</Form.Label>
          <Form.Control
            type="text"
            placeholder="No answer required for text questions."
            readOnly
          />
        </Form.Group>
      );
    } else if (type.value === "multichoice") {
      return (
        <Form.Group>
          <Form.Label>Answer</Form.Label>
          <Form.Control
            placeholder="Add option"
          />
          <Form.Control
            placeholder="Add option"
          />
          <Form.Control
            placeholder="Add option"
          />
          <Form.Control
            placeholder="Add option"
          />
        </Form.Group>
      );
    } else {
      return (
        <Form.Group>
          <Form.Label>Answer</Form.Label>
          <Alert variant="secondary">Please select a question type.</Alert>
        </Form.Group>
      );
    }
  };

  handleQuestion = (event) => {
    const token = localStorage.getItem("token");
    event.preventDefault();
    var options = this.state.options ? this.state.options.map((item) => {
      return { _id: item.value, name: item.label };
    }) : [];

    var topic = this.state.topic ? this.state.topic.map((item) => {
      return { _id: item.value, name: item.label };
    }) : [];

    const question = {
      title: this.state.title,
      questionType : this.state.questionType.value,
      options: options,
      topics: topic
    };
    console.log(question);
    if (window.location.search) {
      const id = window.location.search.replace("?id=", "");
      axios
        .patch("http://localhost:3030/questions/" + id, question, {
          crossDomain: true,
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          alert("Question Updated");
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("http://localhost:3030/questions", question, {
          crossDomain: true,
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          alert("Question added");
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    return (
      <Container>
        <Row>
          <Link to="/questions">Back</Link>
        </Row>
        <Row>
          <Col>
            <Form>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Question title</Form.Label>
                    <Form.Control
                      value={this.state.title}
                      onChange={(event) =>
                        this.setState({ title: event.target.value })
                      }
                      placeholder="Question"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Question type</Form.Label>
                    <Select
                      required
                      options={this.state.typeSelect}
                      onChange={(event) => {
                        this.setState({ questionType: event });
                        this.displayQuestion();
                      }}
                    />
                  </Form.Group>
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
                </Col>
                <Col>
                  {this.displayQuestion()}
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={this.handleQuestion}>
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default NewQuestion;
