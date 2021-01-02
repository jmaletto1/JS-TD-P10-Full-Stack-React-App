export default class Data {
  api(path, method = "GET", body = null) {
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
    return fetch(url, options);
  }

  async userLogIn() {}

  async createUser(user) {
    const response = await this.api("/users", "POST", user, true, {
      firstName,
      lastName,
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

  async submitCourse() {}

  async updateCourse() {}
}
