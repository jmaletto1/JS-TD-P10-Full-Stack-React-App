/*
Data.js is a helper class that allows Context.js and other components
to complete the course application.

The api method builds the connection to the rest API, and determines other
options such as the method (GET/POST etc) as well as user credentials.

It also contains the core functions that allow the client to:
* Log in
* Sign Up
* Submit a Course
* Update a Course
* Delete a Course

All of these functions create a connection to the REST API using the api function.
These methods include the user's credentials (if required) and direct the application
on how to act depending on which response code is received from the server.

*/

export default class Data {
  api(
    path,
    method = "GET",
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    const url = "http://localhost:5000/api" + path;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(
        `${credentials.emailAddress}:${credentials.password}`
      );
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, "GET", null, true, {
      emailAddress,
      password,
    });
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  async createUser(user) {
    const response = await this.api("/users", "POST", user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  async submitCourse(course, emailAddress, password) {
    const response = await this.api("/courses", "POST", course, true, {
      emailAddress,
      password,
    });
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  async updateCourse(course, id, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, "PUT", course, true, {
      emailAddress,
      password,
    });
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  async deleteCourse(course, id, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, "DELETE", course, true, {
      emailAddress,
      password,
    });
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
}
