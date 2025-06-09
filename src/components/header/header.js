import React from "react";
import "./header.css";

function Header() {
  return (
    <header className="header">
      <h4 className="header-title">Realworld Blog</h4>
      <div className="authorization-button">
        <a href="#" className="sing-in">
          Sign In
        </a>
        <a href="#" className="sing-up">
          Sign Up
        </a>
      </div>
    </header>
  );
}

export default Header;
