import React from "react";
import { useSelector } from "react-redux";
import { introArray } from "../../helpers/introArray";
import Cards from "./Cards";

const Intro = () => {
  const { appBackground } = useSelector((s) => s.ThemeReducer);
  return (
    <>
      <div className="pt-[50px] w-full">
        <h1
          className={`${
            appBackground === "#ffffff" ? "text-black" : "text-white"
          } text-[22px] font-semibold my-[20px]`}
        >
          Welcome back, Admin!
        </h1>
        <p
          className={`${
            appBackground === "#ffffff" ? "text-black" : "text-gray-400"
          } my-[15px]`}
        >
          Yesterday I was clever, so I wanted to change the world. Today I am
          wise, so I am changing myself.
        </p>
        <div className="flex flex-row w-full justify-start gap-4 flex-wrap">
          {introArray.map((val) => {
            return (
              <>
                <Cards data={val} newData={val.data}/>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Intro;
