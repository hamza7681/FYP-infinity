import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { http } from "../../Axios/config";

const ViewCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState({});

  useEffect(() => {
    const getCourse = async () => {
      try {
        const res = await http.get("/course/course-by-id/" + id);
        setCourse(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCourse();
  }, [id]);

  return <div>ViewCourse {course.title}</div>;
};

export default ViewCourse;
