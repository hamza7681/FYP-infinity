import React from "react";
import { FaStar } from "react-icons/fa";

const Star = ({ filled }) => {
  return (
    <span className={`star ${filled ? "filled" : ""}`}>
      {filled ? <FaStar /> : <FaStar />}
    </span>
  );
};

export default Star;
