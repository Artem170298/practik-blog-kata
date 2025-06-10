import React from "react";
import { Link } from "react-router-dom";
import Profile from "../profile";
import "./header-authoriz.css";

const HeaderAuthoriz = () => {
  return (
    <div className="header-autoriz">
      <Link to="/new-article">
        <button className="create-article-btn">Create article</button>
      </Link>
      <Link to="/profile">
        <Profile></Profile>
      </Link>
      <button className="log-out-btn">Log Out</button>
    </div>
  );
};

export default HeaderAuthoriz;
