import React from "react";
import { FaRegUserCircle, FaTimes } from "react-icons/fa";
import { FiHeart, FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/I.png";
import { useDispatch, useSelector } from "react-redux";
import {
  BsCart3,
  BsChatLeftText,
  BsJournalPlus,
  BsPeople,
  BsTelephone,
} from "react-icons/bs";
import { RiShoppingBag3Line } from "react-icons/ri";
import { BiBookBookmark, BiChat } from "react-icons/bi";
import GlobalButton from "../../Reuseables/GlobalButton";
import { AiOutlineLogin } from "react-icons/ai";

const Sidebar = ({ setShowSidebar }) => {
  const { token, user } = useSelector((s) => s.AuthReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    localStorage.clear();
  };
  return (
    <>
      <div className="md:hidden block bg-white border-[1px] w-[350px] p-[20px] shadow-md absolute top-0 h-screen z-50 left-[-10px]">
        <div className=" flex flex-row justify-between items-center py-[20px]">
          <img
            src={logo}
            alt="logo"
            className="h-[70px] relative top-[-30px]"
          />
          <FaTimes
            className="text-[#f5822a] relative top-[-30px]"
            onClick={() => setShowSidebar(false)}
          />
        </div>
        {token ? (
          <>
            <div className="flex flex-row items-center justify-start gap-2">
              <img
                src={user && user?.dp}
                className="h-[70px] rounded-full"
                alt="dp"
              />
              <div>
                <h1 className="text-[#f5822a] font-bold tracking-wider text-[22px]">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="relative top-[-5px] text-gray-400 text-[14px]">
                  {user.email}
                </p>
              </div>
            </div>
          </>
        ) : (
          <p className="text-[22px] font-semibold">Welcome to Infinity</p>
        )}

        <div className="border-[1px] my-[20px]"></div>
        <div className="flex flex-col gap-2">
          {token ? (
            <>
              <Link
                to="/profile"
                className="p-[8px] text-gray-600 hover:bg-gray-300 rounded-[4px] text-[14px] flex flex-row items-center justify-start gap-3"
              >
                <FaRegUserCircle className="text-[22px]" />
                My Profile
              </Link>
              <Link
                to="/chat"
                className="p-[8px] text-gray-600 hover:bg-gray-300 rounded-[4px] text-[14px] flex flex-row items-center justify-start gap-3"
              >
                <BiChat className="text-[22px]" /> Messenger
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
                    to="/switchaccount"
                    className="p-[8px] text-gray-600 hover:bg-gray-300 rounded-[4px] text-[14px] flex flex-row items-center justify-start gap-3"
                  >
                    <AiOutlineLogin className="text-[22px]" />
                    Login as Tutor
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
                    to="/switchaccount"
                    className="p-[8px] text-gray-600 hover:bg-gray-300 rounded-[4px] text-[14px] flex flex-row items-center justify-start gap-3"
                  >
                    <AiOutlineLogin className="text-[22px]" />
                    Login as Student
                  </Link>
                </>
              )}
            </>
          ) : (
            <>
              <Link
                to="/tutors"
                className="p-[8px] text-gray-600 hover:bg-gray-300 rounded-[4px] text-[14px] flex flex-row items-center justify-start gap-3"
              >
                <BsPeople className="text-[22px]" />
                Tutors
              </Link>
              <Link
                to="/courses"
                className="p-[8px] text-gray-600 hover:bg-gray-300 rounded-[4px] text-[14px] flex flex-row items-center justify-start gap-3"
              >
                <BiBookBookmark className="text-[22px]" />
                Courses
              </Link>
            </>
          )}

          <Link
            to="/about-us"
            className="p-[8px] text-gray-600 hover:bg-gray-300 rounded-[4px] text-[14px] flex flex-row items-center justify-start gap-3"
          >
            <BsChatLeftText className="text-[22px]" />
            About us
          </Link>
          <Link
            to="/contact-us"
            className="p-[8px] text-gray-600 hover:bg-gray-300 rounded-[4px] text-[14px] flex flex-row items-center justify-start gap-3"
          >
            <BsTelephone className="text-[22px]" />
            Contact us
          </Link>
        </div>
        <div className="border-[1px] my-[20px]"></div>
        {token ? (
          <div
            className="flex flex-row gap-3 items-center p-[8px] text-gray-600"
            onClick={logout}
          >
            <FiLogOut />
            <span>Logout</span>
          </div>
        ) : (
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
        )}
      </div>
    </>
  );
};

export default Sidebar;
