import React from "react";
import avatar from "../Rectangle 1.png";

import "./profile.css";

const Profile = ({ date }) => {
  return (
    <div className="lt-article-author">
      <div className="article-info">
        <h3 className="author">John Doe</h3>
        {date ? <h5 className="article-date">March 5, 2020</h5> : null}
      </div>
      <div className="avatar">
        <img src={avatar}></img>
      </div>
    </div>
  );
};

export default Profile;
