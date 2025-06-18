/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
import { fetchArticle, deleteArticle } from "../../store/actions";
import ArticleTitle from "../article-title";
import Profile from "../profile";
import Tags from "../tags";
import ConfirmationModal from "../confirmation-modal";
import "./article.css";

const Article = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data: article, loading, error } = useSelector((state) => state.article);
  const currentUser = useSelector((state) => state.auth.user);
  const user = localStorage.getItem("userName");
  const isAuthor = user && article && user === article.author.username;

  useEffect(() => {
    dispatch(fetchArticle(slug));
  }, [dispatch, slug]);

  const handleDelete = async () => {
    try {
      await dispatch(deleteArticle(slug));
      navigate("/");
    } catch (err) {
      console.error("Delete article error:", err);
    }
  };

  if (loading)
    return (
      <div className="loading">
        <Flex align="center" gap="middle">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 60 }} spin />} />
        </Flex>
      </div>
    );
  if (error) return <div className="article-error">Error: {error}</div>;
  if (!article) return <div className="article-not-found">Article not found</div>;

  return (
    <div className="article">
      <div className="block-lt-arcticle">
        <div className="lt-article-main">
          <ArticleTitle
            title={article.title}
            heards={article.favoritesCount}
            slug={article.slug}
            favorited={article.favorited}
          />
          <Tags tags={article.tagList} />
          <p className="lt-parag">{article.description}</p>
        </div>
        <div className="block-profile-and-redocution">
          <Profile author={article.author} createdDate={article.createdAt} date={true} avatar={article.author.image} />
          {isAuthor ? (
            <div className="redocution-btn">
              <button className="delete-btn" onClick={() => setShowDeleteModal(true)}>
                Delete
              </button>
              <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                message="Are you sure you want to delete this article?"
              />
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
