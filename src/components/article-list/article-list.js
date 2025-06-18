import React, { Fragment, useEffect, useState } from "react";
import { Pagination, Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { fetchArticles } from "../../store/actions";
import LittleArticle from "../little-article";
import "./article-list.css";

function ArticleList() {
  const dispatch = useDispatch();
  const { items, loading, error, articlesCount } = useSelector((state) => state.articles);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    dispatch(fetchArticles(currentPage, pageSize));
  }, [dispatch, currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const debouncedPageChange = debounce(handlePageChange, 300);

  if (loading)
    return (
      <div>
        {" "}
        <div className="loading">
          <Flex align="center" gap="middle">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 60 }} spin />} />
          </Flex>
        </div>
      </div>
    );
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
