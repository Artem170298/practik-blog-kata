import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions";
import Profile from "../profile";
import "./header-authoriz.css";

const HeaderAuthoriz = ({ avatar, username }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="header-autoriz">
      <Link to="/new-article">
        <button className="create-article-btn">Create article</button>
      </Link>
      <Link to="/profile">
        <Profile username={username} avatar={avatar}></Profile>
      </Link>
      <button className="log-out-btn" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default HeaderAuthoriz;
