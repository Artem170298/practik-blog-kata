/* eslint-disable no-console */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createArticle } from "../../store/actions";
import "./create-article-form.css";

const CreateArticleForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.articles);

  const [tags, setTags] = useState([0]);
  const [tagInputs, setTagInputs] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    body: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tagList = Object.values(tagInputs).filter((tag) => tag.trim() !== "");
    const articleData = {
      ...formData,
      tagList,
    };

    try {
      const result = await dispatch(createArticle(articleData));
      if (result) {
        navigate(`/article/${result.slug}`);
      }
    } catch (err) {
      console.error("Article creation error:", err);
    }
  };

  const addNewTag = () => {
    const newTagId = tags.length > 0 ? Math.max(...tags) + 1 : 0;
    setTags([...tags, newTagId]);
  };

  const deleteTag = (id) => {
    setTags(tags.filter((tagId) => tagId !== id));
    const newTagInputs = { ...tagInputs };
    delete newTagInputs[id];
    setTagInputs(newTagInputs);
  };

  const handleTagInputChange = (id, value) => {
    setTagInputs({
      ...tagInputs,
      [id]: value,
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const tagsInput = tags.map((tagId) => {
    return (
      <div className="create-tag" key={tagId}>
        <input
          className="input"
          type="text"
          value={tagInputs[tagId] || ""}
          onChange={(e) => handleTagInputChange(tagId, e.target.value)}
          placeholder="Tag"
          disabled={loading}
        />
        {tags.length !== 1 ? (
          <button type="button" className="delete-btn tag-delete" onClick={() => deleteTag(tagId)} disabled={loading}>
            Delete
          </button>
        ) : null}
        {tagId === tags[tags.length - 1] && (
          <button type="button" className="delete-btn tag-delete tag-add" onClick={addNewTag} disabled={loading}>
            Add tag
          </button>
        )}
      </div>
    );
  });

  return (
    <form className="create-article-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Create new article</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="input-group">
        <label className="label" htmlFor="title">
          Title
        </label>
        <input
          className="input lg-input"
          type="text"
          id="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
          required
          disabled={loading}
        />
      </div>

      <div className="input-group">
        <label className="label" htmlFor="description">
          Short description
        </label>
        <input
          className="input lg-input"
          type="text"
          id="description"
          placeholder="Short description"
          value={formData.description}
          onChange={handleInputChange}
          required
          disabled={loading}
        />
      </div>

      <div className="textarea">
        <label htmlFor="body" className="textarea-label">
          Text
        </label>
        <textarea
          id="body"
          className="text-textarea"
          placeholder="Text"
          rows={10}
          cols={113}
          value={formData.body}
          onChange={handleInputChange}
          required
          disabled={loading}
        />
      </div>

      <div className="create-tags-block">
        <label className="label-tags">Tags</label>
        {tagsInput}
      </div>

      <button className="create-button send-btn" disabled={loading}>
        {loading ? "Sending..." : "Send"}
      </button>
    </form>
  );
};

export default CreateArticleForm;
