// Статьи
export const FETCH_ARTICLES_START = "FETCH_ARTICLES_START";
export const FETCH_ARTICLES_SUCCESS = "FETCH_ARTICLES_SUCCESS";
export const FETCH_ARTICLES_FAILURE = "FETCH_ARTICLES_FAILURE";

// Авторизация
export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const FETCH_ARTICLE_REQUEST = "FETCH_ARTICLE_REQUEST";
export const FETCH_ARTICLE_SUCCESS = "FETCH_ARTICLE_SUCCESS";
export const FETCH_ARTICLE_FAILURE = "FETCH_ARTICLE_FAILURE";

export const updateUser = (userData) => async (dispatch) => {
  dispatch({ type: "UPDATE_PROFILE_START" });
  try {
    const token = localStorage.getItem("userToken");
    const response = await fetch("https://blog-platform.kata.academy/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ user: userData }),
    });

    const data = await response.json();
    localStorage.setItem("userToken", data.user.token);
    localStorage.setItem("userName", data.user.username);
    localStorage.setItem("userEmail", data.user.email);
    localStorage.setItem("userImage", data.user?.image);
    console.log(data);

    if (!response.ok) {
      throw data.errors || "Failed to update profile";
    }

    dispatch({ type: "UPDATE_PROFILE_SUCCESS", payload: data.user });
    return data.user; // Важно: возвращаем данные пользователя
  } catch (error) {
    dispatch({ type: "UPDATE_PROFILE_FAILURE", payload: error });
    throw error; // Пробрасываем ошибку для обработки в компоненте
  }
};

export const fetchArticles =
  (page = 1, limit = 10) =>
  async (dispatch) => {
    dispatch({ type: FETCH_ARTICLES_START });

    try {
      const offset = (page - 1) * limit;
      const response = await fetch(`https://blog-platform.kata.academy/api/articles?limit=${limit}&offset=${offset}`);
      const data = await response.json();
      console.log(data);

      if (!response.ok) throw new Error(data.message || "Failed to fetch articles");

      dispatch({
        type: FETCH_ARTICLES_SUCCESS,
        payload: {
          articles: data.articles,
          articlesCount: data.articlesCount,
        },
      });
    } catch (error) {
      dispatch({
        type: FETCH_ARTICLES_FAILURE,
        payload: error.message,
      });
    }
  };

export const fetchArticle = (slug) => async (dispatch) => {
  dispatch({ type: FETCH_ARTICLE_REQUEST });
  try {
    const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`);
    const data = await response.json();
    console.log(data);

    dispatch({ type: FETCH_ARTICLE_SUCCESS, payload: data.article });
  } catch (error) {
    dispatch({ type: FETCH_ARTICLE_FAILURE, payload: error.message });
  }
};

// Авторизация
export const loginUser = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_START });

  try {
    const response = await fetch("https://blog-platform.kata.academy/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: { email, password } }),
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) throw new Error(data.message || "Login failed");

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });

    localStorage.setItem("userToken", data.user.token);
    localStorage.setItem("userName", data.user.username);
    localStorage.setItem("userEmail", data.user.email);
    localStorage.setItem("userImage", data.user?.image);
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.message,
    });
  }
};

export const registerUser = (username, email, password) => async (dispatch) => {
  dispatch({ type: REGISTER_START });

  try {
    const response = await fetch("https://blog-platform.kata.academy/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        mode: "cors",
      },
      body: JSON.stringify({
        user: {
          username: username.trim(),
          email: email.trim(),
          password,
        },
      }),
      credentials: "same-origin", // Добавляем при необходимости CORS
    });

    // Проверяем, что ответ вообще получен
    if (!response) {
      throw new Error("No response from server");
    }

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      // Подробный разбор ошибок API
      const errorDetails = data.errors
        ? Object.entries(data.errors)
            .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(", ") : messages}`)
            .join("; ")
        : data.message || `HTTP error ${response.status}`;

      throw new Error(errorDetails);
    }

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data.user,
    });

    return data.user; // Для дальнейшего использования
  } catch (error) {
    // Улучшенное логирование ошибок
    const errorMessage =
      error.name === "TypeError" && error.message === "Failed to fetch"
        ? "Network error: Could not connect to server"
        : error.message;

    console.error("Registration failed:", {
      error: errorMessage,
      timestamp: new Date().toISOString(),
    });

    dispatch({
      type: REGISTER_FAILURE,
      payload: errorMessage,
    });

    // Пробрасываем ошибку для обработки в компоненте
    throw error;
  }
};

// Выход
export const logoutUser = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("userName");

  localStorage.removeItem("userEmail");
  localStorage.removeItem("userImage");
  return { type: LOGOUT };
};
