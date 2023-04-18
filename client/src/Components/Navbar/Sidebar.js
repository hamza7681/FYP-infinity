import React from "react";
import { FaTimes } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../../Assets/I.png";

const Sidebar = ({ setShowSidebar }) => {
  return (
    <>
      <div className="md:hidden block bg-white border-[1px] w-[350px] p-[20px] shadow-md absolute top-0 h-screen z-11 left-[-10px]">
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
        <div className="flex flex-row items-center justify-start gap-2">
          <img
            src="https://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.jpg?s=612x612&w=0&k=20&c=AhqW2ssX8EeI2IYFm6-ASQ7rfeBWfrFFV4E87SaFhJE="
            className="h-[70px] rounded-full"
            alt="dp"
          />
          <div>
            <h1 className="text-[#f5822a] font-bold tracking-wider text-[22px]">
              Hamza Siddique
            </h1>
            <p className="relative top-[-5px] text-gray-400 text-[14px]">
              hamzambf@gmail.com
            </p>
          </div>
        </div>
        <div className="border-[1px] my-[20px]"></div>
        <div className="flex flex-col gap-2">
          <Link to="/profile" className="p-[8px] hover:bg-gray-300 rounded-[4px]">
            My Profile
          </Link>
          <Link to="/chat" className="p-[8px] hover:bg-gray-300 rounded-[4px]">
            Messenger
          </Link>
          <Link to="/cart" className="p-[8px] hover:bg-gray-300 rounded-[4px]">
            Cart
          </Link>
          <Link to="/wishlist" className="p-[8px] hover:bg-gray-300 rounded-[4px]">
            Wishlist
          </Link>
          <Link to="/about_us" className="p-[8px] hover:bg-gray-300 rounded-[4px]">
            About us
          </Link>
          <Link to="/contact_us" className="p-[8px] hover:bg-gray-300 rounded-[4px]">
            Contact us
          </Link>
        </div>
        <div className="border-[1px] my-[20px]"></div>
        <div className="flex flex-row gap-3 items-center p-[8px]">
          <FiLogOut />
          <span>Logout</span>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
