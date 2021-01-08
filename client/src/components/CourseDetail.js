import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";

class CourseDetail extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      results: [],
      desc: [],
      materials: [],
      ownerFirstName: "",
      ownerLastName: "",
      ownerId: "",
      transaction: false,
      failure: false,
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
          desc: res.data.description,
          materials: res.data.materialsNeeded,
          ownerFirstName: res.data.courseOwner.firstName,
          ownerLastName: res.data.courseOwner.lastName,
          ownerId: res.data.courseOwner.ownerId,
          transaction: true,
        })
      )
      .catch((error) => {
        if (!error.response || error.response.status === 500) {
          this.props.history.push("/error");
        } else if (error.response.status === 404) {
          this.setState({ failure: true });
        }
      })
      .finally(() => {
        if (this.state.failure) {
          this.props.history.push("/notfound");
        }
      });
  }

  render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;

    const descriptionMarkdown = `${this.state.desc}`;
    const materialsMarkdown = `${this.state.materials}`;

    if (authUser) {
      if (authUser.id === this.state.ownerId) {
        this.owner = true;
      } else {
        this.owner = false;
      }
    } else {
      this.owner = false;
    }

    return (
      <div id="root">
        <div>
          <hr />
          <div>
            <div className="actions--bar">
              <div className="bounds">
                <div className="grid-100">
                  <span>
                    {this.owner ? (
                      <React.Fragment>
                        <Link
                          className="button"
                          to={`/courses/${this.state.results.id}/update`}
                        >
                          Update Course
                        </Link>
                        <Link className="button" to={"#"} onClick={this.delete}>
                          Delete Course
                        </Link>
                      </React.Fragment>
                    ) : null}
                  </span>
                  {!this.owner && authUser ? (
                    <Link className="button" to="/courses/create">
                      Create a Course
                    </Link>
                  ) : null}
                  {authUser ? null : (
                    <Link className="button" to="/sign-up">
                      Sign Up
                    </Link>
                  )}
                  <Link className="button button-secondary" to="/courses">
                    Return to List
                  </Link>
                </div>
              </div>
            </div>
            <div className="bounds course--detail">
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{this.state.results.title}</h3>
                  <p>
                    By {this.state.ownerFirstName} {this.state.ownerLastName}
                  </p>
                </div>
                <div className="course--description">
                  <ReactMarkdown source={descriptionMarkdown} />
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <h3>{this.state.results.estimatedTime}</h3>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <ul>
                        <ReactMarkdown source={materialsMarkdown} />
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  delete = () => {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const emailAddress = authUser.emailAddress;
    const password = authUser.password;

    const { title, description, estimatedTime, materialsNeeded } = this.state;

    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    };

    const cId = this.props.match.params.id;

    console.log(cId);

    context.data
      .deleteCourse(course, cId, emailAddress, password)
      .then((errors) => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          console.log("Course deleted");
          this.props.history.push("/courses");
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/courses");
      });
  };
}

export default CourseDetail;
