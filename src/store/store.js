import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";

export const store = configureStore({
  reducer: rootReducer,
  // Автоматически подключает thunk, devTools и другие middleware
});

export default store;
