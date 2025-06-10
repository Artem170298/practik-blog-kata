import React from "react";

import "./tags.css";

const Tags = ({ tags }) => {
  const tagsArr = tags.map((tag) => {
    return (
      <div key={tag} className="lt-tag">
        {tag}
      </div>
    );
  });

  return <div className="lt-tags">{tagsArr}</div>;
};

export default Tags;
