import React, { Component } from "react";
import Form from "./Form";
import axios from "axios";

class UpdateCourse extends Component {
  constructor() {
    super();
    this.state = {
      // id: 0,
      // results: [],
      // desc: [],
      // materials: [],
      // ownerFirstName: "",
      // ownerLastName: "",
      // ownerId: "",
      // isOwner: false,
      title: "",
      description: "",
      estimatedTime: "",
      materialsNeeded: "",
      userId: "",
      errors: [],
    };
  }

  componentDidMount() {
    this.setState({ id: this.props.match.params.id });
    this.fetchResults(this.props.match.params.id);
  }

  fetchResults(id) {
    axios(`http://localhost:5000/api/courses/${id}`)
      .then((res) =>
        this.setState({
          results: res.data,
          title: res.data.title,
          description: res.data.description,
          estimatedTime: res.data.estimatedTime,
          materialsNeeded: res.data.materialsNeeded,
          // desc: res.data.description.split("\n"),
          // materials: res.data.materialsNeeded.split("* "),
          ownerFirstName: res.data.courseOwner.firstName,
          ownerLastName: res.data.courseOwner.lastName,
          ownerId: res.data.courseOwner.ownerId,
        })
      )
      .catch("There's been an error!");
  }

  render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const {
      // title,
      // description,
      // estimatedTime,
      // materialsNeeded,
      // userId,
      errors,
    } = this.state;

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
                          className
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
                              className
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
          console.log(`${title} has been successfully updated!!`);
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
    this.props.history.push("/");
  };
}

export default UpdateCourse;
