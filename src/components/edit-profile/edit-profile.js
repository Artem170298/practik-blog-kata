import React from "react";
import Input from "../input";

import "./edit-profile.css";

const EditProfile = () => {
  return (
    <form className="create-form">
      <h2 className="form-title">Edit Profile</h2>
      <div className="input-container">
        <Input id="username" label="Username" placeholder="Username" />
        <Input id="email-address" label="Email address" placeholder="Email address" type="email" />
        <Input id="new-password" label="New password" placeholder="New password" type="password" />
        <Input
          id="avatar-image"
          label="Avatar image (url)"
          placeholder="Avatar image"
          type="url"
          pattern="https://.*"
          required
        />
      </div>

      <div className="action-block">
        <button className="create-button">Save</button>
      </div>
    </form>
  );
};

export default EditProfile;
