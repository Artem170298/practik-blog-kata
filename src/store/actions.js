// Статьи
export const FETCH_ARTICLES_START = "FETCH_ARTICLES_START";
export const FETCH_ARTICLES_SUCCESS = "FETCH_ARTICLES_SUCCESS";
export const FETCH_ARTICLES_FAILURE = "FETCH_ARTICLES_FAILURE";

// Авторизация
export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

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

// Выход
export const logoutUser = () => {
  localStorage.removeItem("userToken");
  return { type: LOGOUT };
};
