// import React from "react";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";
// import pic1 from "../../Assets/pic1.jpg";
// import pic2 from "../../Assets/pic2.jpg";
// import pic3 from "../../Assets/pic3.png";
// import pic4 from "../../Assets/pic4.png";

// const Slider = () => {
//   return (
//     <>
//       <Carousel
//         autoPlay
//         emulateTouch={true}
//         infiniteLoop={true}
//         interval={2000}
//         showStatus={false}
//         showThumbs={false}
//         showIndicators={false}
//       >
//         <div>
//           <img src={pic1} className="md:h-[500px] h-[230px]" alt="slider pic" />
//           <p className="legend" id="slider_legend">
//             Python Development
//           </p>
//         </div>
//         <div>
//           <img src={pic2} className="md:h-[500px] h-[230px]" alt="slider pic" />
//           <p className="legend" id="slider_legend">
//             React Js Crash Course
//           </p>
//         </div>
//         <div>
//           <img src={pic3} className="md:h-[500px] h-[230px]" alt="slider pic" />
//           <p className="legend" id="slider_legend">
//             Introduction to Graphics Designing
//           </p>
//         </div>
//         <div>
//           <img src={pic4} className="md:h-[500px] h-[230px]" alt="slider pic" />
//           <p className="legend" id="slider_legend">
//             Game Development
//           </p>
//         </div>
//       </Carousel>
//     </>
//   );
// };

// export default Slider;
import React, { useState, useEffect } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
// import image1 from '../Assets/slider-1.jpg';
// import image2 from '../Assets/slider-2.jpg';
// import image3 from '../Assets/slider-3.jpg';
import pic1 from "../../Assets/pic1.jpg";
import pic2 from "../../Assets/pic2.jpg";
import pic3 from "../../Assets/pic3.png";
import pic4 from "../../Assets/pic4.png";


const images = [
    { src: pic1, text: 'First image' },
    { src: pic2, text: 'Second image' },
    { src: pic3, text: 'Third image' },
    { src: pic4, text: 'Fourth image' },

  ];
  const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
  
    const nextSlide = () => {
      setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
    };
  
    const prevSlide = () => {
      setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
    };
  
    useEffect(() => {
      const timer = setTimeout(() => {
        nextSlide();
      }, 2000);
  
      return () => clearTimeout(timer);
    }, [currentSlide]);
  
    return (
      <div className="relative w-full h-screen">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-[80%] transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={image.src} alt={image.text} className="object-cover w-full h-full" />
          </div>
        ))}
        <FaArrowAltCircleLeft
          className="absolute top-[40%] left-1 text-4xl text-white cursor-pointer"
          onClick={prevSlide}
        />
        <FaArrowAltCircleRight
          className="absolute top-[40%] right-4 text-4xl text-white cursor-pointer"
          onClick={nextSlide}
        />
      </div>
    );
  };

  export default Slider;
    
