import React from "react";
import ViewCourse from "../Components/Courses/ViewCourse";
import Footer from "../Components/Footer/Footer";
import MainNavbar from "../Components/Navbar/MainNavbar";

const ViewCoursePage = () => {
  return (
    <>
      <MainNavbar />
      <ViewCourse />
      <Footer />
    </>
  );
};

export default ViewCoursePage;
