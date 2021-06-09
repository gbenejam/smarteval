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

import classes from './Exam.module.css';


class Exam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exam: [],
      isAuth: false,
      show: false,
      duration: 10000,
      examSubmited: false,
      errorSubmit: true,
      errorExam: true,
      error: false
    };
    this.questionRefs = [];
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ isAuth: true });
      let newState = {};
      const id = this.props.match.params.id;

      // check if the exam was already submitted
      axios.get("/solved-exam/submit/" + id, {
        crossDomain: true,
        headers: { Authorization: "Bearer " + token },
      }).then(res => this.setState({
        examSubmited: res.data.examSubmited,
        errorSubmit: false 
      }))
      .catch(err => console.log(err));

      // get the exam
      axios.get("/exams/user/" + id, {
        crossDomain: true,
        headers: { Authorization: "Bearer " + token },
      }).then((res) => {
        // create refs
        res.data.questions.forEach( _ => {
          const ref = React.createRef();
          this.questionRefs.push(ref);
        });

        const dur = 60000 * res.data.duration;
        newState.exam = res.data;
        newState.initTime = Date.now();
        newState.duration = dur;
        newState.show = true;
        newState.errorExam = false;

        this.countdownInterval = window.setInterval(() => {
          this.autoSubmitExam();
        }, dur);
      }).catch((err) => console.log(err))
      .finally(() => {
        this.setState(newState);
      });
    } else {
      this.setState({ error: true });
    }
  }

  componentWillUnmount() {
    window.clearInterval(this.countdownInterval);
  }

  renderer = ({hours, minutes, seconds, completed}) => {
    if (completed) {
      // Render a completed state
      return this.completionist();
    } else {
      // Render a countdown
      return <div className={classes.Countdown}>
        <h2>{hours}:{minutes}:{seconds}</h2>
      </div>;
    }
  };

  completionist = () => {
    return (
      <Modal.Dialog backdrop="static">
        <Modal.Header>
          <Modal.Title>Time's up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Time's up. The exam has been automatically submitted.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className='yellowBack button'
            disabled={!this.state.examSubmited}
            onClick={this.redirectToExams}>
            Continue</Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  };

  examAlreadySubmited() {
    return (
      <Modal.Dialog backdrop="static">
        <Modal.Header>
          <Modal.Title>Access Denied</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>This exam has already been submitted.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className='yellowBack button'
            onClick={this.redirectToExams}>
            Continue</Button>
        </Modal.Footer>
      </Modal.Dialog>
    )
  }

  redirectToExams() {
    window.location.hash = '#/user/exams';
  }

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

  findExamQuestionById(id) {
    const filteredQuestions = this.state.exam.questions
      .filter(question => question._id === id);
    // there should only be one question with a given id
    if (filteredQuestions.length > 1) {
      console.error(`Multiple questions with repeated ids [${id}]`);
    }
    return filteredQuestions[0];
  }

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
      const examQuestion = this.findExamQuestionById(element.current.id);
      const question = {
        _id: element.current.id,
        name: examQuestion.name,
        answer: element.current.value
      };
      questions.push(question);
    });
    solvedExam.questions = questions;

    return solvedExam;
  }

  postSolvedExam(solvedExam) {
    return axios
      .post("/solved-exam/submit", solvedExam, {
        crossDomain: true,
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .catch((err) => console.log(err)); 
  }

  submitExam = (event) => {
    event.preventDefault();
    const solvedExam = this.createSolvedExam();
    this.postSolvedExam(solvedExam)
      .then((res) => {
        window.clearInterval(this.countdownInterval);
        this.redirectToExams();
      });
  };

  autoSubmitExam = () => {
    const solvedExam = this.createSolvedExam();
    this.setState({show: false});
    this.postSolvedExam(solvedExam)
      .then((res) => {
        window.clearInterval(this.countdownInterval);
        this.setState({examSubmited: true});
      });
  }

  isThereAnyError() {
    return this.state.error || this.state.errorExam || this.state.errorSubmit;
  }

  render() {
    const errNotAuthElem = (
      <Alert variant="danger">
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          To access this page you must be authenticated. Please log in.
        </p>
      </Alert>
    );

    return (
      <Container style={{position: 'relative'}}>
        { this.isThereAnyError() && !this.state.isAuth && errNotAuthElem }
        { this.isThereAnyError() && this.state.examSubmited && this.examAlreadySubmited() }
        { !this.isThereAnyError() && this.state.initTime && this.state.duration ?
          <Row className={classes.CountdownRow}>
            <Col sm='auto'>
              <Countdown 
                date={this.state.initTime + this.state.duration}
                renderer={this.renderer}>
              </Countdown>
            </Col>
          </Row>
          : null
        }
        { this.state.show && this.state.isAuth && !this.isThereAnyError() && (
          <React.Fragment>
            <Row>
              <Col>
                <Container>
                  <Row>
                    <h1>{this.state.exam.title}</h1>
                  </Row>
                  <Row>
                    <Col>
                      <h3>Progress</h3>
                      <p>{this.state.exam.description}</p>
                      <br/>
                      <Form onSubmit={this.examHandler}>
                        {this.listQuestions()}
                        <Button className='yellowBack button'
                          onClick={this.submitExam}>
                            Submit
                        </Button>
                      </Form>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
            <Webcam className={classes.Webcam} />
          </React.Fragment>
        )}
      </Container>
    );
  }
}

export default Exam;
