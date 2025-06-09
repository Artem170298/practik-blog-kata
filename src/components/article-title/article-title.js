import React from "react";
import Heards from "../heards";

import "./article-title.css";

const ArticleTitle = () => {
  return (
    <div className="title-container">
      <a className="link">
        <h1 className="lt-article-title">Some article title</h1>
      </a>
      <Heards />
    </div>
  );
};

export default ArticleTitle;
