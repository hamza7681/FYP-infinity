import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import pic1 from "../../Assets/e learning.jpg";
import pic2 from "../../Assets/game.jpeg";
import pic3 from "../../Assets/python-1.jpeg";
import pic4 from "../../Assets/iot.jpeg";

// const images = [
//   { src: pic1, text: "First image" },
//   { src: pic2, text: "Second image" },
//   { src: pic3, text: "Third image" },
//   { src: pic4, text: "Fourth image" },
// ];
// const Slider = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const nextSlide = () => {
//     setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       nextSlide();
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, [currentSlide]);

//   return (
//     <div className="relative w-full h-[200px] md:h-[660px]">
//       {images.map((image, index) => (
//         <div
//           key={index}
//           className={`absolute top-0 left-0 w-full h-[80%] transition-opacity duration-1000 ${
//             index === currentSlide ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           <img
//             src={image.src}
//             alt={image.text}
//             className="object-fit w-full md:h-[600px]"
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

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
      opacity: "0.25",
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
          <img src={carouselItems[activeIndex].image} alt=""  className="h-96 w-[100%] opacity-100!important"/>
        </div>
      </div>
    );
  };
  


export default Slider;
