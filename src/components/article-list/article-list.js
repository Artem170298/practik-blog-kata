import React, { Fragment, useEffect } from "react";
import { Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../../store/actions";
import LittleArticle from "../little-article";

import "./article-list.css";

function ArticleList() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <Fragment>
      <div className="article-list">
        {items.map((article) => (
          <LittleArticle key={article.slug} article={article} />
        ))}
      </div>
      <Pagination className="pagination" current={1} total={100} showSizeChanger={false} defaultPageSize={20} />
    </Fragment>
  );
}

export default ArticleList;
