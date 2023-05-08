import React from "react";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import { FaEnvelope, FaMapMarked, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../Assets/whilte.png";
import { motion } from "framer-motion";
import { LocationAnimate } from "../../Animations";
import { useSelector } from "react-redux";

const Footer = () => {
  const { token } = useSelector((s) => s.AuthReducer);
  return (
    <>
      <div className="bottom-0 bg-gradient-to-r from-[#03043b] to-[#35050c] text-white flex flex-col md:w-full border-bl-2 pt-[50px] mt-[30px] gap-2">
        <div className=" px-[30px] py-[35px]">
          <div className="flex flex-col md:flex-row w-full py-[10px] justify-between  gap-3">
            <div className="md:w-1/3">
              <h2 className="text-[20px] font-bold py-[5px]">Infinity</h2>
              <p className="py-[5px] text-gray-200 text-[14px] text-justify">
                Infinity is a website which will make students to enhance their
                skills. Our vision is to provide education irrespective of
                boundries. Our vision is to provide an accessible, flexible, and
                high-quality education to students of all ages and backgrounds,
                regardless of their location or schedule. Our goal is to provide
                wider range of courses at one platform.
              </p>
            </div>

            <div className="w-full flex flex-col md:justify-center md:items-center md:w-1/3">
              <h2 className="text-[20px] font-bold py-[5px] ">Quick Links</h2>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col py-[5px]">
                  <Link
                    to="/"
                    className="text-gray-200 text-[14px] hover:underline"
                  >
                    Home
                  </Link>
                  <Link
                    to="/about-us"
                    className="text-gray-200 text-[14px] hover:underline"
                  >
                    About Us
                  </Link>
                  <Link
                    to="/courses"
                    className="text-gray-200 text-[14px] hover:underline"
                  >
                    Courses
                  </Link>
                  <Link
                    to="/tutors"
                    className="text-gray-200 text-[14px] hover:underline"
                  >
                    Tutors
                  </Link>
                  {token ? (
                    <Link
                      to="/chat"
                      className="text-gray-200 text-[14px] hover:underline"
                    >
                      Messenger
                    </Link>
                  ) : (
                    ""
                  )}
                  <Link
                    to="/contact-us"
                    className="text-gray-200 text-[14px] hover:underline"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>

            <motion.div
              variants={LocationAnimate}
              initial="hidden"
              whileInView="show"
              className="w-full flex flex-col gap-2 md:w-1/3"
            >
              <h2 className="text-[20px] font-bold py-[5px]">Location</h2>
              <div className="flex flex-row items-center gap-3">
                <FaMapMarked className="text-[20px]" />
                <p className="text-[14px]">
                  University of Agriculture, Faisalabad, Pakistan
                </p>
              </div>
              <div className="flex flex-row items-center gap-3">
                <FaEnvelope className="text-[20px]" />
                <p className="text-[14px]">infinity.institude010@gmail.com</p>
              </div>
              <div className="flex flex-row items-center gap-3">
                <FaPhone className="text-[20px]" />
                <p className="text-[14px]">+92 311 7110211</p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center pt-[30px] pb-[30px] border-t-[1px] mt-[10px] px-[30px]">
          <div>
            <img src={logo} className="w-[70px]" alt="logo" />
          </div>
          <div className="flex flex-row items-center gap-1">
            <AiOutlineCopyrightCircle className="text-[20px] ml-[2px]" />
            <p>Infinity 2023, Inc</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
