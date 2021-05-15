import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { Link } from "react-router-dom";

//import classes from './dashboard.module.css'

class NewQuestion extends Component {
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
  }

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
                <Col>Hola</Col>
                <Col>
                Hola
                  <Button variant="primary" type="submit">
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
