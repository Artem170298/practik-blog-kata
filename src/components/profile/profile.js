import React from "react";
import avatar1 from "../Rectangle 1.png";

import "./profile.css";

const Profile = ({ date, createdDate, author, username, avatar }) => {
  const dates = new Date(createdDate);
  const day = dates.getDate().toString().padStart(2, "0");
  const month = (dates.getMonth() + 1).toString().padStart(2, "0");
  const year = dates.getFullYear();

  const formattedDate = `${day}.${month}.${year}`; // "13.06.2025"
  return (
    <div className="lt-article-author">
      <div className="article-info">
        <h3 className="author">{author?.username ? author?.username : username}</h3>
        {date ? <h5 className="article-date">{formattedDate}</h5> : null}
      </div>
      <div className="avatar">
        <img className="image-avatar" src={avatar === undefined ? avatar1 : avatar}></img>
      </div>
    </div>
  );
};

export default Profile;
