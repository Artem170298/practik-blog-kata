import React, { useState } from "react";
import Input from "../input";

import "./edit-article.css";

const EditArticle = () => {
  const [tags, setTags] = useState([0]); // Начинаем с одного тега
  const [tagInputs, setTagInputs] = useState({}); // Для хранения значений input'ов

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ваша логика обработки формы
  };

  const addNewTag = () => {
    const newTagId = tags.length > 0 ? Math.max(...tags) + 1 : 0;
    setTags([...tags, newTagId]);
  };

  const deleteTag = (id) => {
    setTags(tags.filter((tagId) => tagId !== id));

    // Удаляем соответствующее значение из tagInputs
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

  const tagsInput = tags.map((tagId) => {
    return (
      <div className="create-tag" key={tagId}>
        <input
          className="input"
          type="text"
          value={tagInputs[tagId] || ""}
          onChange={(e) => handleTagInputChange(tagId, e.target.value)}
          placeholder="Tag"
        />
        {tags.length !== 1 ? (
          <button type="button" className="delete-btn tag-delete" onClick={() => deleteTag(tagId)}>
            Delete
          </button>
        ) : null}
        {tagId === tags[tags.length - 1] && (
          <button type="button" className="delete-btn tag-delete tag-add" onClick={addNewTag}>
            Add tag
          </button>
        )}
      </div>
    );
  });

  return (
    <form className="create-article-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Edit article</h2>
      <Input id="Title" label="Title" placeholder="Title" className="input lg-input" />
      <Input id="short-description" label="Short description" placeholder="Title" className="input lg-input" />
      <div className="textarea">
        <label htmlFor="text" className="textarea-label">
          Text
        </label>
        <textarea id="text" className="text-textarea" placeholder="Text" rows={10} cols={113} />
      </div>
      <div className="create-tags-block">
        <label className="label-tags">Tags</label>
        {tagsInput}
      </div>
      <button className="create-button send-btn">Send</button>
    </form>
  );
};

export default EditArticle;
