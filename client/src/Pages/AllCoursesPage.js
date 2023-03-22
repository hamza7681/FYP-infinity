import React from "react";
import AllCourses from "../Components/Courses/AllCourses";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer/Footer";

const AllCoursesPage = () => {
  return (
    <div>
      <Navbar />
      <AllCourses />
      <Footer />
    </div>
  );
};

export default AllCoursesPage;
