import React, { useEffect } from "react";
import Courses from "./Courses";
import Vision from "./Vision";
import Features from "./Features";
import { useDispatch, useSelector } from "react-redux";
import { http } from "../../Axios/config";
import Slider from "./Slider";

const Home = () => {
  const { token } = useSelector((s) => s.AuthReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    const getCourses = async () => {
      try {
        const res = await http.get("http://localhost:5000/course/get-course");
        dispatch({ type: "GET_COURSES", payload: res.data });
      } catch (error) {
        console.log(error);
      }
    };
    const getWishList = async () => {
      try {
        const res = await http.get(
          "http://localhost:5000/wishlist/get-wishlist-userId",
          { headers: { Authorization: token } }
        );
        dispatch({ type: "WISHLIST", payload: res.data });
      } catch (error) {
        console.log(error);
      }
    };
    getCourses();
    getWishList();
  }, [token, dispatch]);
  return (
    <>
      <div>
        <Slider />
        <Vision />
        <Courses />
        <Features />
      </div>
    </>
  );
};

export default Home;
