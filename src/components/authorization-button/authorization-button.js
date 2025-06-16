import React from "react";
import { Link } from "react-router-dom";

import "./authorization-button.css";

const AuthorizationButton = () => {
  return (
    <div className="authorization-button">
      <Link to="/sign-in">
        <div className="sing-in">Sign In</div>
      </Link>
      <Link to="/sign-up">
        <div className="sing-up">Sign Up</div>
      </Link>
    </div>
  );
};

export default AuthorizationButton;
