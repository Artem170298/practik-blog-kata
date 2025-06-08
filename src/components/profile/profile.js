import React from "react";
import avatar from "../Rectangle 1.png";

import "./profile.css";

const Profile = () => {
  return (
    <div className="lt-article-author">
      <div className="article-info">
        <h3 className="author">John Doe</h3>
        <h5 className="article-date">March 5, 2020</h5>
      </div>
      <div className="avatar">
        <img src={avatar}></img>
      </div>
    </div>
  );
};

export default Profile;
