import React from "react";
import { BiCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

const BreadCrumbs = ({ parent, parentPath, active, image, pageName }) => {
  return (
    <>
      <div className=" md:h-[400px] h-[300px] md:overflow-hidden relative">
        <img src={image} alt="images" className=" w-full md:h-auto h-[300px]" />
        <div className="absolute top-0 w-full bg-gradient-to-r from-[#03043b] to-[#35050c] opacity-80 flex items-center justify-center md:h-[400px] h-[300px] ">
          <div className="text-white flex flex-col justify-center items-center gap-4">
            <h1 className="text-[24px] capitalize font-semibold">{pageName}</h1>
            <div className="flex flex-row gap-2 items-center">
              <Link className="text-orange-500" to={parentPath}>
                {parent}
              </Link>
              <BiCircle className="text-[9px]" /> {active}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BreadCrumbs;
