import React, { Component } from "react";
import Navbar from "../../components/navigation/navbar/navbar";
import { Switch, Route } from "react-router-dom";

import Main from "../main/main";
import Features from "../features/features";
import Login from "../login/login";
import NewUser from "../newuser/NewUser";
import AdminDashboard from "../admin/dashboard/dashboard";
import AdminExams from "../admin/Exams/Exams";
import AdminNewExam from "../admin/Exams/Exam/Exam";
import AdminGroups from "../admin/Groups/Groups";
import AdminTopics from "../admin/Topics/Topics";
import Questions from "../admin/Questions/Questions";
import NewQuestion from "../admin/Questions/Question/Question";
import AdminUsers from "../admin/Users/Users";
import AdminNewGroup from "../admin/Groups/Group/Group";
import UserDashboard from "../user/dashboard/dashboard";
import UserExams from "../user/Exams/Exams";
import UserDownload from "../user/Download/Download";
import NotFound from "../notfound/NotFound";

//import classes from './layout.module.css'

class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route path="/" exact render={() => <Main />} />
          <Route path="/features" exact render={() => <Features />} />
          <Route path="/login" exact render={() => <Login />} />
          <Route path="/new-user" exact render={() => <NewUser />} />
          <Route
            path="/admin/dashboard"
            exact
            render={() => <AdminDashboard />}
          />
          <Route path="/admin/exams" exact render={() => <AdminExams />} />
          <Route
            path="/admin/exams/exam"
            exact
            render={() => <AdminNewExam />}
          />
          <Route
            path="/questions/question"
            exact
            render={() => <NewQuestion />}
          />
          <Route path="/groups" exact render={() => <AdminGroups />} />
          <Route path="/topics" exact render={() => <AdminTopics />} />
          <Route path="/questions" exact render={() => <Questions />} />
          <Route path="/users" exact render={() => <AdminUsers />} />
          <Route
            path="/groups/new-group"
            exact
            render={() => <AdminNewGroup />}
          />
          <Route
            path="/user/dashboard"
            exact
            render={() => <UserDashboard />}
          />
          <Route path="/user/exams" exact render={() => <UserExams />} />
          <Route path="/download" exact render={() => <UserDownload />} />
          <Route component={NotFound} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default Layout;
