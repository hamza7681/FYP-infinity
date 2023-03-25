import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { http } from "../../Axios/config";
import Navbar from '../Navbar/index';
import Footer from '../Footer/Footer'

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
  // {course.title}{course.language}{course.title_desc}{course.price}{course.description}
  // <img src={course.image} className='w-full md:h-[150px] h-[200px] ' alt="Course Image"/>
  // "bg-black w-auto h-auto py-28 flex lg:flex-row flex-col text-center content-center gap-x-2 justify-center items-center
  return(
    <>
    <Navbar/>
    <div className="bg-black w-full h-auto">
      <div className="mx-20 w-auto flex lg:flex-row flex-col gap-x-2 py-28 text-center justify-center content-center">
        <div className="lg:w-3/5 w-full text-white">
          <p>{course.title}</p>
        </div>
        <div className="lg:w-2/5 w-full">
        <img src={course.image} className='w-[200px] md:h-[150px] h-[200px] ' alt="Course Image"/>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  ); 
};

export default ViewCourse;
