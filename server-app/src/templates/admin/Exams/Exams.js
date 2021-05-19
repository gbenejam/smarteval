import React, { Component } from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { FaRegEdit, FaRegWindowClose } from "react-icons/fa";

import dateFormat from '../../../utils/dateFormat';

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
          <td>{dateFormat(d.startDate)}</td>
          <td>{dateFormat(d.endDate)}</td>
          <td>{d.duration}</td>
          <td>
            <Link to={editPath}>
              <FaRegEdit className='smallIcon'/>
            </Link>
            <Link onClick={() => that.removeExam(d._id)}>
              <FaRegWindowClose className='smallIcon'/>
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
            <h1 style={{marginBottom: '30px'}}>Exams </h1>
            {this.state.isAuth && (
              <Button className='yellowBack button'>
                <Link to="/admin/exams/exam">Create exam</Link>
              </Button>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            {this.state.isAuth && (
              <Table striped bordered hover>
                <thead>
                  <tr className='yellowBack'>
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
