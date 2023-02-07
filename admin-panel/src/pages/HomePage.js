import React from "react";
import Intro from "../components/Home/Intro";
import Stats from "../components/Home/Stats";

const HomePage = () => {
  return (
    <>
      <div className=" w-full pl-[60px]">
        <Intro />
        <Stats />
      </div>
    </>
  );
};

export default HomePage;
