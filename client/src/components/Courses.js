import React, { Component } from "react";
import CourseButton from "./CourseButton";
import axios from "axios";

export default class Courses extends Component {
  state = {
    resultsData: [],
  };

  componentDidMount() {
    this.retrieveCourses();
  }

  retrieveCourses() {
    axios
      .get("http://localhost:5000/api/courses")
      .then((res) => {
        this.setState({ resultsData: res.data });
      })
      .catch((error) => {
        console.log("Error receiving the data!", error);
      });
  }

  render() {
    const courses = this.state.resultsData.map((result) => (
      <CourseButton name={result.title} key={result.id} id={result.id} />
    ));
    return (
      <div className="bounds">
        {courses}
        <div className="grid-33">
          <a
            className="course--module course--add--module"
            href="/courses/create"
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
          </a>
        </div>
      </div>
    );
  }
}

// const Courses = (props) => {
//   const results = props.data;
//   const courses = results.map((result) => (
//     <CourseButton name={result.title} key={result.id} id={result.id} />
//   ));
//   return (
//     <div className="bounds">
//       {courses}
//       <div className="grid-33">
//         <a
//           className="course--module course--add--module"
//           href="/courses/create"
//         >
//           <h3 className="course--add--title">
//             <svg
//               version="1.1"
//               xmlns="http://www.w3.org/2000/svg"
//               x="0px"
//               y="0px"
//               viewBox="0 0 13 13"
//               className="add"
//             >
//               <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
//             </svg>
//             New Course
//           </h3>
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Courses;
