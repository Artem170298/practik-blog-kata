import React from "react";
import header from "./Vector.png";
import "./heards.css";

const Heards = () => {
  return (
    <div className="heards-component">
      <button className="heards-button">
        <img className="heards-icon" src={header}></img>
      </button>
      <span className="number-heards">12</span>
    </div>
  );
};

export default Heards;
