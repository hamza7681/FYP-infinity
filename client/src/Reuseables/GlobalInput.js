import React from "react";

const GlobalInput = ({ type, icon, placeholder, name, change }) => {
  return (
    <>
      <div className="flex flex-row gap-2 items-center shadow-xl border-[1px] px-[20px] py-[10px] rounded-full">
        <span>{icon}</span>
        <input
          className="focus:outline-none focus:bg-transparent w-full"
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={change}
        />
      </div>
    </>
  );
};

export default GlobalInput;
