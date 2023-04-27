import React from "react";
import pic from "../../Assets/onlinelearning.jpg";
import GlobalButton from "../../Reuseables/GlobalButton";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { picAnimate } from "../../Animations";

const Vision = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex lg:flex-row md:flex-col px-[20px] md:px-16 w-auto gap-x-40">
        <div className="lg:w-2/4 md:w-2/4 w-full ">
          <h2 className="text-[25px] font-bold mt-20">Our Vision</h2>
          <p className="w-full py-[5px] text-[20px] mt-3 text-justify">
            Our vision is to provide education irrespective of boundries. Our 
            vision is to provide an accessible, flexible, and high-quality
            education to students of all ages and backgrounds, regardless of
            their location or schedule. Our goal is to provide wider range of
            courses at one platform.
          </p>
          <motion.div variants={picAnimate} initial="hidden" whileInView="show">
            <GlobalButton
              title="About us"
              styleClass="bg-white border-[2px] cursor-pointer hover:bg-black hover:text-white border-black py-[10px] px-[30px] font-semibold mt-7"
              click={() => navigate("/about-us")}
            />
          </motion.div>
        </div>
        <div className="lg:w-2/4  md:w-2/4 hidden lg:block md:block">
          <img src={pic} alt="pic" className="rounded-lg" />
        </div>
      </div>
    </>
  );
};

export default Vision;
