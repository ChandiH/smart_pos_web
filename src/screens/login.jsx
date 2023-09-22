import React from "react";
import Joi from "joi-browser";
import Form from "../components/common/form";
import UserContext from "../context/UserContext";

import { authenticate } from "../services/authenticationService";

class Login extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
    setUser: null,
  };

  schema = {
    username: Joi.string().required().label("Name"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = await authenticate(this.state.data);
      console.log("token", data.token);
      localStorage.setItem("token", data.token);
    } catch (e) {
      console.log("Error Occured");
      console.log(e.response.data);
      this.setState({ errors: { ...e.response.data.error } });
    }
    // if (user) {
    //   this.state.setUser({ ...user });
    //   console.log("user", user);
    //   this.props.history.replace("/dashboard");
    // } else {
    //   const errors = { ...this.state.errors };
    //   const errorMessage = "user does not exist";
    //   errors.userName = errorMessage;
    //   this.setState({ errors });
    // }
  };

  render() {
    return (
      <UserContext.Consumer>
        {(UserContext) => {
          this.state.setUser = UserContext.setCurrentUser;
          return (
            <div
              className="container row"
              style={{
                alignContent: "center",
                justifyContent: "center",
                height: "100vh",
              }}
            >
              <div
                className="col-8"
                style={{
                  fontSize: "6vw",
                  alignSelf: "center",
                  textAlign: "center",
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                }}
              >
                SmartPOS
              </div>
              <div className="col">
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                  {this.renderInput("username", "Name")}
                  {this.renderInput("password", "Password", "password")}
                  <div className="my-3">{this.renderButton("Login")}</div>
                </form>
              </div>
            </div>
          );
        }}
      </UserContext.Consumer>
    );
  }
}

export default Login;
