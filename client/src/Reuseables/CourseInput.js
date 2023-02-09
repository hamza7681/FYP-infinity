import React from "react";

const CourseInput = ({
  title,
  titleStyle,
  inputStyle,
  textarea1,
  count,
  value,
  setState,
  setCount,
  type,
}) => {
  return (
    <>
      <div className="flex flex-col">
        <label className={titleStyle}>{title}</label>
        {textarea1 ? (
          <>
            <textarea
              className="w-full mt-[3px] focus:outline-none border-[1px] py-[7px] px-[15px] rounded-[4px] border-gray-400 resize-none"
              rows={3}
              placeholder="Enter brief title description..."
              value={value}
              maxLength={100}
              onChange={(e) => {
                setState(e.target.value);
                setCount(e.target.value.length);
              }}
            ></textarea>
            <p
              className={`${
                count === 100 ? "text-red-500" : "text-gray-600"
              } text-[14px] pt-[5px] `}
            >
              Characters {count}/100
            </p>
          </>
        ) : (
          <input
            type={type}
            placeholder="Enter title"
            className={inputStyle}
            value={value}
            onChange={(e) => setState(e.target.value)}
          />
        )}
      </div>
    </>
  );
};

export default CourseInput;
