import React from "react";
import ArticleTitle from "../article-title";
import Profile from "../profile";
import Tags from "../tags";

import "./little-article.css";

function LittleArticle({ article }) {
  return (
    <div className="lt-article-card">
      <div className="lt-article-main">
        <ArticleTitle
          title={article.title}
          heards={article.favoritesCount}
          slug={article.slug}
          favorited={article.favorited}
          link="/article/"
        />
        <Tags tags={article.tagList} />
        <p className="lt-parag">{article.description}</p>
      </div>
      <Profile date={true} createdDate={article.createdAt} author={article.author} avatar={article.author.image} />
    </div>
  );
}

export default LittleArticle;
