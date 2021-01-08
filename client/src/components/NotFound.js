import React from "react";

const NotFound = () => (
  <div id="root">
    <div className="bounds">
      <h1>
        Unfortunately you have visited a page or course URL that doesn't exist!
        Maybe it never did!
      </h1>
      <br />
      <h2>
        Please visit the <a href="/courses">Courses</a> page to view our current
        list of programs
      </h2>
    </div>
  </div>
);

export default NotFound;
