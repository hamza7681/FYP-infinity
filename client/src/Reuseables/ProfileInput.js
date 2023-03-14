import React from "react";

const ProfileInput = ({
  styleClass,
  label,
  value,
  change,
  disabled,
  placeholder,
}) => {
  return (
    <>
      <div className={`flex flex-col ${styleClass}`}>
        <label className="font-semibold">{label}</label>
        <input
          type="text"
          className={`focus:outline-none w-full border-[1px] border-gray-400 py-[7px] px-[20px] rounded-[4px] placeholder:text-[14px] ${
            disabled ? "bg-gray-200 text-gray-400" : ""
          }`}
          onChange={change}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default ProfileInput;
