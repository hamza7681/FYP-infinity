import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import pic1 from "../../Assets/pic1.jpg";
import pic2 from "../../Assets/pic2.jpg";
import pic3 from "../../Assets/pic3.png";
import pic4 from "../../Assets/pic4.png";

const Slider = () => {
  return (
    <>
      <Carousel
        autoPlay
        emulateTouch={true}
        infiniteLoop={true}
        interval={2000}
        showStatus={false}
        showThumbs={false}
        showIndicators={false}
      >
        <div>
          <img src={pic1} className="md:h-[500px] h-[230px]" />
          <p className="legend" id="slider_legend">
            Python Development
          </p>
        </div>
        <div>
          <img src={pic2} className="md:h-[500px] h-[230px]" />
          <p className="legend" id="slider_legend">
            React Js Crash Course
          </p>
        </div>
        <div>
          <img src={pic3} className="md:h-[500px] h-[230px]" />
          <p className="legend" id="slider_legend">
            Introduction to Graphics Designing
          </p>
        </div>
        <div>
          <img src={pic4} className="md:h-[500px] h-[230px]" />
          <p className="legend" id="slider_legend">
            Game Development
          </p>
        </div>
      </Carousel>
    </>
  );
};

export default Slider;
