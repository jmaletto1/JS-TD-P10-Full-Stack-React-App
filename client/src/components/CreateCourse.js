import React, { Component } from "react";
import Form from "./Form";

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
    const {
      // title,
      // description,
      // estimatedTime,
      // materialsNeeded,
      // userId,
      errors,
    } = this.state;

    // const { context } = this.props;
    // const authUser = context.authenticatedUser;

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
                        className
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
                            className
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

    context.data
      .submitCourse(course, emailAddress, password)
      .then((errors) => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          console.log(
            `${title} has been successfully entered into the database!`
          );
          alert("Course successfully created!");
          this.props.history.push("/courses");
        }
      })
      .then(console.log(course))
      .catch((err) => {
        console.log(err);
        this.props.history.push("/courses");
      });
  };

  cancel = () => {
    this.props.history.push("/");
  };
}

export default CreateCourse;

// <div className="grid-66">
//               <div className="course--header">
//                 <h4 className="course--label">Course</h4>
//                 <div>
//                   <input
//                     id="title"
//                     name="title"
//                     type="text"
//                     className="input-title course--title--input"
//                     placeholder="Course title..."
//                     onChange={this.change}
//                   />
//                 </div>
//                 <p>By Joe Smith</p>
//               </div>
//               <div className="course--description">
//                 <div>
//                   <textarea
//                     id="description"
//                     name="description"
//                     className
//                     placeholder="Course description..."
//                     onChange={this.change}
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="grid-25 grid-right">
//               <div className="course--stats">
//                 <ul className="course--stats--list">
//                   <li className="course--stats--list--item">
//                     <h4>Estimated Time</h4>
//                     <div>
//                       <input
//                         id="estimatedTime"
//                         name="estimatedTime"
//                         type="text"
//                         className="course--time--input"
//                         placeholder="Hours"
//                         onChange={this.change}
//                       />
//                     </div>
//                   </li>
//                   <li className="course--stats--list--item">
//                     <h4>Materials Needed</h4>
//                     <div>
//                       <textarea
//                         id="materialsNeeded"
//                         name="materialsNeeded"
//                         className
//                         placeholder="List materials..."
//                         onChange={this.change}
//                       />
//                     </div>
//                   </li>
//                 </ul>
//               </div>
//             </div>
