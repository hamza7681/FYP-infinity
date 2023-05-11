import React from "react";
import { FaGraduationCap, FaUsers } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { MdFeedback } from "react-icons/md";
import { useSelector } from "react-redux";

const Stats = () => {
  const { courses, students, tutors, feedbacks } = useSelector(
    (s) => s.CourseReducer
  );

  return (
    <>
      <div className="w-full bg-[#2A2F5B] flex flex-row justify-around items-center py-[60px]">
        <div className="flex flex-col justify-center items-center">
          <FaUsers className="text-[32px] md:text-[42px] text-white" />
          <p className="text-[22px] md:text-[32px] text-white font-semibold">
            {students?.length}
          </p>
          <p className="text-white text-[16px] md:text-[22px]">Students</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <FaGraduationCap className="text-[32px] md:text-[42px] text-white" />
          <p className="text-[22px] md:text-[32px] text-white font-semibold">
            {tutors?.length}
          </p>
          <p className="text-white text-[16px] md:text-[22px]">Tutors</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <ImBooks className="text-[32px] md:text-[42px] text-white" />
          <p className="text-[22px] md:text-[32px] text-white font-semibold">
            {courses?.length}
          </p>
          <p className="text-white text-[16px] md:text-[22px]">Courses</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <MdFeedback className="text-[32px] md:text-[42px] text-white" />
          <p className="text-[22px] md:text-[32px] text-white font-semibold">
            {feedbacks?.length}
          </p>
          <p className="text-white text-[16px] md:text-[22px]">Feedbacks</p>
        </div>
      </div>
    </>
  );
};

export default Stats;
