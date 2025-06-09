import React from "react";

import "./input.css";

const Input = ({ id, type = "text", label, placeholder }) => {
  return (
    <div className="input-group">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <input className="input" type={type} id={id} name={id} placeholder={placeholder} />
    </div>
  );
};

export default Input;
