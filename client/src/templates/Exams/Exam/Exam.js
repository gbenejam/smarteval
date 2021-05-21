import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import Countdown from "react-countdown";
import Webcam from "react-webcam";

class Exam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exam: [],
      isAuth: false,
      close: false,
      show: false,
      duration: 100000
    };
    this.questionRefs = [];
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ isAuth: true });
      if (window.location.search) {
        const id = window.location.search.replace("?id=", "");
        axios
          .get("http://localhost:3030/admin/exams/" + id, {
            crossDomain: true,
            headers: { Authorization: "Bearer " + token },
          })
          .then((res) => {
            console.log(res);

            // create refs
            res.data.questions.forEach( _ => {
              const ref = React.createRef();
              this.questionRefs.push(ref);
            });

            const dur = 60000 * res.data.duration;
            this.setState({ exam: res.data,
              duration: dur,
              initTime: Date.now()
            });
          })
          .catch((err) => console.log(err));
      }
    }
  }

  completionist = () => {
    return (
      <Modal.Dialog backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Time's up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Time's up. The exam has been automatically submitted.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">Continue</Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  };

  listQuestions() {
    const that = this;
    return (
      this.state.exam.questions &&
      this.state.exam.questions.map(function (d, idx) {
        return (
          <Form.Row key={idx}>
            <Form.Group as={Col} controlId={d._id}>
              <Form.Label>{d.name}</Form.Label>
              <Form.Control
                ref={that.questionRefs[idx]}
                as="textarea"
                rows={3}
                required
                placeholder="Enter answer"
              />
            </Form.Group>
          </Form.Row>
        );
      })
    );
  };

  createSolvedExam() {
    const solvedExam = {
      /* user is set by the backend based on the autheticated user
      who is submitting the exam */
      examId: this.state.exam._id,
      examCreator: this.state.exam.creator,
      duration: this.state.exam.duration,
      initExam: this.state.initTime,
      doneExam: Date.now(),
      title: this.state.exam.title,
      description: this.state.exam.description,
      startDate: this.state.exam.startDate,
      endDate: this.state.exam.endDate,
      grade: null
    };

    const questions = [];
    this.questionRefs.forEach(element => {
      const question = {
        _id: element.current.id,
        questionType: {
          label: "Text",
          value: "text",
        },
        name: "",
        answer: element.current.value
      };
      questions.push(question);
    });
    solvedExam.questions = questions;

    return solvedExam;
  }

  submitExam = (event) => {
    event.preventDefault();
    const solvedExam = this.createSolvedExam();
    console.log(solvedExam);
  };

  autoSubmitExam = () => {
    const solvedExam = this.createSolvedExam();
    console.log(solvedExam);
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            {this.state.isAuth && (
              <Container>
                <Row>
                  <h1>{this.state.exam.title}</h1>
                </Row>
                <Row>
                  <Col>
                    <Form onSubmit={this.examHandler}>
                      {this.listQuestions()}
                      <Button onClick={this.submitExam}>Submit</Button>
                    </Form>
                  </Col>
                  <Col>
                    <Row>
                      <h2>Progress</h2>
                      <p>{this.state.exam.description}</p>
                      <br/>
                      <Countdown date={this.state.initTime + this.state.duration}
                        onComplete={this.autoSubmitExam}>
                        {this.completionist()}
                      </Countdown>
                    </Row>
                    <Row>
                      <h2>Camera</h2>
                      <Webcam />
                    </Row>
                  </Col>
                </Row>
              </Container>
            )}
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

export default Exam;
