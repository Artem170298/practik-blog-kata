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

export const fetchArticles = () => async (dispatch) => {
  dispatch({ type: FETCH_ARTICLES_START });

  try {
    const response = await fetch("https://blog-platform.kata.academy/api/articles");
    const data = await response.json();
    console.log(data);

    if (!response.ok) throw new Error(data.message || "Failed to fetch articles");

    dispatch({
      type: FETCH_ARTICLES_SUCCESS,
      payload: data.articles,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ARTICLES_FAILURE,
      payload: error.message,
    });
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
  return { type: LOGOUT };
};
