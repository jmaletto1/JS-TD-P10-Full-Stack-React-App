import React, { Component } from "react";
import Cookies from "js-cookie";
import Data from "./Data";

/* 
Context.js provides the context for the bulk of this application.
This involves initially setting the cookie object on the state, meaning
the user can remain signed in if the window/tab is refreshed or exited.
A new data object is also instantiated within the Provider constructor.

*/

const Context = React.createContext();

export class Provider extends Component {
  state = {
    authenticatedUser: Cookies.getJSON("authenticatedUser") || null,
  };

  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const { authenticatedUser } = this.state;

    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
      },
    };

    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }

  /* 
  The Provider class also contains two key methods that allow the user to sign in
  and out. These alter the state by either returning an authenticatedUser, or returning
  null.
  */
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null) {
      user.password = password;
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
      Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
    }
    return user;
  };

  signOut = () => {
    this.setState(() => {
      return {
        authenticatedUser: null,
      };
    });
    Cookies.remove("authenticatedUser");
  };
}

export const Consumer = Context.Consumer;

/* 
The withContext function allows other components to make use of the context
determined within Context.js.
*/
export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {(context) => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}
