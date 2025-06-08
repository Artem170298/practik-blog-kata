import React from "react";
import "./header.css";

function Header() {
  return (
    <header className="header">
      <h4>Realworld Blog</h4>
      <div className="authorization-button">
        <a>Sign In</a>
        <a>Sign Up</a>
      </div>
    </header>
  );
}

export default Header;
