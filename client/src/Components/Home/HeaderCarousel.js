import React, { useEffect, useState } from "react";
import pic1 from "../../Assets/react.png";
import pic2 from "../../Assets/graphics.jpg";
import pic3 from "../../Assets/download.webp";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const HeaderCarousel = () => {
  const images = [pic1, pic2, pic3];

  const [animation, setAnimation] = useState({
    direction: "stop",
    imageIndex: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (animation.direction === "stop") {
        setAnimation((prevAnimation) => ({
          ...prevAnimation,
          direction: "right",
        }));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [animation.direction]);

  const getSecondImageIndex = (currIndex, dir) => {
    return dir === "stop"
      ? currIndex
      : (currIndex + (dir === "right" ? 1 : -1) + images.length) %
          images.length;
  };

  const onNext = () => {
    if (animation.direction === "stop") {
      setAnimation({
        ...animation,
        direction: "right",
      });
    }
  };

  const onPrevious = () => {
    if (animation.direction === "stop") {
      setAnimation({
        ...animation,
        direction: "left",
      });
    }
  };

  const onTransitionEnd = () => {
    setAnimation((prevAnimation) => ({
      ...prevAnimation,
      direction: "stop",
      imageIndex: getSecondImageIndex(
        prevAnimation.imageIndex,
        prevAnimation.direction
      ),
    }));
  };

  return (
    <>
      <div className="carousel bg-gray-200">
        <img
          className="image firstImage"
          src={images[animation.imageIndex]}
          data-animate={animation.direction}
          onTransitionEnd={onTransitionEnd}
          alt="dsa"
        />
        <img
          className="image"
          src={
            images[
              getSecondImageIndex(animation.imageIndex, animation.direction)
            ]
          }
          alt="fd"
        />

        <button
          className="btn prevBtn p-[10px] hover:bg-gray-300"
          onClick={onPrevious}
        >
          <AiOutlineLeft />
        </button>
        <button
          className="btn nextBtn p-[10px] hover:bg-gray-300"
          onClick={onNext}
        >
          <AiOutlineRight />
        </button>
      </div>
    </>
  );
};

export default HeaderCarousel;
