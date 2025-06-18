import React from "react";
import "./confirmation-modal.css";
import picter from "./exclamation-circle.png";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-content-div">
          <img src={picter} className="modal-picture" />
          <p>{message}</p>
        </div>
        <div className="modal-actions">
          <button className="modal-cancel" onClick={onClose}>
            No
          </button>
          <button className="modal-confirm" onClick={onConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
