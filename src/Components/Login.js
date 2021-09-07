import React, { Component } from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
//import { FaTwitter } from "react-icons/fa";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Forgetpassword from "./Forgetpassword";
import "../index.css";

const API_URL = "http://localhost:4000/";
const LOGIN_URL = "login/";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      authFlag: false,
    };

    this.handleSubmit = this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.setState({
      authFlag: false,
    });
  }
  handleValidation() {
    let formIsValid = true;

    //Username
    if (!this.state.email) {
      formIsValid = false;
      alert("Email is a Required field");
      console.log("Email cannot be empty");
    }

    //Password
    if (!this.state.password) {
      formIsValid = false;
      alert("Password is a Required field");
      console.log("Password cannot be empty");
    }

    return formIsValid;
  }
  handleSubmit(event) {
    console.log(this.state.email + " " + this.state.password);

    event.preventDefault();
    if (this.handleValidation()) {
      console.log("Login Form submitted");
      const requestdata = {
        email: this.state.email,
        password: this.state.password,
      };

      axios
        .post(API_URL + LOGIN_URL + "login", requestdata)
        .then((response) => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            this.setState({
              authFlag: true,
            });

            let message = JSON.stringify(response.data);
            let messageObject = JSON.parse(message);

            alert(messageObject.responseMessage);
          }
        })
        .catch((error) => {
          console.log("Error is:", error);
          alert("Authentication Failed! Please try again");
        });
    }
  }

  emailField = (e) => {
    this.setState({ email: e.target.value });
  };

  passField = (e) => {
    this.setState({ password: e.target.value });
  };
  render() {
    return (
      <BrowserRouter>
        <form className="LoginForm  col-container">
          <div className="form-group ">
            {/* <i className="fas fa-user-alt" /> */}
            <input
              type="email"
              className="form-control"
              placeholder="Email Address"
              useRef="email"
              onChange={this.emailField}
              handleValidation={[required]}
            />
          </div>
          <div className="form-group ">
            {/* <i className="fas fa-key" /> */}
            <input
              type="password"
              className="form-control"
              placeholder=" Password"
              useRef="password"
              onChange={this.passwordField}
            />
          </div>
          <input
            type="submit"
            className="btn  btn-lg btn btn-block 
            form-control "
            onClick={this.handleSubmit}
            handleValidation={[required]}
          />
          <div>
            <p className="forgot-password text-right create">
              <a href="/Forgetpassword"> Forgot Password?</a>
            </p>
            <Switch>
              <Route exact path="/Forgetpassword" component={Forgetpassword} />
            </Switch>
          </div>
        </form>
      </BrowserRouter>
    );
  }
}
