import React, { Component } from "react";

import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import classes from './Download.module.css';

const MAC_OS_DOWNLOAD = 'Smarteval-darwin-x64.zip';
const WIN_DOWNLOAD = 'Smarteval-win32-x64.zip';
const DEB_DOWNLOAD = 'Smarteval-linux-x64.zip';

class Download extends Component {

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Jumbotron className={classes.DownloadBack}>
              <h1 className={classes.Title}>Download the client here</h1>
              <p className={classes.Text}>
                Click here to download the client to be able to make your online
                exams.
              </p>
              <div>
                <p>
                  <Button className={`${classes.Button} yellowBack button`}
                    style={{ marginRight: "20px" }}>
                      <a href={`/download/${WIN_DOWNLOAD}`} download>Windows</a>
                  </Button>
                  <Button className={`${classes.Button} yellowBack button`} 
                    style={{ marginRight: "20px" }}>
                      <a href={`/download/${MAC_OS_DOWNLOAD}`} download>MacOS</a>
                  </Button>
                  <Button className={`${classes.Button} yellowBack button`} 
                    style={{ marginRight: "20px" }}>
                      <a href={`/download/${DEB_DOWNLOAD}`} download>Linux Beta (.deb)</a>
                  </Button>
                </p>
              </div>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Download;
