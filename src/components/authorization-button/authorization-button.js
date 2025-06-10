import React from "react";
import { Link } from "react-router-dom";

import "./authorization-button.css";

const AuthorizationButton = () => {
  return (
    <div className="authorization-button">
      <Link to="/sign-in">
        <a href="#" className="sing-in">
          Sign In
        </a>
      </Link>
      <Link to="/sign-up">
        <a href="#" className="sing-up">
          Sign Up
        </a>
      </Link>
    </div>
  );
};

export default AuthorizationButton;
