import React from "react";

/*
  UnhandledError.js is a stateless component that returns a message to the DOM,
  notifying the user that there has been a server error. The user is invited to
  try again, or return to the site later on.
*/

const UnhandledError = () => (
  <div id="root">
    <div className="bounds">
      <h1>There appears to have been a server error! Uh-oh!</h1>
      <br />
      <h2>Please try again by refreshing the page, or return again later.</h2>
    </div>
  </div>
);

export default UnhandledError;
