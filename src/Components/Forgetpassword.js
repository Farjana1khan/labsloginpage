import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Login";
import "../index.css";

export default class Forgetpassword extends Component {
  render() {
    return (
      <BrowserRouter>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group ">
            <input
              type="email"
              className="form-control"
              placeholder="Email Address"
            />
          </div>

          <button
            type="submit"
            className="btn  btn-orange btn-block 
            form-control "
          >
            Reset
          </button>

          <div>
            <p className="forgot-password text-right create">
              <a href="/Login" className="icon">
                <i class="fas fa-less-than" />
                <i class="fas fa-less-than" /> Login
              </a>
            </p>
            <Switch>
              <Route exact path="/Login" component={Login} />
            </Switch>
          </div>
        </form>
      </BrowserRouter>
    );
  }
}
