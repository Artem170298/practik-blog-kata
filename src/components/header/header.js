import React, { useEffect, useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";

import AuthorizationButton from "../authorization-button";
import HeaderAuthoriz from "../header-authoriz";

function Header() {
  const [authorization, setAuthorization] = useState(localStorage.getItem("userToken"));
  const [avatar, setAvatar] = useState(localStorage.getItem("userImage"));

  useEffect(() => {
    const checkStorageChanges = () => {
      const newToken = localStorage.getItem("userToken");
      const newAvatar = localStorage.getItem("userImage");

      if (newToken !== authorization) {
        setAuthorization(newToken);
      }
      if (newAvatar !== avatar) {
        setAvatar(newAvatar);
      }
    };

    // Проверяем изменения каждые 500мс
    const interval = setInterval(checkStorageChanges, 500);

    // Также проверяем при монтировании
    checkStorageChanges();

    return () => {
      clearInterval(interval);
    };
  }, [authorization, avatar]);

  useEffect(() => {
    const handleProfileUpdate = (e) => {
      const userData = e.detail;
      // Обновить состояние компонента
    };

    window.addEventListener("userProfileUpdated", handleProfileUpdate);
    return () => window.removeEventListener("userProfileUpdated", handleProfileUpdate);
  }, []);

  useEffect(() => {
    const handleCustomEvent = () => {
      setAuthorization(localStorage.getItem("userToken"));
      setAvatar(localStorage.getItem("userImage"));
    };

    window.addEventListener("localStorageUserTokenUpdated", handleCustomEvent);
    return () => {
      window.removeEventListener("localStorageUserTokenUpdated", handleCustomEvent);
    };
  }, []);

  return (
    <header className="header">
      <Link to="/" className="header-title-link">
        <h4 className="header-title">Realworld Blog</h4>
      </Link>
      {authorization ? <HeaderAuthoriz avatar={avatar} /> : <AuthorizationButton />}
    </header>
  );
}

export default Header;
