import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../Reducers/AuthReducer";
import ChatReducer from "../Reducers/ChatReducer";
import CourseReducer from "../Reducers/CourseReducer";
const store = configureStore({
  reducer: { AuthReducer, ChatReducer, CourseReducer },
});

export default store;
