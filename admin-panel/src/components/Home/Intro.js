import React from "react";
import { useSelector } from "react-redux";
import Cards from "./Cards";

const Intro = ({ data }) => {
  const { appBackground } = useSelector((s) => s.ThemeReducer);

  console.log(data);
  return (
    <>
      <div className="pt-[50px] w-full">
        <h1
          className={`${
            appBackground === "#ffffff" ? "text-black" : "text-white"
          } text-[22px] font-semibold my-[20px]`}
        >
          Welcome back, Admin!
        </h1>
        <div className="flex flex-row w-full justify-between gap-4 flex-wrap">
          <Cards
            data={data.students && data.students}
            tooltipTitle="Students"
            title="Students"
            subTitle="Students per year"
          />
          <Cards
            data={data.tutors && data.tutors}
            tooltipTitle="Tutors"
            title="Tutors"
            subTitle="Tutors per year"
          />
          <Cards
            data={data.orders && data.orders}
            tooltipTitle="Orders"
            title="Orders"
            subTitle="Orders per year"
          />
        </div>
      </div>
    </>
  );
};

export default Intro;
