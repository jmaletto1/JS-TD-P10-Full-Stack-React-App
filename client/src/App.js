import React from "react";
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
import Forbidden from "./components/Forbidden";
import NotFound from "./components/NotFound";
import UnhandledError from "./components/UnhandledError";

import withContext from "./Context";
import PrivateRoute from "./PrivateRoute";

const HeaderWithContext = withContext(Header);
const AuthWithContext = withContext(Authenticated);
const CoursesWithContext = withContext(Courses);
const CourseDetailwithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);

function App() {
  return (
    <Router>
      <div className="App">
        <HeaderWithContext />
        <Switch>
          <Route exact path="/">
            {" "}
            <Redirect to="/courses" />
          </Route>
          <Route exact path="/courses" component={CoursesWithContext} />
          <PrivateRoute
            exact
            path="/courses/create"
            component={CreateCourseWithContext}
          />
          <Route
            exact
            path="/courses/:id/"
            component={CourseDetailwithContext}
          />
          <PrivateRoute
            path="/courses/:id/update"
            component={UpdateCourseWithContext}
          />
          <Route path="/sign-in" component={UserSignInWithContext} />
          <Route path="/sign-up" component={UserSignUpWithContext} />
          <Route path="/sign-out" component={UserSignOutWithContext} />
          <PrivateRoute path="/authenticated" component={AuthWithContext} />
          <Route path="/forbidden" component={Forbidden} />
          <Route path="/error" component={UnhandledError} />
          <Route Redirect="/not-found" component={NotFound} />
        </Switch>
        {/* </HeaderWithContext> */}
      </div>
    </Router>
  );
}

export default App;
