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


  


export default Slider;
