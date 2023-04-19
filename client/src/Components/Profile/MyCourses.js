import React, { useEffect, useState } from "react";
import { http } from "../../Axios/config";
import { useSelector } from "react-redux";
import FormattedPrice from "../../Reuseables/FormattedPrice";
import { useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

function Stars() {
  const stars = [];
  for (let i = 0; i < 4; i++) {
    stars.push(<AiFillStar key={i} />);
  }
  return <>{stars}</>;
}

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const { user } = useSelector((s) => s.AuthReducer);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await http.get("/course/courses-by-userId/" + user._id);
        setCourses(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourses();
  }, [user._id]);

  return (
    <>
      <div className="flex flex-row justify-between flex-wrap w-full px-[30px]">
        {courses.map((val) => {
          return (
            <>
              <div
                key={val._id}
                className="mt-2 w-full md:w-1/5 border-2 drop-shadow-xl hover:cursor-pointer mb-2 flex flex-col rounded-lg"
                onClick={() => navigate("/edit-course/" + val._id)}
              >
                <div className="w-full">
                  <img
                    src={val.image}
                    alt="Course_Pic"
                    className=" border w-full rounded-lg md:h-[150px] h-[200px]"
                  />
                </div>
                <div className="gap-2 px-[16px] h-[220px] flex flex-col py-[20px]">
                  <h2 className="text-[18px] font-bold mt-2">{val.title}</h2>
                  <p>{val.title_desc}</p>
                  <div className="flex flex-col gap-2 w-full">
                    <p className="font-bold">
                      <FormattedPrice price={val.price} />
                    </p>
                    <p className="text-[#ffd700] flex flex-row items-center text-[18px] ">
                      <Stars />
                    </p>
                  </div>
                </div>
                <div className="flex flex-row justify-between w-full">
                  <div className="border-2 rounded-br-lg gap-2 border-black flex flex-row items-center justify-center w-full  py-[10px] text-[#fff] bg-[#03043b] hover:bg-white hover:text-black  ">
                    <FaEdit className="relative top-[-2px]" />
                    <div>Edit</div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default MyCourses;
