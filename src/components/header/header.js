import React from "react";
import "./header.css";

import AuthorizationButton from "../authorization-button";
import HeaderAuthoriz from "../header-authoriz";

function Header() {
  const authorization = false;
  return (
    <header className="header">
      <h4 className="header-title">Realworld Blog</h4>
      {authorization ? <HeaderAuthoriz /> : <AuthorizationButton />}
    </header>
  );
}

export default Header;
