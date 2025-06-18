import React from "react";

import "./input.css";

const Input = ({ id, type = "text", label, placeholder, className = "input", value, onChange }) => {
  return (
    <div className="input-group">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <input
        className={className}
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
