import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import Datetime from "react-datetime";

import "react-datetime/css/react-datetime.css";
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
    questionSelect: [],
    groupSelect: [],
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (window.location.search) {
      const id = window.location.search.replace("?id=", "");

      if (token) {
        this.setState({ isAuth: true });
        axios
          .get("http://localhost:3030/admin/exams/" + id, {
            crossDomain: true,
            headers: { Authorization: "Bearer " + token },
          })
          .then((res) => {
            console.log(res.data);
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
    const questionSelect = [
      { value: "6089e7b0df7d4cdafa3c510e", label: "Matrix substraction" },
      { value: "6089e7b0df7d4cdafa3c510a", label: "Inverse Matrix" },
      { value: "6089e7b0df7d4cdafa3c510b", label: "Adjoint matrix" },
    ];

    const groupSelect = [
      { value: "chocolate", label: "Algebra Aula 1" },
      { value: "strawberry", label: "Algebra Aula 2" },
      { value: "vanilla", label: "Algebra Aula 3" },
      { value: "chocolate2", label: "Algebra Aula 4" },
      { value: "strawberry2", label: "Algebra Aula 5" },
      { value: "vanilla2", label: "Algebra Aula 6" },
    ];
    this.setState({ groupSelect, questionSelect });
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
      questions: question,
    };
    console.log(exam);
  };

  render() {
    return (
      <Container>
        <Row>
          <Button>Back</Button>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={this.examHandler}>
              <Form.Row>
                <Col>
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
                      <Datetime
                        value={this.state.startDate}
                        dateFormat="YYYY-MM-DD"
                        timeFormat="HH:mm"
                        input="true"
                        onChange={(event) => {
                          console.log(event);
                          //this.setState({ startDate: event._i });
                        }}
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEndDate">
                      <Form.Label>End date</Form.Label>
                      <Datetime
                        value={this.state.endDate}
                        dateFormat="YYYY-MM-DD"
                        timeFormat="HH:mm"
                        input="true"
                        onChange={(event) => {
                          console.log(event);
                          //this.setState({ startDate: event._i });
                        }}
                      />
                    </Form.Group>
                  </Form.Row>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Groups</Form.Label>
                    <Select
                      isMulti="true"
                      options={this.state.groupSelect}
                      onChange={(event) => {
                        this.setState({ groups: event }, () =>
                          console.log(this.state.groupSelect)
                        );
                      }}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Questions</Form.Label>
                    <Select
                      isMulti="true"
                      options={this.state.questionSelect}
                      onChange={(event) => {
                        this.setState({ questions: event }, () =>
                          console.log(this.state.questionSelect)
                        );
                      }}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Col>
              </Form.Row>
            </Form>
          </Col>
          <Col xs={6} md={1}></Col>
        </Row>
      </Container>
    );
  }
}

export default NewExam;
