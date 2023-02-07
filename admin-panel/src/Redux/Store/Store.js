import { configureStore } from "@reduxjs/toolkit";
import ThemeReducer from "../Reducers/ThemeReducer";

const store = configureStore({
  reducer: {
    ThemeReducer,
  },
});

export default store;
