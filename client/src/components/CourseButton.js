import React from "react";
import { Link } from "react-router-dom";

// This stateless component renders a button to the DOM for each course returned by the server.
// This component is rendered by the CourseDetail component.

const CourseButton = (props) => {
  return (
    <div className="grid-33">
      <Link className="course--module course--link" to={`/courses/${props.id}`}>
        <h4 className="course--label">Course</h4>
        <h3 className="course--title">{props.name}</h3>
      </Link>
    </div>
  );
};

export default CourseButton;
