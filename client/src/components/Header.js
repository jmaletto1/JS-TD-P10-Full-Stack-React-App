import React, { Component } from "react";
import { Link } from "react-router-dom";

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
              <nav>
                <Link className="signup" to="/sign-up">
                  Sign Up
                </Link>
                <Link className="signin" to="/sign-in">
                  Sign In
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
