import React from "react";

/*
This stateless arrow function returns the user's details once successfully logged in.
*/
const Authenticated = ({ context }) => {
  const authUser = context.authenticatedUser;

  return (
    <div id="root">
      <div className="bounds">
        <div className="grid-100">
          <h1>
            {authUser.firstName} {authUser.lastName} is authenticated!
          </h1>
          <p>Your username is {authUser.emailAddress}</p>
        </div>
      </div>
    </div>
  );
};

export default Authenticated;
