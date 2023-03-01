import React from "react";
import { useSelector } from "react-redux";
 import {AiFillStar} from 'react-icons/ai'
function Stars(){
 const stars=[];
  for(let i=0; i < 4; i++){
     stars.push(<AiFillStar key={i}/>);
 }
  return <>{stars}</>;
 }
function Courses() {
  const { courses } = useSelector((s) => s.CourseReducer);
  console.log(courses);
  return (
    <>
      <div className="py-[10px] px-[25px] mt-3">
        <h2 className="font-bold text-[25px] ">Courses</h2>
        {courses.map((val, index) => {
          return (
            <>
              <div className="mt-2 w-1/5 border-2 drop-shadow-xl ml-2 hover:cursor-pointer mb-2 flex flex-col ">
                <div className="w-full">
                <img src={val.image} alt="Course_Pic" className=" border rounded-lg"/>
                </div>
                <div className="gap-2 ml-2 flex flex-col">
                <h2 className="text-[20px] font-bold mt-2">{val.title}</h2>
                <p>{val.title_desc}</p>
                <div className="flex flex-row gap-2 w-full">
                  <p className="font-bold">{val.price}</p>
                  <p className="text-[#ffd700] flex flex-row items-center text-[18px] ">
                      <Stars/>
                  </p>
                </div>
                </div>
                <button className="border-2 rounded-lg bottom-0 border-black flex justify-center w-full p-[5px] text-[#fff] bg-[#03043b] hover:bg-white hover:text-black font-bold hover:underline">
                  Add to Cart
                </button>
                </div>
            </>
          );
        })}
      </div>
    </>
  );
}
export default Courses;
