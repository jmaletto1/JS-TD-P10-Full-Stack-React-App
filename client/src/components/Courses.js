import React, { Component } from "react";
import CourseButton from "./CourseButton";
import { Link } from "react-router-dom";
import axios from "axios";

/*
The primary purpose of this route is to retrieve and display all of 
the courses listed in the REST API's database. The courses class
makes use of componentDidMount() to call the retrieveCourses method,
and store the results on the state.
*/

export default class Courses extends Component {
  state = {
    resultsData: [],
  };

  componentDidMount() {
    this.retrieveCourses();
  }

  /*
   This method uses the axios plugin to perform a GET request on the REST
   API's courses route. The results are stored on the state under the variable
   "resultsData", which is an array of results.

   In the event of an error, the user is redirected to the "/error" route.
  */
  retrieveCourses() {
    axios
      .get("http://localhost:5000/api/courses")
      .then((res) => {
        this.setState({ resultsData: res.data });
      })
      .catch((error) => {
        console.log("Error receiving the data!", error);
        this.props.history.push("/error");
      });
  }

  /*
    The render method creates a constant called courses, that maps over the 
    results retrieved from the REST API. Each result renders a <Course Button>
    component, which receives the title and id of the course (as well as unique
    key identifier).
  */

  render() {
    const courses = this.state.resultsData.map((result) => (
      <CourseButton name={result.title} key={result.id} id={result.id} />
    ));
    return (
      <div className="bounds">
        {courses}
        <div className="grid-33">
          <Link
            className="course--module course--add--module"
            to="/courses/create"
          >
            <h3 className="course--add--title">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 13 13"
                className="add"
              >
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>
              New Course
            </h3>
          </Link>
        </div>
      </div>
    );
  }
}
