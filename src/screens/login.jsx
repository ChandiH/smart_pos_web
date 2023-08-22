import React from "react";
import Joi from "joi-browser";
import UserContext from "../context/UserContext";
import Form from "../components/common/form";
import { authenticate } from "../services/fakeAuthenticationService";

class Login extends Form {
  state = {
    data: {
      userName: "",
      password: "",
    },
    errors: {},
    setUser: null,
  };

  schema = {
    userName: Joi.string().required().label("Name"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
    const user = authenticate(this.state.data);
    if (user) {
      this.state.setUser({ name: user.userName });
      this.props.history.replace("/dashboard");
    } else {
      const errors = { ...this.state.errors };
      const errorMessage = "user does not exist";
      errors.userName = errorMessage;
      this.setState({ errors });
    }
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
                  {this.renderInput("userName", "Name")}
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
