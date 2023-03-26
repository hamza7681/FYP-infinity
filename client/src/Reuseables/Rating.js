import React from "react";
import Star from "./Star";

const Rating = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const halfFilled = Math.ceil(rating - filledStars) === 1;

  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < filledStars) {
      stars.push(<Star key={i} filled={true} />);
    } else if (i === filledStars && halfFilled) {
      stars.push(<Star key={i} filled={false} />);
    } else {
      stars.push(<Star key={i} filled={false} />);
    }
  }

  return <div>{stars}</div>;
};

export default Rating;
