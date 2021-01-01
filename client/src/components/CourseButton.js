import React from "react";

const CourseButton = (props) => {
  return (
    <div className="grid-33">
      <a
        className="course--module course--link"
        href={`/courses/${props.id}/view`}
      >
        <h4 className="course--label">Course</h4>
        <h3 className="course--title">{props.name}</h3>
      </a>
    </div>
  );
};

export default CourseButton;
