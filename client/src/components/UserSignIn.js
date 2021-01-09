import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

/*
This stateful component allows a user to sign in to their account
via the REST API. The user's emailAddress, password and any errors
are stored on the state.
*/

class UserSignIn extends Component {
  state = {
    emailAddress: "",
    password: "",
    errors: [],
  };

  // The user's credentials and any errors are destructured here from the state.
  render() {
    const { emailAddress, password, errors } = this.state;

    /*
      Within the form component (beneath), the key parameters are initially set
      as below. This includes the cancel and submit functions, the errors,
      the button display text and the form elements themselves. When a user
      enters a value into any of the fields, the onChange (or this.onChange)
      function is activated.
    */

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  defaultValue={emailAddress}
                  onChange={this.change}
                  placeholder="User Name"
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  defaultValue={password}
                  onChange={this.change}
                  placeholder="Password"
                />
              </React.Fragment>
            )}
          />
          <p>
            Don't have a user account? <Link to="/sign-up">Click here</Link> to
            sign up!
          </p>
        </div>
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  /*
    The submit function calls on the Provider context to gather the necessary
    information on the current user, and then stores this into variables. 
  */

  submit = () => {
    const { context } = this.props;
    const { emailAddress, password } = this.state;

    context.actions
      .signIn(emailAddress, password)
      .then((user) => {
        if (user === null) {
          this.setState(() => {
            return { errors: ["Sign in was unsuccessful"] };
          });
        } else {
          this.props.history.goBack();
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/");
      });
  };

  cancel = () => {
    this.props.history.push("/");
  };
}

export default UserSignIn;
