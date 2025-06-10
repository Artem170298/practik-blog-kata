import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../header";
import ArticleList from "../article-list";
import Article from "../article";
import SignUp from "../sign-up";
import SignIn from "../sign-in";
import EditProfile from "../edit-profile";
import CreateArticleForm from "../create-article-form";
import EditArticle from "../edit-article";

import "./app.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/article/:slug" element={<Article />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/profile" element={<EditProfile />} />
          <Route path="/new-article" element={<CreateArticleForm />} />
          <Route path="/edit-article/:slug" element={<EditArticle />} />
          <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
