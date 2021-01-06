import React, { Component } from "react";
import Form from "./Form";
import axios from "axios";

class UpdateCourse extends Component {
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
      isOwner: false,
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
          ownerId: res.data.courseOwner.ownerId,
        })
      )
      .catch("There's been an error!");
  }

  render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    console.log(this.state.ownerId);

    if (this.state.ownerId === authUser.id) {
      return (
        <div id="root">
          <div className="bounds course--detail">
            <h1>Update Course No:{this.state.results.id}</h1>
            <div>
              <form>
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
                        defaultValue={this.state.results.title}
                      />
                    </div>
                    <p>
                      By {this.state.ownerFirstName} {this.state.ownerLastName}.
                      User number {this.state.ownerId}
                    </p>
                  </div>
                  <div className="course--description">
                    <div>
                      <textarea
                        id="description"
                        name="description"
                        className
                        placeholder="Course description..."
                        defaultValue={this.state.desc}
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
                            defaultValue={this.state.results.estimatedTime}
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
                            placeholder="List materials..."
                            defaultValue={this.state.materials}
                          />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="grid-100 pad-bottom">
                  <button className="button" type="submit">
                    Update Course
                  </button>
                  <button
                    className="button button-secondary"
                    onclick="event.preventDefault(); location.href='course-detail.html';"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
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
}

export default UpdateCourse;
