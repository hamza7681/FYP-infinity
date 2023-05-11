import React, { useState } from "react";
import logo from "../../Assets/I.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsCart3, BsJournalPlus, BsSearch } from "react-icons/bs";
import GlobalButton from "../../Reuseables/GlobalButton";
import { FiHeart, FiLogOut } from "react-icons/fi";
import { FaBars, FaRegUserCircle } from "react-icons/fa";
import Sidebar from "./Sidebar";
import { BiChat } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { NavbarAnimate } from "../../Animations";
import { RiShoppingBag3Line } from "react-icons/ri";
import { AiOutlineLogin } from "react-icons/ai";
const MainNavbar = () => {
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const dispatch = useDispatch();
  const { token, user } = useSelector((s) => s.AuthReducer);
  const { cartItems, globalSearch } = useSelector((s) => s.CourseReducer);
  const location = useLocation();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    localStorage.clear();
  };

  return (
    <>
      <motion.div
        variants={NavbarAnimate}
        initial="hidden"
        whileInView="show"
        className="flex flex-row justify-between gap-3 shadow-lg h-[70px] items-center sticky top-0 px-[20px] z-10 bg-white w-full"
      >
        <div className="md:w-1/12">
          <img
            src={logo}
            alt="logo"
            className="h-[55px] relative cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        <div className="w-4/12 md:block hidden justify-center items-center">
          <div className="flex flex-row items-center gap-3 border-[2px] border-gray-500 px-[15px] py-[8px] rounded-full">
            <input
              type="search"
              placeholder="Search for anything"
              className="w-full focus:outline-none"
              value={globalSearch}
              onChange={(e) => {
                dispatch({ type: "GLOBAL_SEARCH", payload: e.target.value });
              }}
            />
            <BsSearch className="text-[22px] cursor-pointer" />
          </div>
        </div>
        <div className="w-7/12 md:flex hidden flex-row justify-around gap-2 items-center">
          <Link
            to="/tutors"
            className={`text-[15px] px-[10px] py-[5px] rounded-[3px]  ${location.pathname === "/tutors"
                ? "bg-[#f5822a] text-white"
                : "hover:text-[#f5822a]"
              }`}
          >
            Tutors
          </Link>
          <Link
            to="/courses"
            className={`text-[15px] px-[10px] py-[5px] rounded-[3px]  ${location.pathname === "/courses"
                ? "bg-[#f5822a] text-white"
                : "hover:text-[#f5822a]"
              }`}
          >
            Courses
          </Link>

          <Link
            to="/about-us"
            className={`text-[15px] px-[10px] py-[5px] rounded-[3px]  ${location.pathname === "/about-us"
                ? "bg-[#f5822a] text-white"
                : "hover:text-[#f5822a]"
              }`}
          >
            About us
          </Link>
          <Link
            to="/contact-us"
            className={`text-[15px] px-[10px] py-[5px] rounded-[3px]  ${location.pathname === "/contact-us"
                ? "bg-[#f5822a] text-white"
                : "hover:text-[#f5822a]"
              }`}
          >
            Contact us
          </Link>
          {user.role === 0 ? (
            <>
              <Link
                to="/cart"
                className={`text-[20px] relative px-[10px] py-[5px] rounded-[3px]  ${location.pathname === "/cart"
                    ? "bg-[#f5822a] text-white"
                    : "hover:text-[#f5822a]"
                  }`}
              >
                <BsCart3 />
                <div
                  className={`absolute top-[-8px] left-[20px] w-[20px] h-[20px] ${location.pathname === "/cart" ? "bg-black" : "bg-[#f5822a]"
                    } flex justify-center items-center rounded-full text-white text-[12px]`}
                >
                  {cartItems.length}
                </div>
              </Link>

              <Link
                to="/wishlist"
                className={`text-[20px] relative px-[8px] py-[5px] rounded-[3px]  ${location.pathname === "/wishlist"
                    ? "bg-[#f5822a] text-white"
                    : "hover:text-[#f5822a]"
                  }`}
              >
                <FiHeart />
              </Link>
            </>
          ) : (
            ""
          )}
          {user.role === 2 ? (
            <Link
              to="/add-course"
              className={`text-[22px] px-[10px] py-[5px] rounded-[3px]  ${location.pathname === "/add-course"
                  ? "bg-[#f5822a] text-white"
                  : "hover:text-[#f5822a]"
                }`}
            >
              <BsJournalPlus />
            </Link>
          ) : (
            ""
          )}
          {token ? (
            <Link to="/chat" className="text-[22px] ">
              <BiChat />
            </Link>
          ) : (
            ""
          )}
          {token ? (
            <div
              className="relative cursor-pointer my-auto"
              style={{ width: "50px", height: "50px" }}
              onClick={() => setDropdown(!dropdown)}
            >
              <img
                src={user && user?.dp}
                className="h-[50px] rounded-full"
                alt="dp"
              />

              <div className="absolute top-0 left-[38px] w-[15px] h-[15px]  bg-[#36b404] flex justify-center items-center rounded-full"></div>
              {dropdown ? (
                <div className="absolute top-[50px] right-[30px] bg-white border-[1px] w-[350px] p-[20px] rounded-[4px] shadow-md">
                  <div className="flex flex-row items-center justify-start gap-2">
                    <img
                      src={user && user?.dp}
                      className="h-[70px] w-[70px] rounded-full"
                      alt="dp"
                    />
                    <div>
                      <h1 className="text-[#f5822a] font-bold tracking-wider text-[22px]">
                        {user.firstName} {user.lastName}
                      </h1>
                      <p className="relative top-[-5px] text-gray-400 text-[12px]">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="border-[1px] my-[20px]"></div>
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/profile"
                      className="p-[8px] text-gray-600 hover:bg-gray-300 rounded-[4px] text-[14px] flex flex-row items-center justify-start gap-3"
                    >
                      <FaRegUserCircle className="text-[22px]" /> My Profile
                    </Link>
                    <Link
                      to="/chat"
                      className="p-[8px] text-gray-600 hover:bg-gray-300 rounded-[4px] text-[14px] flex flex-row items-center justify-start gap-3"
                    >
                      <BiChat className="text-[22px]" />
                      Messenger
                    </Link>
                    {user?.role === 0 ? (
                      <>
                        <Link
                          to="/cart"
                          className="p-[8px] text-gray-600 hover:bg-gray-300 rounded-[4px] text-[14px] flex flex-row items-center justify-start gap-3"
                        >
                          <BsCart3 className="text-[22px]" />
                          My Cart
                        </Link>
                        <Link
                          to="/order"
                          className="p-[8px] text-gray-600 hover:bg-gray-300 rounded-[4px] text-[14px] flex flex-row items-center justify-start gap-3"
                        >
                          <RiShoppingBag3Line className="text-[22px]" />
                          My Orders
                        </Link>
                        <Link
                          to="/wishlist"
                          className="p-[8px] text-gray-600 hover:bg-gray-300 rounded-[4px] text-[14px] flex flex-row items-center justify-start gap-3"
                        >
                          <FiHeart className="text-[22px]" />
                          Wishlist
                        </Link>
                        <Link
                          to="/switch-account"
                          className="p-[8px] text-gray-600 hover:bg-gray-300 rounded-[4px] text-[14px] flex flex-row items-center justify-start gap-3"
                        >
                          <AiOutlineLogin className="text-[22px]" />
                          Switch To Tutor
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/add-course"
                          className="p-[8px] text-gray-600 hover:bg-gray-300 rounded-[4px] text-[14px] flex flex-row items-center justify-start gap-3"
                        >
                          <BsJournalPlus className="text-[22px]" />
                          Add Course
                        </Link>
                        <Link
                          to="/switch-account"
                          className="p-[8px] text-gray-600 hover:bg-gray-300 rounded-[4px] text-[14px] flex flex-row items-center justify-start gap-3"
                        >
                          <AiOutlineLogin className="text-[22px]" />
                          Switch To Student
                        </Link>
                      </>
                    )}
                  </div>
                  <div className="border-[1px] my-[20px]"></div>
                  <div
                    className="flex flex-row gap-3 items-center p-[8px] text-gray-600"
                    onClick={logout}
                  >
                    <FiLogOut />
                    <span>Logout</span>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            <>
              <div className="flex flex-row gap-2">
                <GlobalButton
                  title="Login"
                  styleClass="bg-white border-[2px] border-black py-[10px] px-[30px] font-semibold"
                  click={() => navigate("/login")}
                />
                <GlobalButton
                  title="Sign Up"
                  styleClass="bg-black text-white border-[2px] border-black py-[10px] px-[30px] font-semibold"
                  click={() => navigate("/register")}
                />
              </div>
            </>
          )}
        </div>
        <div className="md:hidden block">
          <FaBars
            className="relative right-[10px] text-[22px] text-[#f5822a]"
            onClick={() => setShowSidebar(true)}
          />
        </div>
        {showSidebar ? <Sidebar setShowSidebar={setShowSidebar} /> : ""}
      </motion.div>
    </>
  );
};

export default MainNavbar;
