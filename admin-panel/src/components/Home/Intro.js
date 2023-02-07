import React from "react";
import { useSelector } from "react-redux";

const Intro = () => {
  const { appBackground } = useSelector((s) => s.ThemeReducer);
  return (
    <>
      <div className="pt-[50px]">
        <h1
          className={`${
            appBackground === "#ffffff" ? "text-black" : "text-white"
          } text-[22px] font-semibold`}
        >
          Welcome back, Admin!
        </h1>
        <p className={`${
            appBackground === "#ffffff" ? "text-black" : "text-gray-400"
          }`}>
          Yesterday I was clever, so I wanted to change the world. Today I am
          wise, so I am changing myself.
        </p>
      </div>
    </>
  );
};

export default Intro;
