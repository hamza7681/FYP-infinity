import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import pic1 from "../../Assets/pic1.jpg";
import pic2 from "../../Assets/pic2.jpg";
import pic3 from "../../Assets/pic3.png";
import pic4 from "../../Assets/pic4.png";

const Slider = () => {
  const style = {
    backgroundColor: "white",
    boxShadow: "0px 7px 11px 0px rgba(0,0,0,0.75)",
    color: "black",
    fontWeight: "bold",
    fontSize: "19px",
  };

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
          <img src={pic1} className="h-[500px]" />
          <p className="legend" style={style}>
            Python Development
          </p>
        </div>
        <div>
          <img src={pic2} className="h-[500px]" />
          <p className="legend" style={style}>
            React Js Crash Course
          </p>
        </div>
        <div>
          <img src={pic3} className="h-[500px]" />
          <p className="legend" style={style}>
            Introduction to Graphics Designing
          </p>
        </div>
        <div>
          <img src={pic4} className="h-[500px]" />
          <p className="legend" style={style}>
            Game Development
          </p>
        </div>
      </Carousel>
    </>
  );
};

export default Slider;
