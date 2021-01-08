import React from "react";

const Forbidden = () => (
  <div id="root">
    <div className="bounds">
      <h1>Unfortunately, you are not authorised to update this record!</h1>
      <br />
      <h2>
        Please visit the <a href="/courses">Courses</a> page to view our current
        list of programs.
      </h2>
    </div>
  </div>
);

export default Forbidden;
