import React, { useEffect, useState } from "react";
import "./styles/global.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import Header from "./components/Header";
import Authenticated from "./components/Authenticated";

import withContext from "./Context";

const HeaderWithContext = withContext(Header);
const AuthWithContext = withContext(Authenticated);
const CoursesWithContext = withContext(Courses);
const CourseDetailwithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);

function App() {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   axios(`http://localhost:5000/api/courses`)
  //     .then((res) => setData(res.data))
  //     .catch((error) => console.log("BADNESS!"));
  // }, []);

  return (
    <Router>
      <HeaderWithContext />
      <Switch>
        <div className="App">
          <Route exact path="/">
            {" "}
            <Redirect to="/courses" />
          </Route>
          <Route exact path="/courses" component={CoursesWithContext} />
          <Route
            exact
            path="/courses/create"
            component={CreateCourseWithContext}
          />
          <Route path="/courses/:id/view" component={CourseDetailwithContext} />
          <Route
            path="/courses/:id/update"
            render={(props) => <UpdateCourse {...props} />}
          />
          <Route path="/sign-in" component={UserSignInWithContext} />
          <Route path="/sign-up" component={UserSignUpWithContext} />
          <Route path="/sign-out" component={UserSignOutWithContext} />
          <Route path="/authenticated" component={AuthWithContext} />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
