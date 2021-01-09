import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

/*
  UserSignOut is a stateless component that calls the signOut()
  method via the useEffect Hook, from the App's context. It returns
  a redirect back to the homepage.
*/

const UserSignOut = ({ context }) => {
  useEffect(() => context.actions.signOut());
  return <Redirect to="/" />;
};

export default UserSignOut;
