import React, { useEffect } from "react";
import Courses from "./Courses";
import Vision from "./Vision";
import Features from "./Features";
import { useDispatch, useSelector } from "react-redux";
import { http } from "../../Axios/config";
import Slider from "./Slider";
import { motion, useScroll } from "framer-motion";
import HeaderCarousel from "./HeaderCarousel";
import Stats from "./Stats";

const Home = () => {
  const { token } = useSelector((s) => s.AuthReducer);
  const dispatch = useDispatch();
  const { scrollYProgress } = useScroll();
  useEffect(() => {
    const getCourses = async () => {
      try {
        const res = await http.get(
          "https://infinity-server.herokuapp.com/course/get-course"
        );
        dispatch({ type: "GET_COURSES", payload: res.data });
      } catch (error) {
        console.log(error);
      }
    };
    const getWishList = async () => {
      try {
        const res = await http.get(
          "https://infinity-server.herokuapp.com/wishlist/get-wishlist-userId",
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
        <motion.div
          className="md:block hidden bg-[#03043B] z-10 fixed top-[70px] right-0 left-0 h-[10px] transform origin-[0%]"
          style={{ scaleX: scrollYProgress }}
        ></motion.div>
        <HeaderCarousel />
        <Vision />
        <Stats />
        <Courses />
        <Features />
        <Slider />
      </div>
    </>
  );
};

export default Home;
