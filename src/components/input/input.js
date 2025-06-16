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

// import React from "react";
// import "./input.css";

// const Input = ({
//   id,
//   type = "text",
//   label,
//   placeholder,
//   className = "input",
//   value,
//   onChange,
//   error = "",
//   required = false,
//   ...props
// }) => {
//   return (
//     <div className="input-group">
//       <label className="label" htmlFor={id}>
//         {label}
//         {required && <span className="required-asterisk"> *</span>}
//       </label>
//       <input
//         className={`${className} ${error ? "input-error" : ""}`}
//         type={type}
//         id={id}
//         name={id}
//         placeholder={placeholder}
//         value={value}
//         onChange={onChange}
//         aria-invalid={!!error}
//         aria-describedby={error ? `${id}-error` : undefined}
//         required={required}
//         {...props}
//       />
//       {error && (
//         <div id={`${id}-error`} className="error-message">
//           {error}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Input;
