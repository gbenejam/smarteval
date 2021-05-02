import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

//import classes from './dashboard.module.css'

class NewExam extends Component {
  state = {
    title: "",
    code: "",
    description: "",
    topic: [],
    startDate: "",
    endDate: "",
    questions: [],
    groups: [],
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
          //this.setState({ questions: res.data });
        })
        .catch((err) => console.log(err));
    }
    const questions = [
      { value: "6089e7b0df7d4cdafa3c510e", label: "Matrix substraction" },
      { value: "6089e7b0df7d4cdafa3c510e", label: "Inverse Matrix" },
      { value: "6089e7b0df7d4cdafa3c510e", label: "Adjoint matrix" },
    ];

    const groups = [
      { value: "chocolate", label: "Algebra Aula 1" },
      { value: "strawberry", label: "Algebra Aula 2" },
      { value: "vanilla", label: "Algebra Aula 3" },
      { value: "chocolate2", label: "Algebra Aula 4" },
      { value: "strawberry2", label: "Algebra Aula 5" },
      { value: "vanilla2", label: "Algebra Aula 6" },
    ];
    this.setState({ questions });
    this.setState({ groups });
  }

  examHandler = (event) => {
    event.preventDefault();
    var topic = this.state.topic.map((item) => {
      return { _id: item.value };
    });

    var question = this.state.questions.map((item) => {
        return { _id: item.value };
      });

      var group = this.state.groups.map((item) => {
        return { _id: item.value };
      });

    const exam = {
      title: this.state.title,
      code: this.state.code,
      topic: topic,
      description: this.state.description,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      groups: group,
      questions: question
    };
    console.log(exam)
  };

  render() {
    return (
      <Container>
        <Row>
          <Col xs={6} md={1}></Col>
          <Col xs={6} md={10}>
            <h1>New exam</h1>
            <Form onSubmit={this.examHandler}>
              <Form.Row>
                <Form.Group as={Col} controlId="formGroupTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="title"
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
                <CreatableSelect
                  isMulti="true"
                  onChange={(event) => {
                    this.setState({ topic: event }, () =>
                      console.log(this.state.topic)
                    );
                  }}
                />
              </Form.Group>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
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
                  <Form.Control
                    type="date"
                    value={this.state.startDate}
                    onChange={(event) =>
                      this.setState({ startDate: event.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEndDate">
                  <Form.Label>End date</Form.Label>
                  <Form.Control
                    type="date"
                    value={this.state.endDate}
                    onChange={(event) =>
                      this.setState({ endDate: event.target.value })
                    }
                  />
                </Form.Group>
              </Form.Row>
              <Form.Group>
                <Form.Label>Questions</Form.Label>
                <Select
                  isMulti="true"
                  options={this.state.questions}
                  onChange={(event) => {
                    this.setState({ questions: event }, () =>
                      console.log(this.state.questions)
                    );
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Groups</Form.Label>
                <Select
                  isMulti="true"
                  options={this.state.groups}
                  onChange={(event) => {
                    this.setState({ groups: event }, () =>
                      console.log(this.state.groups)
                    );
                  }}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
          <Col xs={6} md={1}></Col>
        </Row>
      </Container>
    );
  }
}

export default NewExam;
