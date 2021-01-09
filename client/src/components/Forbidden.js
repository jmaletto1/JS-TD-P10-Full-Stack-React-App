import React from "react";

/*
This stateless component returns a message when a user tries to update or delete a record that
is not registered to their account.
*/
const Forbidden = () => (
  <div id="root">
    <div className="bounds">
      <h1>
        Unfortunately, you are not authorised to update or alter this record!
      </h1>
      <br />
      <h2>
        Please visit the <a href="/courses">Courses</a> page to view our current
        list of programs.
      </h2>
    </div>
  </div>
);

export default Forbidden;
