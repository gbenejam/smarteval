import React, { Component } from "react";
import Navbar from "../../components/navigation/navbar/navbar";
import { Switch, Route } from "react-router-dom";

import Login from "../login/login";
import UserExams from "../Exams/Exams";
import NotFound from "../notfound/NotFound"
import ExamPreview from "../Exams/ExamPreview/ExamPreview";
import Exam from "../Exams/Exam/Exam";

//import classes from './layout.module.css'

class Layout extends Component {

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      // user is already logged in --> redirect to exams page
      window.location.hash = '#/user/exams';
    }
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/user/exams" exact component={UserExams} />
          <Route path="/user/exams/preview/:id" exact component={ExamPreview} />
          <Route path="/user/exams/exam/:id" exact component={Exam} />
          <Route component={NotFound} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default Layout;
