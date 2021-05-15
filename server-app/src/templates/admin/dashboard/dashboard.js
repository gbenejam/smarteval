import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

//import classes from './dashboard.module.css'

class AdminDashboard extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col />
          <Col>
            <h1>Dashboard</h1>
          </Col>
          <Col />
        </Row>
        <Row>
          <Col>
            <CardDeck>
              <Card>
                <Card.Body>
                  <Card.Title>Exams</Card.Title>
                  <Card.Text>
                    <h1>4</h1>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button variant="primary">Go to exams</Button>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>Questions</Card.Title>
                  <Card.Text>
                    <h1>4</h1>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button variant="primary">Go to questions</Button>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>Users</Card.Title>
                  <Card.Text>
                    <h1>4</h1>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button variant="primary">Go to users</Button>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>Groups</Card.Title>
                  <Card.Text>
                    <h1>4</h1>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button variant="primary">Go to groups</Button>
                </Card.Footer>
              </Card>
            </CardDeck>
          </Col>
        </Row>
        <Row>
          <Col>
          <h1>Exams in progress</h1>

            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td colSpan="2">Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col>
          <h1>Latest exams</h1>

            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td colSpan="2">Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AdminDashboard;
