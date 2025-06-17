import React from "react";
import { Link } from "react-router-dom";
import Heards from "../heards";

import "./article-title.css";

const ArticleTitle = ({ title, heards, slug }) => {
  return (
    <div className="title-container">
      <Link to={`/article/${slug}`}>
        <div className="link">
          <h1 className="lt-article-title">{title}</h1>
        </div>
      </Link>
      <Heards heards={heards} />
    </div>
  );
};

export default ArticleTitle;
