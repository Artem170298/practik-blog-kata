import {
  FETCH_ARTICLES_START,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
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
};

export const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, user: action.payload, loading: false };
    case LOGIN_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
};

// Корневой редьюсер
export const rootReducer = {
  articles: articlesReducer,
  auth: authReducer,
};
