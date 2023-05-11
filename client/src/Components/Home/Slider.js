import React from "react";
import logo from "../../Assets/book.png";
import float1 from "../../Assets/float1.png";
import float2 from "../../Assets/float2.png";
import float3 from "../../Assets/float3.png";
import float4 from "../../Assets/float4.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { picAnimate } from "../../Animations";

const Slider = () => {
  return (
    <div className="w-full flex flex-col md:flex-row items-center gap-3 md:gap-0 py-[50px] md:py-[70px] px-[15px] md:px-[30px]">
      <div className="relative md:w-1/2 w-full flex flex-col p-[10px] gap-6">
        <img
          src={float1}
          alt="floating"
          className="absolute top-[120px] left-[50px] z-[-1] md:top-[160px] md:left-[140px] w-[70px] icon"
        />
        <img
          src={float2}
          alt="floating"
          className="absolute top-[250px] z-[-1] left-[230px] md:top-[130px] md:left-[600px] w-[70px] icon2"
        />
        <img
          src={float3}
          alt="floating"
          className="absolute bottom-[250px] md:block hidden left-[340px] w-[70px] z-[-1] icon3"
        />

        <p className="text-[15px] text-justify">
          <span className="text-[22px] font-bold">"</span>You might not think
          that programmers are artists, but programming is an extremely creative
          profession. It's logic-based creativity. Most good programmers do
          programming not because they expect to get paid or get adulation by
          the public, but because it is fun to program.
          <span className="text-[22px] font-bold">"</span>
        </p>
        <p className="text-[16px] font-semibold text-right">
          -- John Romero & Ellen Ullman
        </p>
        <motion.div variants={picAnimate} initial="hidden" whileInView="show">
          <Link
            to="/contact-us"
            className="bg-[#2A2F5B] w-fit text-white px-[10px] py-[13px] rounded-[3px]"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
      <div className="md:w-1/2 relative w-full flex justify-center items-center p-[10px]">
        <div className="absolute w-[300px] md:block hidden h-[400px]">
          <img
            src={float4}
            alt="floating"
            className="absolute w-[70px] icon4 top-0 left-0"
          />
        </div>
        <img src={logo} alt="intro img" className="w-[400px]" />
      </div>
    </div>
  );
};

export default Slider;
