import React from "react";
import AllCourses from "../Components/Courses/AllCourses";
import Footer from "../Components/Footer/Footer";
import MainNavbar from "../Components/Navbar/MainNavbar";

const AllCoursesPage = () => {
  return (
    <div>
      <MainNavbar />
      <AllCourses />
      <Footer />
    </div>
  );
};

export default AllCoursesPage;
