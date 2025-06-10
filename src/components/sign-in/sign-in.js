import React from "react";
import { Link } from "react-router-dom";
import Input from "../input";

import "./sign-in.css";

const SignIn = () => {
  return (
    <form className="create-form">
      <h2 className="form-title">Sign In</h2>
      <div className="input-container">
        <Input id="email-address" label="Email address" placeholder="Email address" type="email" />
        <Input id="password" label="Password" placeholder="Password" type="password" />
      </div>

      <div className="action-block">
        <button className="create-button">Login</button>
        <span className="security-question">
          Don’t have an account?{" "}
          <Link to="/sign-up">
            <a href="#" className="sign">
              Sign Up
            </a>
          </Link>
          .
        </span>
      </div>
    </form>
  );
};

export default SignIn;
