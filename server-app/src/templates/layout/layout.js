import React, { Component } from "react";
import Navbar from "../../components/navigation/navbar/navbar";
import { Route } from "react-router-dom";
import Main from "../main/main";
import Features from "../features/features";
import Login from "../login/login";
import NewUser from '../newuser/NewUser';
import AdminDashboard from '../admin/dashboard/dashboard';
import AdminExams from '../admin/Exams/Exams';
import AdminNewExam from '../admin/Exams/Exam/Exam';
import AdminGroups from '../admin/Groups/Groups';
import AdminNewGroup from '../admin/Groups/Group/Group';
import UserDashboard from '../user/dashboard/dashboard';
import UserExams from '../user/Exams/Exams';
import UserDownload from '../user/Download/Download';

//import classes from './layout.module.css'

class Layout extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Route path="/" exact component={Main} />
        <Route path="/features" exact component={Features} />
        <Route path="/login" exact component={Login} />
        <Route path="/new-user" exact component={NewUser}/>
        <Route path="/admin/dashboard" exact component={AdminDashboard}/>
        <Route path="/admin/exams" exact component={AdminExams}/>
        <Route path="/admin/exams/new-exam" exact component={AdminNewExam}/>
        <Route path="/admin/groups" exact component={AdminGroups}/>
        <Route path="/admin/groups/new-group" exact component={AdminNewGroup}/>
        <Route path="/user/dashboard" exact component={UserDashboard}/>
        <Route path="/user/exams" exact component={UserExams}/>
        <Route path="/user/download" exact component={UserDownload}/>
      </div>
    );
  }
}

export default Layout;
