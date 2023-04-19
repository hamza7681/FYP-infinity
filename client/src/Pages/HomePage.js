import React from "react";
import Home from "../Components/Home";
import Footer from "../Components/Footer/Footer";
import { useSelector } from "react-redux";
import GlobalSearch from "../Components/Home/GlobalSearch";
import MainNavbar from "../Components/Navbar/MainNavbar";

const HomePage = () => {
  const { searching } = useSelector((s) => s.CourseReducer);
  return (
    <>
    <MainNavbar/>
      {searching ? <GlobalSearch /> : <Home />}
      <Footer />
    </>
  );
};

export default HomePage;
