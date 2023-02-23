import React from "react";

const Tutors = () => {
  return (
    <>
      <div className="w-full p-[10px] md:p-[30px]">
        <div className="w-full border-b-[3px] pb-[10px]">
          <h1 className="text-[24px] font-semibold">Tutors</h1>
        </div>
        <div className="w-full flex flex-col md:flex-row mt-[30px]">
          <div className="w-full md:w-[30%] flex justify-center items-center md:border-r-gray-400 md:border-r-[1px]">
            <div className="flex flex-col justify-center items-center bg-gray-200 p-[50px] rounded-[5px] shadow-lg">
              <p className="text-[28px] font-semibold text-[#292a77]">
                Total Tutors
              </p>
              <p className="text-[28px] font-semibold text-[#292a77]">1</p>
            </div>
          </div>
          <div className="w-full md:w-[70%] px-[10px]">
            <div className="md:mt-0 mt-[20px]">
              <input
                type="text"
                placeholder="Search tutors here..."
                className="bg-gray-200 w-full px-[10px] py-[15px] focus:outline-none rounded-[5px]"
              />
            </div>
            <div className="flex flex-row">
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tutors;
