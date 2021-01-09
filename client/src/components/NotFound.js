import React from "react";

/* 
The NotFound component is a stateless arrow function that returns
a message to the user, notifying them that the course or page they
have requested does not exist (essentially a 404 error).
*/

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
        list of programs.
      </h2>
    </div>
  </div>
);

export default NotFound;
