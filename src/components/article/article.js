import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticle } from "../../store/actions";
import ArticleTitle from "../article-title";
import Profile from "../profile";
import Tags from "../tags";

import "./article.css";

const Article = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const { data: article, loading, error } = useSelector((state) => state.article);
  const currentUser = useSelector((state) => state.auth.user);

  const isAuthor = currentUser && article && currentUser.username === article.author.username;

  useEffect(() => {
    dispatch(fetchArticle(slug));
  }, [dispatch, slug]);

  if (loading) return <div className="article-loading">Loading...</div>;
  if (error) return <div className="article-error">Error: {error}</div>;
  if (!article) return <div className="article-not-found">Article not found</div>;

  return (
    <div className="article">
      <div className="block-lt-arcticle">
        <div className="lt-article-main">
          <ArticleTitle title={article.title} heards={article.favoritesCount} />
          <Tags tags={article.tagList} />
          <p className="lt-parag">{article.description}</p>
        </div>
        <div className="block-profile-and-redocution">
          <Profile author={article.author} createdDate={article.createdAt} date={true} />
          {isAuthor ? (
            <div className="redocution-btn">
              <Link to="/">
                <button className="delete-btn">Delete</button>
              </Link>
              <Link to={`/edit-article/${article.slug}`}>
                <button className="edit-btn">Edit</button>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
      <div className="article-body">
        <ReactMarkdown>{article.body}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Article;
