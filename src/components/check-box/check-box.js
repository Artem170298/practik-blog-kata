import { Checkbox } from "antd";
import "./check-box.css";

const CheckBox = ({
  name,
  label,
  onChange,
  checked = false,
  error = "",
  required = false,
  check,
  setCheck,
  ...props
}) => {
  return (
    <div className={`checkbox-container ${error ? "has-error" : ""}`}>
      <Checkbox
        name={name}
        checked={check}
        onChange={setCheck}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        {...props}
      >
        <span className="checkbox-label">
          {label}
          {required && <span className="required-asterisk"> *</span>}
        </span>
      </Checkbox>

      {error && (
        <div id={`${name}-error`} className="error-message">
          {error}
        </div>
      )}
    </div>
  );
};

export default CheckBox;
