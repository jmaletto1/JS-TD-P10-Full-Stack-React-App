import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
          desc: res.data.description.split("\n"),
          materials: res.data.materialsNeeded.split("* "),
          ownerFirstName: res.data.courseOwner.firstName,
          ownerLastName: res.data.courseOwner.lastName,
        })
      )
      .catch("There's been an error!");
  }

  render() {
    return (
      <div id="root">
        <div>
          <hr />
          <div>
            <div className="actions--bar">
              <div className="bounds">
                <div className="grid-100">
                  <span>
                    <Link
                      className="button"
                      to={`/courses/${this.state.results.id}/update`}
                    >
                      Update Course
                    </Link>
                    <Link className="button" to="#">
                      Delete Course
                    </Link>
                  </span>
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
                  {this.state.desc.map((para) => (
                    <p>{para}</p>
                  ))}
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
                        {this.state.materials.map((item) => (
                          <li>{item}</li>
                        ))}
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
}

export default CourseDetail;
