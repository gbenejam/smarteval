import React, { Component } from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

import dateFormat from "../../../utils/dateFormat";


class ExamPreview extends Component {
  state = {
    exam: [],
    isAuth: false,
    examPath: "",
  };

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
            this.setState({
              exam: res.data,
              examPath: "/user/exams/exam?id=" + res.data._id,
            });
          })
          .catch((err) => console.log(err));
      }
    }
  }

  startButton = () => {
    const now = new Date().getTime();
    const endDate = new Date(this.state.exam.endDate).getTime();
    const startDate = new Date(this.state.exam.startDate).getTime();
    if (endDate > now && startDate < now) {
      return (
        <Button className='yellowBack button'>
          <Link to={this.state.examPath}>Access</Link>
        </Button>
      );
    } else if (endDate < now) {
      return (
        <Alert variant="warning">
          <p>This exam has finished already.</p>
        </Alert>
      );
    } else if (startDate > now) {
      return (
        <Alert variant="warning">
          <p>The exam hasn't started yet</p>
        </Alert>
      );
    } else {
      return (
        <Alert variant="warning">
          <p>You can't take this exam {endDate}</p>
        </Alert>
      );
    }
  };

  render() {
    return (
      <Container id="preview">
        {this.state.isAuth && (
          <React.Fragment>
            <Row>
              <Col>
                <h1 style={{marginBottom: '50px'}}>{this.state.exam.title}</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <Tab.Container
                  id="left-tabs-example"
                  defaultActiveKey="first" >
                  <Row>
                    <Col className='tabs-col' sm={2}>
                      <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                          <Nav.Link eventKey="first">
                            Dades
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="second">
                            Instruccions
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Col>
                    <Col className='main-col' sm={6}>
                      <Tab.Content>
                        <Tab.Pane eventKey="first">
                          <p>
                            Start date: {dateFormat(this.state.exam.startDate)}
                          </p>
                          <p>
                            End date: {dateFormat(this.state.exam.endDate)}
                          </p>
                          <p>
                            Questions:
                            {this.state.exam.questions &&
                              ` ${this.state.exam.questions.length}`}
                          </p>
                          <p>Topics:</p>
                          <ul>
                            {this.state.exam.topics &&
                              this.state.exam.topics.map((item) => {
                                return <li>{item.name}</li>;
                              })}
                          </ul>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                          <h4>Description</h4>
                          <p>{this.state.exam.description}</p>
                          <h4>Duration</h4>
                          <p>{this.state.exam.duration} minutes</p>
                          {this.startButton()}
                        </Tab.Pane>
                      </Tab.Content>
                    </Col>
                  </Row>
                </Tab.Container>
              </Col>
            </Row>
          </React.Fragment>
        )}
        {!this.state.isAuth && (
          <Alert variant="danger">
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
              To access this page you must be authenticated. Please log in.
            </p>
          </Alert>
        )}
      </Container>
    );
  }
}

export default ExamPreview;
