import React, { useEffect, useState } from "react";
import "./styles/global.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import axios from "axios";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import Header from "./components/Header";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios(`http://localhost:5000/api/courses`)
      .then((res) => setData(res.data))
      .catch((error) => console.log("BADNESS!"));
  }, []);

  return (
    <Router>
      <Header />
      {/* <Switch> */}
      <div className="App">
        <Route exact path="/">
          {" "}
          <Redirect to="/courses" />
        </Route>
        <Route
          exact
          path="/courses"
          component={() => <Courses data={data} />}
        />
        <Route exact path="/courses/create" component={CreateCourse} />
        <Route
          path="/courses/:id/view"
          render={(props) => <CourseDetail {...props} />}
        />
        <Route
          path="/courses/:id/update"
          render={(props) => <UpdateCourse {...props} />}
        />
        <Route path="/sign-in" component={UserSignIn} />
        <Route path="/sign-up" component={UserSignUp} />
        {/* <Route path="/sign-out" component={} /> */}
      </div>
      {/* </Switch> */}
    </Router>
  );
}

export default App;
