import React, { Fragment } from "react";
import { Pagination } from "antd";
import LittleArticle from "../little-article";

import "./article-list.css";

function ArticleList() {
  return (
    <Fragment>
      <div className="article-list">
        <LittleArticle />
        <LittleArticle />
        <LittleArticle />
        <LittleArticle />
        <LittleArticle />
      </div>
      <Pagination className="pagination" current={1} total={100} showSizeChanger={false} defaultPageSize={20} />
    </Fragment>
  );
}

export default ArticleList;
