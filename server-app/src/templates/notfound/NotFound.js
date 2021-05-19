import React, { Component } from 'react';

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";

class NotFound extends Component {
  render () {
    return (
      <Container>
        <Row>
          <Col>
            <Alert variant="danger">
              <Alert.Heading>Page not found!</Alert.Heading>
              <p>
                The page you're trying to access doesn't exist.
              </p>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default NotFound;