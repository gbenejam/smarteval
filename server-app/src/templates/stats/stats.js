import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { IoBarChartSharp } from "react-icons/io5";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

import LoadingSpinner from '../../components/loadingSpinner/loadingSpinner';

import classes from './stats.module.css';


class Stats extends Component {
  state = {
    stats: {},
    isAuth: false,
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ isAuth: true });
      if (window.location.search) {
        const id = window.location.search.replace("?id=", "");
        axios
          .get("http://localhost:3030/stats/" + id, {
            crossDomain: true,
            headers: { Authorization: "Bearer " + token },
          })
          .then((res) => {
            this.setState({ stats: res.data });
          })
          .catch((err) => console.log(err));
      }
    }
  };

  listGlobalStatistics() {
    const grades = this.state.stats.globalStats.grades;
    const globalStats = Object.keys(grades)
      .map(key => {
        return (
          <tr key={key}>
            <td className={classes.Capitalize}>
              # {key.replace('_', ' ')}
            </td>
            <td>{grades[key]}</td>
          </tr>
        );
      });
    return globalStats;
  };

  displayGroupStats(group) {
    // TODO
  };

  listGroups() {
    let that = this;
    const groups = this.state.stats.groups.map((group, index) => {
      return (
        <tr key={index}>
          <td className={classes.td}>
            {group.name}
            <Link onClick={() => that.displayGroupStats(group)}>
              <IoBarChartSharp className='smallIcon'/>
            </Link>
          </td>
        </tr>
      );
    });
    return groups;
  };

  getGlobalStatsTable() {
    return (
      <Row className={classes.Centered}>
        <Col md={6}>
          <Table striped bordered hover>
            <thead>
              <tr className="yellowBack">
                <th colspan="2">Global statistics</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Number of users</td>
                <td>{this.state.stats.totalUsers}</td>
              </tr>
              <tr>
                <td>Number of groups</td>
                <td>{this.state.stats.totalGroups}</td>
              </tr>
              <tr>
                <td>Best grade</td>
                <td>{this.state.stats.globalStats.bestGrade}</td>
              </tr>
              <tr>
                <td>Average grade</td>
                <td>{this.state.stats.globalStats.averageGrade}</td>
              </tr>
              {this.listGlobalStatistics()}
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  };

  getGroupStatsTable() {
    return (
      <Row className={classes.Centered}>
        <Col md={6}>
          <Table striped bordered hover>
            <thead>
              <tr className="yellowBack">
                <th colspan="2">Group statistics</th>
              </tr>
            </thead>
            <tbody>{this.listGroups()}</tbody>
          </Table>
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1 style={{marginBottom: '30px'}}>Statistics</h1>
          </Col>
        </Row>
        {
          this.state.stats.globalStats ? 
          (
            <React.Fragment>
              {this.getGlobalStatsTable()}
              {this.getGroupStatsTable()}
            </React.Fragment>
          ) : (<LoadingSpinner nestedDivsStyle={{background: 'black'}} />)
        }
      </Container>
    );
  }
}

export default Stats;