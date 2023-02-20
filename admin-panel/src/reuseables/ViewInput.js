import React from "react";

const ViewInput = ({ label, value }) => {
  return (
    <div className="flex flex-col w-full py-[10px]">
      <label className="text-white font-semibold py-[3px]">{label}</label>
      <input
        disabled
        className="w-full py-[10px] rounded-[4px] px-[10px] text-white"
        value={value}
      />
    </div>
  );
};

export default ViewInput;
