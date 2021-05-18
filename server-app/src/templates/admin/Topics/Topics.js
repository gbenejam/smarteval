import React, { Component } from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FaRegWindowClose } from "react-icons/fa";

class AdminTopics extends Component {
  state = {
    topics: [],
    topic: "",
    isAuth: false,
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ isAuth: true });
      axios
        .get("http://localhost:3030/topics", {
          crossDomain: true,
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          console.log(res);
          this.setState({ topics: res.data });
        })
        .catch((err) => console.log(err));
    }
  }

  topicHandler = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const body = {
      name: this.state.topic,
      creator: userId,
    };

    axios
      .post("http://localhost:3030/topics", body, {
        crossDomain: true,
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log(res);
        this.setState({ topics: res.data });
      })
      .catch((err) => console.log(err));
  };

  removeTopic = (idx) => {
    const token = localStorage.getItem("token");
    axios.delete("http://localhost:3030/topics/" + idx, {
      crossDomain: true,
      headers: { Authorization: "Bearer " + token },
    })
    .then((res) => {
      console.log(res);
      this.setState({ topics: res.data });
    })
    .catch((err) => console.log(err));
  };

  listTopics() {
    let that = this;
    const topics = this.state.topics.map(function (d, idx) {
      return (
        <tr key={idx}>
          <td>
            {d.name}
            <Link onClick={() => that.removeTopic(d._id)}>
              <FaRegWindowClose />
            </Link>
          </td>
        </tr>
      );
    });
    return topics;
  }

  render() {
    return (
      <Container>
        <Row>
          <h1>Topics</h1>
        </Row>
        <Row>
          <Col>
            <Form>
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="New topic..."
                    value={this.state.topic}
                    onChange={(event) => {
                      this.setState({ topic: event.target.value });
                    }}
                  />
                </Col>
                <Col>
                  <Button type="submit" onClick={this.topicHandler}>
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col>
            {this.state.isAuth && (
              <div>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Topic</th>
                    </tr>
                  </thead>
                  <tbody>{this.listTopics()}</tbody>
                </Table>
              </div>
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

export default AdminTopics;
