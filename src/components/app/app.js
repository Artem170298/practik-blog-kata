import React from "react";
import Header from "../header";
import ArticleList from "../article-list";
import Article from "../article";

import "./app.css";

function App() {
  return (
    <div className="app">
      <Header />
      {/* <ArticleList /> */}
      <Article />
    </div>
  );
}

export default App;
