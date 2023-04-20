import React, { useState, useEffect } from "react";
import pic1 from "../../Assets/pic1.jpg";
import pic2 from "../../Assets/pic2.jpg";
import pic3 from "../../Assets/pic3.png";
import pic4 from "../../Assets/pic4.png";

const images = [
  { src: pic1, text: "First image" },
  { src: pic2, text: "Second image" },
  { src: pic3, text: "Third image" },
  { src: pic4, text: "Fourth image" },
];
const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <div className="relative w-full h-[200px] md:h-[660px]">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-[80%] transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image.src}
            alt={image.text}
            className="object-fit w-full md:h-[600px]"
          />
        </div>
      ))}
    </div>
  );
};

export default Slider;
