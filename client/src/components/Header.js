import React, { Component } from "react";
import { Link } from "react-router-dom";

/*
  Header.js is a stateless component that displays the main navigation module
  at the top of each page. The render method calls on the app's {context}, which
  then defines an authenticated user, if there is one.

  From there, the return method makes use of the ternary operator to either display
  a welcome message to the user, and the link to sign out if the user is signed in.

  If they are not signed in, the links to both Sign Up and Sign in are both returned.
*/

class Header extends Component {
  render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;

    return (
      <div className="start" id="root">
        <div>
          <div className="header">
            <div className="bounds">
              <h1 className="header--logo">Courses</h1>
              <Link to="/courses">View Courses</Link>
              <nav>
                {authUser ? (
                  <React.Fragment>
                    <span>
                      Hello {authUser.firstName} {authUser.lastName}
                    </span>
                    <Link className="signup" to="/sign-out">
                      Sign Out
                    </Link>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Link className="signup" to="/sign-up">
                      Sign Up
                    </Link>
                    <Link className="signin" to="/sign-in">
                      Sign In
                    </Link>
                  </React.Fragment>
                )}
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
