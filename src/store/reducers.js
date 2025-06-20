import {
  FETCH_ARTICLES_START,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_FAILURE,
  FETCH_ARTICLE_REQUEST,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  CREATE_ARTICLE_START,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_FAILURE,
  UPDATE_ARTICLE_START,
  UPDATE_ARTICLE_SUCCESS,
  UPDATE_ARTICLE_FAILURE,
  DELETE_ARTICLE_SUCCESS,
  FAVORITE_ARTICLE,
  UNFAVORITE_ARTICLE,
} from "./actions";

const initialArticlesState = {
  items: [],
  articlesCount: 0,
  loading: false,
  error: null,
};

const initialArticleState = {
  data: null,
  loading: false,
  error: null,
};

const initialState = {
  loading: false,
  error: null,
  currentArticle: null,
};

export const articlesReducer = (state = initialArticlesState, action) => {
  switch (action.type) {
    case FETCH_ARTICLES_START:
      return { ...state, loading: true, error: null };
    case FETCH_ARTICLES_SUCCESS:
      return { ...state, items: action.payload.articles, articlesCount: action.payload.articlesCount, loading: false };
    case FETCH_ARTICLES_FAILURE:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const newArticlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ARTICLE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        currentArticle: action.payload,
        error: null,
      };
    case CREATE_ARTICLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_ARTICLE_SUCCESS:
      return {
        ...state,
        currentArticle: null,
      };
    case UPDATE_ARTICLE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        currentArticle: action.payload,
        error: null,
      };
    case UPDATE_ARTICLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FAVORITE_ARTICLE:
    case UNFAVORITE_ARTICLE:
      if (state.currentArticle && state.currentArticle.slug === action.payload.slug) {
        return {
          ...state,
          currentArticle: action.payload.article,
        };
      }
      if (state.items) {
        return {
          ...state,
          items: state.items.map((article) =>
            article.slug === action.payload.slug ? action.payload.article : article
          ),
          currentArticle:
            state.currentArticle?.slug === action.payload.slug ? action.payload.article : state.currentArticle,
        };
      }
      return state;
    default:
      return state;
  }
};

export const articleReducer = (state = initialArticleState, action) => {
  switch (action.type) {
    case FETCH_ARTICLE_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ARTICLE_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case FETCH_ARTICLE_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case FAVORITE_ARTICLE:
    case UNFAVORITE_ARTICLE:
      if (state.data && state.data.slug === action.payload.slug) {
        return {
          ...state,
          data: action.payload.article,
        };
      }
      return state;
    default:
      return state;
  }
};

const initialAuthState = {
  user: null,
  loading: false,
  error: null,
  registerSuccess: false,
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
    case "UPDATE_PROFILE_SUCCESS":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

const initialProfileState = {
  loading: false,
  error: null,
};

export const profileReducer = (state = initialProfileState, action) => {
  switch (action.type) {
    case "UPDATE_PROFILE_START":
      return { ...state, loading: true, error: null };
    case "UPDATE_PROFILE_SUCCESS":
      return { ...state, loading: false, error: null };
    case "UPDATE_PROFILE_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// Корневой редьюсер
export const rootReducer = {
  articles: articlesReducer,
  auth: authReducer,
  article: articleReducer,
  profile: profileReducer,
  newArticles: newArticlesReducer,
};
