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
      <div className="flex lg:flex-row flex-col py-[50px] md:py-[180px] px-[20px] md:px-16 w-auto gap-x-40 lg:gap-x-60">
        <div className="lg:w-2/4 md:w-2/4 w-full ">
          <h2 className="text-[25px] font-bold mt-10">Welcome to Infinity</h2>
          <p className="w-full py-[5px] text-[15px] mt-1 text-justify">
            Our vision is to provide education irrespective of boundries. Our
            vision is to provide an accessible, flexible, and high-quality
            education to students of all ages and backgrounds, regardless of
            their location or schedule.<br /> Our goal is to provide wider range of
            courses at one platform.Through our platform, students can discover and
            enroll in courses that align with their passions and career aspirations.
            Whether it's acquiring new skills, enhancing existing knowledge, or exploring
            new areas of study, we are dedicated to providing a comprehensive learning experience.
          </p>
          <motion.div variants={picAnimate} initial="hidden" whileInView="show">
            <GlobalButton
              title="About us"
              styleClass="bg-white border-[2px] cursor-pointer hover:bg-black hover:text-white border-black px-[10px] py-[8px] font-semibold mt-7"
              click={() => navigate("/about-us")}
            />
          </motion.div>
        </div>
        <div className="lg:w-2/4  md:w-2/4 hidden lg:block md:block ">
          <div className="clip_pic overflow-hidden w-[400px] h-[400px] border-[1px] ">
            <img
              src={pic}
              alt="pic"
              className="relative top-[60px] scale-[1.6] left-[30px] w-full h-full float-left"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Vision;
