import React from 'react'
import Navbar from "../Components/Navbar";
import { useSelector } from "react-redux";
import { BsExclamationTriangle } from "react-icons/bs";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import EditCourse from '../Components/Courses/EditCourse';
const EditCoursePage = () => {
    const { user } = useSelector((s) => s.AuthReducer);
    return (
      <>
        <Navbar />
        {user.role === 2 ? (
          <EditCourse />
        ) : (
          <>
            <div className="flex h-[70vh] justify-center items-center">
              <div className="flex flex-col justify-center items-center">
                <BsExclamationTriangle className="text-gray-400 text-[62px]" />
                <p className="text-gray-400 text-[42px]">
                  Only Tutors can access this page!
                </p>
                <Link to="/" className="text-purple-500 font-semibold underline">
                  Back to Home
                </Link>
              </div>
            </div>
          </>
        )}
        <Footer/>
      </>
    );
}

export default EditCoursePage