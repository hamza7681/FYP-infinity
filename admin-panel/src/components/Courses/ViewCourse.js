import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { http } from "../../axios/config";
import { useParams } from "react-router-dom";
import ViewInput from "../../reuseables/ViewInput";

const ViewCourse = () => {
  const { token } = useSelector((s) => s.AuthReducer);
  const [course, setCourse] = useState({});
  const { id } = useParams();
  useEffect(() => {
    if (token) {
      const getCourse = async () => {
        const res = await http.get("/course/course-by-id/" + id);
        setCourse(res.data);
      };
      getCourse();
    }
  }, [token, id]);
  return (
    <div className="pt-[50px] h-auto">
      <div className="bg-[#39405a] py-[10px] flex justify-between items-center rounded-[7px] px-[30px]">
        <h1 className="text-white text-[26px]">{course?.title}</h1>
      </div>
      <div className="bg-[#39405a] my-[10px] py-[10px] flex flex-col rounded-[7px] px-[30px]">
        <div className="w-full flex justify-center items-center">
          <img src={course?.image} alt="course" className="h-[300px]" />
        </div>
        <ViewInput label="Title" value={course?.title} />
        <div className="flex flex-col w-full py-[10px]">
          <label className="text-white font-semibold py-[3px]">
            Title Description
          </label>
          <textarea
            className="w-full py-[10px] rounded-[4px] px-[10px] text-white resize-none"
            value={course?.title_desc}
            disabled
          ></textarea>
        </div>
        <ViewInput label="Course Language" value={course?.language} />
        <ViewInput label="Price" value={course?.price} />
        <ViewInput label="Category" value={course?.category?.name} />
        <ViewInput
          label="Tutor"
          value={
            course?.created_by?.firstName + " " + course?.created_by?.lastName
          }
        />
        <ViewInput label="Description" value={course?.category?.name} />
        <div className="flex flex-col w-full py-[10px]">
          <label className="text-white font-semibold py-[3px]">
            Course Description
          </label>
          <textarea
            className="w-full py-[10px] rounded-[4px] px-[10px] text-white resize-none"
            value={course?.description}
            disabled
            rows={10}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default ViewCourse;
