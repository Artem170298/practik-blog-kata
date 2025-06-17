import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/actions";
import Profile from "../profile";
import "./header-authoriz.css";

const HeaderAuthoriz = ({ avatar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    // Удаляем токен из localStorage
    localStorage.removeItem("userToken");

    // Диспатчим действие выхода
    dispatch(logoutUser());
    navigate("/");

    // Отправляем событие для обновления других компонентов
    window.dispatchEvent(new Event("localStorageUserTokenUpdated"));
  };

  return (
    <div className="header-autoriz">
      <Link to="/new-article">
        <button className="create-article-btn">Create article</button>
      </Link>
      <Link to="/profile">
        <Profile author={user} username={localStorage.getItem("userName")} avatar={avatar}></Profile>
      </Link>
      <button className="log-out-btn" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default HeaderAuthoriz;
