import React from "react";
import { Link } from "react-router-dom";

const CourseButton = (props) => {
  return (
    <div className="grid-33">
      <Link
        className="course--module course--link"
        to={`/courses/${props.id}/view`}
      >
        <h4 className="course--label">Course</h4>
        <h3 className="course--title">{props.name}</h3>
      </Link>
    </div>
  );
};

export default CourseButton;
