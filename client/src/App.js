import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ChatPage from "./Pages/ChatPage";
import AllCoursesPage from "./Pages/AllCoursesPage";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
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
import OrderPage from "./Pages/OrderPage";
import ViewCoursePage from "./Pages/ViewCoursePage";
import WishListPage from "./Pages/WishListPage";
import SwitchAccountPage from "./Pages/SwitchAccountPage";
import EditCoursePage from "./Pages/EditCoursePage";
import AboutPage from "./Pages/AboutPage";
import ContactPage from "./Pages/ContactPage";
import ViewTutorPage from "./Pages/ViewTutorPage";
import GlobalLoader from "./Reuseables/GlobalLoader";


function App() {
  const { token } = useSelector((s) => s.AuthReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setLoading(true);
      const getUser = async () => {
        try {
          const res = await http.get("/auth/get-profile", {
            headers: { Authorization: token },
          });
          dispatch({ type: "GET_USER", payload: res.data.user });
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      };
      getUser();
    }
  }, [token, dispatch]);

  return (
    <>
      <ToastContainer />
      {loading && <GlobalLoader />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/tutors" element={<TutorPage />} />
        <Route path="/courses" element={<AllCoursesPage />} />
        <Route path="/course/:id" element={<ViewCoursePage />} />
        <Route path="/tutor/:id" element={<ViewTutorPage />} />

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
          <Route path="/edit-course/:id" element={<EditCoursePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/wishlist" element={<WishListPage />} />
          <Route path="/switchaccount" element={<SwitchAccountPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
