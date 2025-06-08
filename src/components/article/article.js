import React from "react";
import ReactMarkdown from "react-markdown";
import Profile from "../profile";

import "./article.css";

const Article = () => {
  let markdown;
  return (
    <div className="article">
      <div className="block-lt-arcticle">
        <div className="lt-article-main">
          <a className="link">
            <h1 className="lt-article-title">Some article title</h1>
          </a>
          <div className="lt-tags">
            <div className="lt-tag">tag1</div>
            <div className="lt-tag">tag22222</div>
          </div>
          <p className="lt-parag">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </p>
        </div>
        <Profile />
      </div>
      <ReactMarkdown>{markdown}</ReactMarkdown>;
    </div>
  );
};

export default Article;
