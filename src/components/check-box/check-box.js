import { Checkbox } from "antd";
import "./check-box.css";

export default function CheckBox({ label }) {
  return (
    <div className="checkbox-div">
      <Checkbox>{label}</Checkbox>
    </div>
  );
}
