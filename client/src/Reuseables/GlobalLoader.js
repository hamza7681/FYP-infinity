import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import logo from "../Assets/whilte.png";

const GlobalLoader = () => {
  return (
    <div
      className="h-screen fixed flex justify-center items-center bg-black opacity-100 w-full"
      style={{ zIndex: 12 }}
    >
      <div className="flex flex-col gap-3 justify-center items-center">
        <img src={logo} alt="logo" className="w-[80px]" />
        <PropagateLoader color="#ffffff" />
      </div>
    </div>
  );
};

export default GlobalLoader;
