import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import pic1 from "../../Assets/e learning.jpg";
import pic2 from "../../Assets/game.jpeg";
import pic3 from "../../Assets/python-1.jpeg";


const carouselItems = [
  {
    image: pic1,
    text: "First Carousel Item",
  },
  {
    image: pic2,
    text: "Second Carousel Item",
  },
  {
    image: pic3,
    text: "Third Carousel Item",
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
      backgroundImage: `url(${carouselItems[activeIndex].image})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    };
  
    return (
      <div className="w-full h-4/5 flex flex-row items-center justify-center mb-10" style={mainDivStyle}>
        <div className="flex-row m-[2%]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-3xl font-bold opacity-100">{carouselItems[activeIndex].text}</h1>
          </motion.div>
        </div>
        <div className="flex-row m-[1%] opacity-100">
          <img src={carouselItems[activeIndex].image} alt=""  className="h-96 w-[100%]"/>
        </div>
      </div>
    );
  };
  


export default Slider;
