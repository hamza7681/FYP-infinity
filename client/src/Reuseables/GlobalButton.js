import React from "react";

const GlobalButton = ({ title, styleClass, click }) => {
  return (
    <>
      <button className={styleClass} onClick={click}>
        {title}
      </button>
    </>
  );
};

export default GlobalButton;
