import React, { useEffect } from "react";
import Courses from "./Courses";
import Vision from "./Vision";
import Features from "./Features";
import { useSelector, useDispatch } from "react-redux";
import { http } from "../../Axios/config";

const Home = () => {
  const { token } = useSelector((s) => s.AuthReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      const getCourses = async () => {
        try {
          const res = await http.get("http://localhost:5000/course/get-course");
          dispatch({ type: "GET_COURSES", payload: res.data });
        } catch (error) {
          console.log(error);
        }
      };
      getCourses();
    }
  }, [token, dispatch]);
  return (
    <>
      <div>
        <Vision />
        <Courses />
        <Features />
      </div>
    </>
  );
};

export default Home;
