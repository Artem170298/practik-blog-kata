import React, { Fragment, useEffect, useState } from "react";
import { Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { fetchArticles } from "../../store/actions";
import LittleArticle from "../little-article";
import "./article-list.css";

function ArticleList() {
  const dispatch = useDispatch();
  const { items, loading, error, articlesCount } = useSelector((state) => state.articles);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Количество статей на странице

  useEffect(() => {
    dispatch(fetchArticles(currentPage, pageSize));
  }, [dispatch, currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const debouncedPageChange = debounce(handlePageChange, 300);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <Fragment>
      <div className="article-list">
        {items.map((article) => (
          <LittleArticle key={article.slug} article={article} />
        ))}
      </div>
      <Pagination
        className="pagination"
        current={currentPage}
        total={articlesCount || 0}
        showSizeChanger={false}
        pageSize={pageSize}
        onChange={debouncedPageChange}
      />
    </Fragment>
  );
}

export default ArticleList;
