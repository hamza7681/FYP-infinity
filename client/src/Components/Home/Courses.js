import React from "react";
import { useSelector } from "react-redux";
function Courses() {
  const { courses } = useSelector((s) => s.CourseReducer);
  console.log(courses);
  return (
    <>
      <div className="py-[10px] px-[25px] mt-3">
        <h2 className="font-bold text-[25px]">Courses</h2>
        {courses.map((val, index) => {
          return (
            <>
              <div>
                <h1>{val.title}</h1>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
export default Courses;
