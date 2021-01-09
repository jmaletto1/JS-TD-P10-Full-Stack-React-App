import React, { Component } from "react";
import Form from "./Form";

/*
The CreateCourse component allows a registered user to create a new course
in the REST API's database. This is achieved by importing and using the 
Form component, and passing the elements displayed below into the submit function.
*/

class CreateCourse extends Component {
  state = {
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    userId: "",
    errors: [],
  };

  render() {
    const { errors } = this.state;

    /*
      Within the form component (beneath), the key parameters are initially set
      as below. This includes the cancel and submit functions, the errors,
      the button display text and the form elements themselves. When a user
      enters a value into any of the fields, the onChange (or this.onChange)
      function is activated.
    */

    return (
      <div id="root">
        <div className="bounds course--detail">
          <h1>Create Course.</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Create Course"
            elements={() => (
              <React.Fragment>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div>
                      <input
                        id="title"
                        name="title"
                        type="text"
                        className="input-title course--title--input"
                        placeholder="Course title..."
                        onChange={this.change}
                      />
                    </div>
                  </div>
                  <div className="course--description">
                    <div>
                      <textarea
                        id="description"
                        name="description"
                        placeholder="Course description..."
                        onChange={this.change}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div>
                          <input
                            id="estimatedTime"
                            name="estimatedTime"
                            type="text"
                            className="course--time--input"
                            placeholder="Hours"
                            onChange={this.change}
                          />
                        </div>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div>
                          <textarea
                            id="materialsNeeded"
                            name="materialsNeeded"
                            placeholder="List materials here..."
                            onChange={this.change}
                          />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </React.Fragment>
            )}
          />
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
    A course object is also created from the user's form entry.
  */

  submit = () => {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const emailAddress = authUser.emailAddress;
    const password = authUser.password;

    const { title, description, estimatedTime, materialsNeeded } = this.state;

    const course = {
      title: title,
      description: description,
      estimatedTime: estimatedTime,
      materialsNeeded: materialsNeeded,
      userId: authUser.id,
    };

    /*
      Once the variables have been set, the submit method calls on context.data's
      submitCourse function to do just that - submit a course to the REST API.
      
      If any errors are returned, such as the course title being empty, these are
      rendered at the top of the page (beneath the navigation bar). If no errors are 
      returned, an alert message is provided, notifying the user of the course
      being successfully created. The user is then re-directed to the /courses
      route.
    */

    context.data
      .submitCourse(course, emailAddress, password)
      .then((errors) => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          alert("Course successfully created!");
          this.props.history.push("/courses");
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/courses");
      });
  };

  // This method returns the users to the main courses route (which acts as the homepage).
  cancel = () => {
    this.props.history.push("/");
  };
}

export default CreateCourse;
