import React from "react";
import Header from "../header";
import ArticleList from "../article-list";
import Article from "../article";
import SignUp from "../sign-up";
import SignIn from "../sign-in";
import EditProfile from "../edit-profile";
import CreateArticleForm from "../create-article-form";

import "./app.css";

function App() {
  return (
    <div className="app">
      <Header />
      {/* <ArticleList />
      <Article /> */}
      {/* <SignUp />
      <SignIn />
      <EditProfile /> */}
      <CreateArticleForm />
    </div>
  );
}

export default App;
