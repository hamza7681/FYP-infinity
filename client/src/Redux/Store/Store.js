import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../Reducers/AuthReducer";
import ChatReducer from "../Reducers/ChatReducer";

const store = configureStore({
  reducer: { AuthReducer, ChatReducer },
});

export default store;
