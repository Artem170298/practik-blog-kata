import React from "react";

import "./authorization-button.css";

const AuthorizationButton = () => {
  return (
    <div className="authorization-button">
      <a href="#" className="sing-in">
        Sign In
      </a>
      <a href="#" className="sing-up">
        Sign Up
      </a>
    </div>
  );
};

export default AuthorizationButton;
