import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ChatPage from "./Pages/ChatPage";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import CartPage from "./Pages/CartPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ForgotPage from "./Pages/ForgotPage";
import ResetPage from "./Pages/ResetPage";
import PrivateRoutes from "./Routes/PrivateRoutes";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
import { useDispatch, useSelector } from "react-redux";
import { http } from "./Axios/config";
import AddCoursePage from "./Pages/AddCoursePage";
import TutorPage from "./Pages/TutorPage";

function App() {
  const { token } = useSelector((s) => s.AuthReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await http.get("/auth/get-profile", {
            headers: { Authorization: token },
          });
          dispatch({ type: "GET_USER", payload: res.data.user });
        } catch (error) {
          console.log(error);
        }
      };
      getUser();
    }
  }, [token, dispatch]);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot" element={<ForgotPage />} />
          <Route path="/reset/:token" element={<ResetPage />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/add-course" element={<AddCoursePage />} />
          <Route path="/tutors" element={<TutorPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
