import React from "react";
import LittleArticle from "../little-article";

import "./article-list.css";

function ArticleList() {
  return (
    <div className="article-list">
      <LittleArticle />
      <LittleArticle />
      <LittleArticle />
      <LittleArticle />
      <LittleArticle />
    </div>
  );
}

export default ArticleList;
