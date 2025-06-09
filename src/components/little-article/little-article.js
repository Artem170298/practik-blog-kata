import React from "react";
import ArticleTitle from "../article-title";
import Profile from "../profile";

import "./little-article.css";

function LittleArticle() {
  return (
    <div className="lt-article-card">
      <div className="lt-article-main">
        <ArticleTitle />
        <div className="lt-tags">
          <div className="lt-tag">tag1</div>
          <div className="lt-tag">tag22222</div>
        </div>
        <p className="lt-parag">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </p>
      </div>
      <Profile />
    </div>
  );
}

export default LittleArticle;
