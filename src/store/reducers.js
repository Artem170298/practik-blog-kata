import {
  FETCH_ARTICLES_START,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "./actions";

// Редьюсер для статей
const initialArticlesState = {
  items: [],
  loading: false,
  error: null,
};

export const articlesReducer = (state = initialArticlesState, action) => {
  switch (action.type) {
    case FETCH_ARTICLES_START:
      return { ...state, loading: true, error: null };
    case FETCH_ARTICLES_SUCCESS:
      return { ...state, items: action.payload, loading: false };
    case FETCH_ARTICLES_FAILURE:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

// Редьюсер для авторизации
const initialAuthState = {
  user: null,
  loading: false,
  error: null,
  registerSuccess: false, // Добавляем флаг успешной регистрации
  loginSuccess: false,
  userToken: "",
};

export const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return { ...state, loading: true, error: null, loginSuccess: false };
    case LOGIN_SUCCESS:
      return { ...state, user: action.payload, loading: false, loginSuccess: true, userToken: action.payload.token };
    case LOGIN_FAILURE:
      return { ...state, error: action.payload, loading: false, loginSuccess: false };
    case LOGOUT:
      return { ...state, user: null, userToken: "" };
    case REGISTER_START:
      return {
        ...state,
        loading: true,
        error: null,
        registerSuccess: false,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
        registerSuccess: true,
      };

    case REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        registerSuccess: false,
      };
    default:
      return state;
  }
};

// Корневой редьюсер
export const rootReducer = {
  articles: articlesReducer,
  auth: authReducer,
};
