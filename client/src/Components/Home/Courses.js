import React, { useEffect} from 'react'
import {http} from "../../Axios/config"
import { useDispatch, useSelector } from 'react-redux';
function Courses() {
  const {courses} = useSelector((s) => s.CourseReducer);
  const {token} = useSelector((s) => s.CourseReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token){
      const getCourses = async () => {
        try {
          const res = await http.get("http://localhost:5000/course/get-course", {
          });
          dispatch ({ type: "GET_COURSES", payload: res.data});
        }catch (error) {
          console.log(error);
        }
      };
      getCourses();
    }
  }, [token, dispatch]);
  return (
    <>
      <div className='py-[10px] px-[25px] mt-3'>
        <h2 className='font-bold text-[25px]'>Courses</h2>
        {courses.map((val, index) => {
          return(
            <>
              <div>

              </div>
            </>
          )
        })}
      </div>
    </>
  );
}
export default Courses