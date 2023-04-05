import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { http } from "../../axios/config";
import { useParams } from "react-router-dom";
import ViewInput from "../../reuseables/ViewInput";

const ViewFeedback = () => {
  const { token } = useSelector((s) => s.AuthReducer);
  const [feedback, setFeedback] = useState({});
  const [course, setCourse] = useState({});
  const { id } = useParams();
  useEffect(() => {
    if (token) {
      const getFeedback = async () => {
        const res = await http.get("/feedback/get-feedback-user/" + id);
        setFeedback(res.data);
      };
      getFeedback();
    }
  }, [token, id]);
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
        <h1 className="text-white text-[26px]">{feedback?.text}</h1>
      </div>
      <div className="bg-[#39405a] my-[10px] py-[10px] flex flex-col rounded-[7px] px-[30px]">
        <div className="w-full flex justify-center items-center">
        <img src={course?.image} alt="course" className="h-[300px]" />
        </div>
        <ViewInput label="Added by" value={feedback?.added_by} />
        <div className="flex flex-col w-full py-[10px]">
          <label className="text-white font-semibold py-[3px]">
            Feedback Description
          </label>
          <textarea
            className="w-full py-[10px] rounded-[4px] px-[10px] text-white resize-none"
            value={feedback?.text}
            disabled
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default ViewFeedback;
