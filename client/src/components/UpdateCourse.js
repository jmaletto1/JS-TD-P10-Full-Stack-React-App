import React, { Component } from "react";
import Form from "./Form";
import axios from "axios";

/*
The Update Course Component has two primary functions - to first of all
retrieve the course component that matches the :id parameter in the url,
and display it's values within a form (rendered from the Form component).
Secondly, the component must allow the user to update and submit the amended
course details to the REST API.
*/

/*
 The relevant course details are stored on the class's state, within the 
constructor method.
*/

class UpdateCourse extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      estimatedTime: "",
      materialsNeeded: "",
      userId: "",
      errors: [],
      failure: true,
    };
  }

  /* 
  componentDidMount is called to set the id on the state object to match the id
  provided in the url. From there, the fetchResults method is called using said id.
  */
  componentDidMount() {
    this.setState({ id: this.props.match.params.id });
    this.fetchResults(this.props.match.params.id);
  }

  /*
  The fetchResults method is an asynchronous function that uses the axios plugin to
  retrieve a json object from the REST API. This then sets the state of the parameters
  listed below (course description, owner etc).

  In the event of an error response not being provided, or the server providing a 500 error,
  the catch method will push the user to the "/error" route. Alternatively, if a 404 status
  code is provided, the user will then be sent to the "/notfound" route.
  */

  fetchResults(id) {
    axios(`http://localhost:5000/api/courses/${id}`)
      .then((res) =>
        this.setState({
          results: res.data,
          title: res.data.title,
          description: res.data.description,
          estimatedTime: res.data.estimatedTime,
          materialsNeeded: res.data.materialsNeeded,
          ownerFirstName: res.data.courseOwner.firstName,
          ownerLastName: res.data.courseOwner.lastName,
          ownerId: res.data.courseOwner.ownerId,
          failure: false,
        })
      )
      .then(() => {
        const { context } = this.props;
        const authUser = context.authenticatedUser;
        if (
          authUser.id !== this.state.ownerId &&
          this.state.description.length
        ) {
          this.props.history.push("/forbidden");
        }
      })
      .catch((error) => {
        console.log(error.response);
        if (!error.response || error.response.status === 500) {
          this.props.history.push("/error");
        } else if (error.response.status === 404) {
          this.props.history.push("/notfound");
        }
      });
  }

  /*
  The render method first makes use of the Provider context to gather
  the user's information. If the course owner's ID matches that of the user,
  the Form component will display, allowing the user to submit the course.
  */

  render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const { errors } = this.state;

    if (this.state.ownerId === authUser.id) {
      return (
        <div id="root">
          <div className="bounds course--detail">
            <h1>Update Course No:{this.state.results.id}</h1>
            <Form
              cancel={this.cancel}
              errors={errors}
              submit={this.submit}
              submitButtonText="Update Course"
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
                          defaultValue={this.state.title}
                          onChange={this.change}
                        />
                      </div>
                    </div>
                    <div>
                      <p>
                        By {this.state.ownerFirstName}{" "}
                        {this.state.ownerLastName}
                      </p>
                    </div>
                    <div className="course--description">
                      <div>
                        <textarea
                          id="description"
                          name="description"
                          defaultValue={this.state.description}
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
                              defaultValue={this.state.estimatedTime}
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
                              defaultValue={this.state.materialsNeeded}
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
    } else {
      return (
        <div id="root">
          <div className="bounds course--detail">
            <h1>
              Unfortunately, you are not authorised to update this record!
            </h1>
          </div>
        </div>
      );
    }
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
      updateCourse function to submit the updated course's details to the REST API.
      
      If any errors are returned, such as the course title being empty, these are
      rendered at the top of the page (beneath the navigation bar). If no errors are 
      returned, an alert message is provided, notifying the user of the course
      being successfully created. The user is then re-directed to the /courses
      route.
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
    };

    const courseId = this.props.match.params.id;

    context.data
      .updateCourse(course, courseId, emailAddress, password)
      .then((errors) => {
        if (errors.length) {
          this.setState({ errors });
          console.log(this.state.errors);
        } else {
          alert("Course successfully updated!");
          this.props.history.push("/courses");
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/courses");
      });
  };

  cancel = () => {
    this.props.history.go(-1);
    // this.props.history.push("/");
  };
}

export default UpdateCourse;
