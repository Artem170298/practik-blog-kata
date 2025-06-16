import React, { useEffect, useState } from "react";
import "./header.css";

import AuthorizationButton from "../authorization-button";
import HeaderAuthoriz from "../header-authoriz";

function Header() {
  const [authorization, setAuthorization] = useState(localStorage.getItem("userToken"));

  useEffect(() => {
    // Функция для обработки изменений в localStorage
    const handleStorageChange = () => {
      setAuthorization(localStorage.getItem("userToken"));
    };

    // Слушаем событие изменения localStorage
    window.addEventListener("storage", handleStorageChange);

    // Также проверяем изменения при монтировании компонента
    handleStorageChange();

    // Убираем слушатель при размонтировании компонента
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const handleCustomEvent = () => {
      setAuthorization(localStorage.getItem("userToken"));
    };

    window.addEventListener("localStorageUserTokenUpdated", handleCustomEvent);

    return () => {
      window.removeEventListener("localStorageUserTokenUpdated", handleCustomEvent);
    };
  }, []);

  return (
    <header className="header">
      <h4 className="header-title">Realworld Blog</h4>
      {authorization ? <HeaderAuthoriz /> : <AuthorizationButton />}
    </header>
  );
}

export default Header;
