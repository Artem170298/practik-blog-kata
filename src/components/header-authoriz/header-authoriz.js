import React from "react";
import Profile from "../profile";
import "./header-authoriz.css";

const HeaderAuthoriz = () => {
  return (
    <div className="header-autoriz">
      <button className="create-article-btn">Create article</button>
      <Profile></Profile>
      <button className="log-out-btn">Log Out</button>
    </div>
  );
};

export default HeaderAuthoriz;
