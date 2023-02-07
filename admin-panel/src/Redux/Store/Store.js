import { configureStore } from "@reduxjs/toolkit";
import ThemeReducer from "../Reducers/ThemeReducer";
import AuthReducer from "../Reducers/AuthReducer";

const store = configureStore({
  reducer: {
    ThemeReducer,
    AuthReducer,
  },
});

export default store;
