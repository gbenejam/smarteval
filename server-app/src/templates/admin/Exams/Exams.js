import React, { Component } from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { FaEdit, FaRegWindowClose } from "react-icons/fa";

class AdminExams extends Component {
  state = {
    exams: [],
    isAuth: false,
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ isAuth: true });
      axios
        .get("http://localhost:3030/admin/exams", {
          crossDomain: true,
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.setState({ exams: res.data });
        })
        .catch((err) => console.log(err));
    }
  }

  removeExam = (idx) => {
    const token = localStorage.getItem("token");
    axios.delete("http://localhost:3030/admin/exams/" + idx, {
      crossDomain: true,
      headers: { Authorization: "Bearer " + token },
    })
    .then((res) => {
      this.setState({ exams: res.data });
    })
    .catch((err) => console.log(err));
  };

  listExams() {
    const that = this
    const exams = this.state.exams.map(function (d, idx) {
      const editPath = "/admin/exams/exam?id=" + d._id;
      return (
        <tr id={d._id} key={idx}>
          <td>{d.code}</td>
          <td>{d.title}</td>
          <td>
            <ul>{d.topics && d.topics.map(function (item, i) {
              return (<li key={i}>{item.name}</li>)
            })}</ul>
          </td>
          <td>{d.description}</td>
          <td>{d.startDate}</td>
          <td>{d.endDate}</td>
          <td>{d.duration}</td>
          <td>
            <Link to={editPath}>
              <FaEdit />
            </Link>
            <Link onClick={() => that.removeExam(d._id)}>
              <FaRegWindowClose />
            </Link>
          </td>
        </tr>
      );
    });
    return exams;
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            {this.state.isAuth && (
              <div>
                <h1>Exams</h1>
                <Button variant="success">
                  <Link to="/admin/exams/exam">Create exam</Link>
                </Button>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Title</th>
                      <th>Topics</th>
                      <th>Description</th>
                      <th>Start date</th>
                      <th>End date</th>
                      <th>Duration</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>{this.listExams()}</tbody>
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

export default AdminExams;
