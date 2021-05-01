import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Select from 'react-select'

//import classes from './dashboard.module.css'

class NewExam extends Component {
  state = {
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
          this.setState({ questions: res.data });
        })
        .catch((err) => console.log(err));
    }
  }
  
  render() {
    const options = [
        { value: 'chocolate', label: 'Matrix substraction' },
        { value: 'strawberry', label: 'Inverse Matrix' },
        { value: 'vanilla', label: 'Adjoint matrix' }
      ]
    return (
      <Container>
        <Row>
          <Col xs={6} md={1}></Col>
          <Col xs={6} md={10}>
            <h1>New exam</h1>
            <Form>
              <Form.Row>
                <Form.Group as={Col} controlId="formGroupTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="title" placeholder="Enter title" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCode">
                  <Form.Label>Code</Form.Label>
                  <Form.Control type="number" placeholder="Enter code" />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Description"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridStartDate">
                  <Form.Label>Start date</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEndDate">
                  <Form.Label>End date</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
              </Form.Row>
              <Form.Group>
                  <Form.Label>Questions</Form.Label>
                  <Select isMulti="true" options={options} />
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
