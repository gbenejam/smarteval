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

import classes from './Question.module.css';

class NewQuestion extends Component {
  state = {
    title: "",
    questionType: "",
    typeSelect: [
      // TODO - Support multichoice
      //{ label: "Multichoice", value: "multichoice" },
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
            const title = res.data.title ? res.data.title : "";
            const questionType = res.data.questionType ? res.data.questionType : {};
            const topics = res.data.topics ? res.data.topics : [];
            const options = res.data.options ? res.data.options : [];
            this.setState({
              title,
              topic: topics.map((item) => {
                return { value: item._id, label: item.name };
              }),
              questionType,
              options: options.map((item) => {
                return { value: item._id, label: item.name };
              })
            });
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
      questionType : this.state.questionType,
      options: options,
      topics: topic
    };
    console.log("Adding question: " + question);
    if (window.location.search) {
      const id = window.location.search.replace("?id=", "");
      axios
        .patch("http://localhost:3030/questions/" + id, question, {
          crossDomain: true,
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          alert("Question Updated");
          window.location.assign('/questions');
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
          window.location.assign('/questions');
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Button className='yellowBack button' variant="success">
              <Link to="/questions">Back</Link>
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              <div className={`${classes.QuestionHeader} yellowBack`}>
                Question
              </div>
              <div className={classes.QuestionBody}>
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
                        className='yellowBack button'
                        type="submit"
                        onClick={this.handleQuestion}>
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default NewQuestion;
