<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import pic1 from "../../Assets/e learning.jpg";
import pic2 from "../../Assets/imaage.png";
import pic3 from "../../Assets/carousel.png";
import { isMobile } from 'react-device-detect';
import pic4 from "../../Assets/caarousel.png"
const carouselItems = [
  {
    image: pic1,
    // text: "First Carousel Item",
  },
  {
    image: pic3,
    // text: "Third Carousel Item",
  },
];

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const mainDivStyle = {
    backgroundImage: `url(${pic2})`,
    height: "85vh", 
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    position: "relative",
  };
  
  const mainDivStyleMobile = {
    ...mainDivStyle,
    backgroundImage: `url(${pic4})`,
    height: "40vh",
  };
  
  
  

  return (
    <div className="w-full h-full flex flex-row items-center justify-center mb-10" style={isMobile ? {...mainDivStyleMobile, height: "50vh"} : mainDivStyle}>
      <div className="w-1/2">
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1 }}
           >
             {/* <h1 className="text-3xl font-bold opacity-100" style={textDivStyle}>{carouselItems[activeIndex].text}</h1> */}
           </motion.div>
         </div>
         <div className="opacity-100 w-1/2">
           <img src={carouselItems[activeIndex].image} alt=""  className="lg:h-[75vh]  w-[95%] opacity-100 rounded-2xl" />
         </div>
       </div>
  );
};


  

=======
import React from "react";
import logo from "../../Assets/book.png";
import float1 from "../../Assets/float1.png";
import float2 from "../../Assets/float2.png";
import float3 from "../../Assets/float3.png";
import float4 from "../../Assets/float4.png";

const Slider = () => {
  return (
    <div className="w-full flex flex-col md:flex-row items-center gap-3 md:gap-0 py-[50px] md:py-[70px] px-[15px] md:px-[30px]">
      <img
        src={float1}
        alt="floating"
        className="absolute top-[120px] left-[50px] z-[-1] md:top-[160px] md:left-[100px] w-[70px] icon"
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

      <div className="md:w-1/2 w-full flex flex-col p-[10px] gap-6">
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
>>>>>>> f54317ac636f4b1975b4a4b222becafe925ef5a0

export default Slider;
