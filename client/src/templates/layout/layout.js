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
  
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route path="/" exact render={() => <Login />} />
          <Route path="/user/exams" exact render={() => <UserExams />} />
          <Route path="/user/exams/preview" exact render={() => <ExamPreview />} />
          <Route path="/user/exams/exam" exact render={() => <Exam />} />
          <Route component={NotFound} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default Layout;
