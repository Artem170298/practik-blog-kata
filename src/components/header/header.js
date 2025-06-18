import React, { useEffect, useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthorizationButton from "../authorization-button";
import HeaderAuthoriz from "../header-authoriz";

function Header() {
  const { user, userToken } = useSelector((state) => state.auth);
  const [localUserData, setLocalUserData] = useState({
    avatar: localStorage.getItem("userImage"),
    username: localStorage.getItem("userName"),
  });

  useEffect(() => {
    if (user) {
      setLocalUserData({
        avatar: user.image || localStorage.getItem("userImage"),
        username: user.username || localStorage.getItem("userName"),
      });
    }
  }, [user]);

  // Обработчик событий обновления профиля
  useEffect(() => {
    const handleProfileUpdate = (e) => {
      const { username, image } = e.detail;
      setLocalUserData((prev) => ({
        ...prev,
        avatar: image || prev.avatar,
        username: username || prev.username,
      }));
    };

    window.addEventListener("userProfileUpdated", handleProfileUpdate);
    return () => window.removeEventListener("userProfileUpdated", handleProfileUpdate);
  }, []);

  const isAuthorized = Boolean(userToken || localStorage.getItem("userToken"));

  return (
    <header className="header">
      <Link to="/" className="header-title-link">
        <h4 className="header-title">Realworld Blog</h4>
      </Link>
      {isAuthorized ? (
        <HeaderAuthoriz avatar={localUserData.avatar} username={localUserData.username} />
      ) : (
        <AuthorizationButton />
      )}
    </header>
  );
}

export default Header;
