import React from "react";
import ArticleTitle from "../article-title";
import Profile from "../profile";
import Tags from "../tags";

import "./little-article.css";

function LittleArticle() {
  return (
    <div className="lt-article-card">
      <div className="lt-article-main">
        <ArticleTitle />
        <Tags tags={["tag1", "tag2"]} />
        <p className="lt-parag">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </p>
      </div>
      <Profile date={true} />
    </div>
  );
}

export default LittleArticle;
