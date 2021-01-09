import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

/*
This component allows a user to create an account with our course application.
The application makes use of the Form component to display errors or validation 
complaints returned from the REST API, as well as the submit function
to actually submit the data.
*/

export default class UserSignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    errors: [],
  };

  render() {
    const { firstName, lastName, emailAddress, password, errors } = this.state;

    return (
      <div id="root">
        <div className="bounds">
          <div className="grid-33 centered signin">
            <h1>Sign Up</h1>
            <div>
              <Form
                cancel={this.cancel}
                errors={errors}
                submit={this.submit}
                submitButtonText="Sign Up"
                elements={() => (
                  <React.Fragment>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={firstName}
                      onChange={this.change}
                      placeholder="First Name"
                    />
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={lastName}
                      onChange={this.change}
                      placeholder="Last Name"
                    />
                    <input
                      id="emailAddress"
                      name="emailAddress"
                      type="text"
                      value={emailAddress}
                      onChange={this.change}
                      placeholder="Email Address"
                    />
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={this.change}
                      placeholder="Password"
                    />
                  </React.Fragment>
                )}
              />
              <p>
                Already have a user account?{" "}
                <Link to="/sign-in">Click here</Link> to sign in!
              </p>
            </div>
          </div>
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
      Once the variables have been set, the submit method calls on context.data's
      createUser function to do just that - register a new user to the REST API.
      
      If any errors are returned, such as the email address being empty, for example, 
      these are rendered at the top of the page (beneath the navigation bar). If no 
      errors are returned, an alert message is provided, notifying the user of the course
      being successfully created. The user is then re-directed to the /courses route.
    */

  submit = () => {
    const { context } = this.props;

    const { firstName, lastName, emailAddress, password } = this.state;

    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
    };

    context.data
      .createUser(user)
      .then((errors) => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          console.log(`${emailAddress} has been registered!`);
          context.actions.signIn(emailAddress, password).then(() => {
            this.props.history.push("/authenticated");
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/error");
      });
  };

  cancel = () => {
    this.props.history.push("/");
  };
}
