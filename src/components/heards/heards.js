import React from "react";
import heard from "./Vector.png";
import "./heards.css";

const Heards = ({ heards }) => {
  return (
    <div className="heards-component">
      <button className="heards-button">
        <img className="heards-icon" src={heard}></img>
      </button>
      <span className="number-heards">{heards}</span>
    </div>
  );
};

export default Heards;
