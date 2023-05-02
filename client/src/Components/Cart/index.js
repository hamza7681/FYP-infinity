import React from "react";
import Courses from "./Courses";
import Payment from "./Payment";
import BreadCrumbs from "../../Reuseables/BreadCrumbs";
import logo from "../../Assets/cart.jpg";

const index = () => {
  return (
    <>
      <BreadCrumbs
        parent="Home"
        parentPath="/"
        active="Cart"
        image={logo}
        pageName="Your Courses Cart"
      />
      <div className="w-full  flex flex-col md:flex-row ">
        <div className="md:w-[70%]">
          <Courses />
        </div>
        <div className="md:w-[30%] h-auto">
          <Payment />
        </div>
      </div>
    </>
  );
};

export default index;
