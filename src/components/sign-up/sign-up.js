import React from "react";
import { Link } from "react-router-dom";
import CheckBox from "../check-box";
import Input from "../input";

import "./sign-up.css";

const SignUp = () => {
  return (
    <form className="create-form">
      <h2 className="form-title">Create new account</h2>
      <div className="input-container">
        <Input id="username" label="Username" placeholder="Username" />
        <Input id="email-address" label="Email address" placeholder="Email address" type="email" />
        <Input id="password" label="Password" placeholder="Password" type="password" />
        <Input id="repeat-password" label="Repeat Password" placeholder="Password" type="password" />
      </div>
      <div>
        <CheckBox
          label="I agree to the processing of my personal 
information"
        />
      </div>
      <div className="action-block">
        <button className="create-button">Create</button>
        <span className="security-question">
          Already have an account?{" "}
          <Link to="/sign-in">
            <a href="#" className="sign">
              Sign In
            </a>
          </Link>
          .
        </span>
      </div>
    </form>
  );
};

export default SignUp;
