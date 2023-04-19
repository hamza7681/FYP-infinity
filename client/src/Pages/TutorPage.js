import React from "react";
import Tutors from "../Components/Tutors";
import Footer from "../Components/Footer/Footer";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsExclamationTriangle } from "react-icons/bs";
import MainNavbar from "../Components/Navbar/MainNavbar";

const TutorPage = () => {
  const { user } = useSelector((s) => s.AuthReducer);

  return (
    <>
      <MainNavbar />
      {user.role === 0 ? (
        <Tutors />
      ) : (
        <>
          <div className="flex h-[70vh] justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <BsExclamationTriangle className="text-gray-400 text-[62px]" />
              <p className="text-gray-400 text-[42px]">
                Only Students can access this page!
              </p>
              <Link to="/" className="text-purple-500 font-semibold underline">
                Back to Home
              </Link>
            </div>
          </div>
        </>
      )}

      <Footer />
    </>
  );
};

export default TutorPage;
