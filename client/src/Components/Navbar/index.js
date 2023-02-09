import React, { useState } from "react";
import logo from "../../Assets/I.png";
import { Link, useNavigate } from "react-router-dom";
import { BsCart3, BsSearch } from "react-icons/bs";
import GlobalButton from "../../Reuseables/GlobalButton";
import { FiHeart, FiLogOut } from "react-icons/fi";
import { FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar";
import { BiChat } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const [showDiv, setShowDiv] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Categories = [
    "Mobile Developement",
    "Website Developmenet",
    "Game Development",
    "Graphics Designing",
  ];
  const { token, user } = useSelector((s) => s.AuthReducer);
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
  };
  return (
    <>
      <div className="flex flex-row justify-between shadow-lg h-[80px] items-center relative px-[10px]">
        <div>
          <img src={logo} alt="logo" className="h-[70px] relative" />
        </div>
        <div className="cursor-pointer md:block hidden">
          <span
            className="text-[15px] hover:text-[#f5822a]"
            onClick={() => setShowDiv(!showDiv)}
          >
            Categories
          </span>
          {showDiv ? (
            <div className="absolute top-[60px] left-[160px] flex flex-col bg-white border-[1px] rounded-[4px]">
              {Categories.map((val, index) => {
                return (
                  <>
                    <Link
                      to="/"
                      className="px-[10px] py-[15px] hover:bg-gray-300"
                      onClick={() => setShowDiv(false)}
                    >
                      {val}
                    </Link>
                  </>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="w-[600px] md:block hidden ">
          <div className="flex flex-row items-center gap-3 border-[2px] border-gray-500 px-[15px] py-[15px] rounded-full">
            <BsSearch className="text-[22px]" />
            <input
              type="text"
              placeholder="Search for anything"
              className="w-full focus:outline-none"
            />
          </div>
        </div>
        <div className=" flex-row gap-3 md:flex hidden">
          {token ? (
            <>
              <Link to="/" className="text-[15px] hover:text-[#f5822a]">
                Tutors
              </Link>
              <Link to="/" className="text-[15px] hover:text-[#f5822a]">
                My Learning
              </Link>
            </>
          ) : (
            <Link to="/" className="text-[15px] hover:text-[#f5822a]">
              Teach on Infinity
            </Link>
          )}
        </div>
        <div className=" flex-row gap-6 md:flex hidden">
          <Link to="/cart" className="text-[20px] relative ">
            <BsCart3 />
            <div className="absolute top-[-10px] left-[10px] w-[20px] h-[20px] bg-[#f5822a] flex justify-center items-center rounded-full text-white text-[12px]">
              1
            </div>
          </Link>
          {token ? (
            <>
              <Link to="/" className="text-[20px] ">
                <FiHeart />
              </Link>
              <Link to="/chat" className="text-[22px] ">
                <BiChat />
              </Link>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="md:block hidden">
          {token ? (
            <>
              <div
                className="relative cursor-pointer"
                onClick={() => setDropdown(!dropdown)}
              >
                <img
                  src="https://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.jpg?s=612x612&w=0&k=20&c=AhqW2ssX8EeI2IYFm6-ASQ7rfeBWfrFFV4E87SaFhJE="
                  className="h-[50px] rounded-full"
                  alt="dp"
                />
                <div className="absolute top-0 left-[38px] w-[15px] h-[15px] bg-[#36b404] flex justify-center items-center rounded-full"></div>
                {dropdown ? (
                  <div className="absolute top-[50px] right-[30px] bg-white border-[1px] w-[300px] p-[20px] rounded-[4px] shadow-md">
                    <div className="flex flex-row items-center justify-start gap-2">
                      <img
                        src={user.dp}
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
                    <div className="border-[1px] my-[20px]"></div>
                    <div className="flex flex-col gap-2">
                      <Link
                        to="/"
                        className="p-[8px] hover:bg-gray-300 rounded-[4px]"
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/chat"
                        className="p-[8px] hover:bg-gray-300 rounded-[4px]"
                      >
                        Messenger
                      </Link>
                      <Link
                        to="/"
                        className="p-[8px] hover:bg-gray-300 rounded-[4px]"
                      >
                        Cart
                      </Link>
                      <Link
                        to="/"
                        className="p-[8px] hover:bg-gray-300 rounded-[4px]"
                      >
                        Wishlist
                      </Link>
                    </div>
                    <div className="border-[1px] my-[20px]"></div>
                    <div
                      className="flex flex-row gap-3 items-center p-[8px]"
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
            </>
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
        {token ? <div></div> : ""}
        <div className="md:hidden block">
          <FaBars
            className="relative right-[10px] text-[22px] text-[#f5822a]"
            onClick={() => setShowSidebar(true)}
          />
        </div>
      </div>
      {/* sidebar  */}
      {showSidebar ? <Sidebar setShowSidebar={setShowSidebar} /> : ""}
    </>
  );
};

export default Navbar;
