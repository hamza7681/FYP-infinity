import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { http } from "../../Axios/config";
import Rating from "../../Reuseables/Rating";
import { BsFillPatchExclamationFill, BsGlobe } from "react-icons/bs";
import FormattedPrice from "../../Reuseables/FormattedPrice";
import { useDispatch, useSelector } from "react-redux";

const ViewCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [category, setCategory] = useState({});
  const [rating, setRating] = useState({});
  const [user, setUser] = useState({});
  const { cartItems } = useSelector((s) => s.CourseReducer);
  const { token } = useSelector((s) => s.AuthReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getCourse = async () => {
      try {
        const res = await http.get("/course/course-by-id/" + id);
        setCourse(res.data);
        setCategory(res.data.category);
        setUser(res.data.created_by);
      } catch (error) {
        console.log(error);
      }
    };
    getCourse();
    const getRating = async () => {
      try {
        const res = await http.get("/feedback/get-rating/" + id);
        setRating(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRating();
  }, [id]);

  const UpdateDate = () => {
    const date = new Date(course.updatedAt);
    const options = {
      year: "numeric",
      month: "2-digit",
    };
    const formattedDate = date.toLocaleString("en-US", options);
    return <p className="text-white">Last Updated {formattedDate}</p>;
  };

  return (
    <>
      <div className="w-full h-auto">
        <div className="bg-[#1C1D1F] w-full py-[20px] px-[10px] md:pl-[105px] flex flex-row items-center">
          <div className="w-full md:w-2/3 flex flex-col gap-3">
            <div>
              <Link
                to="/courses"
                className="text-[#CEBBE7] text-[12px] md:text-[16px] font-semibold"
              >
                {category.name}
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-white text-[23px] md:text-[32px] font-semibold">
                {course.title}
              </h1>
              <p className="text-white">{course.title_desc}</p>
              <div className="flex flex-row items-center">
                <Rating rating={rating.rating} />
                <p className="text-gray-400 text-[12px] relative top-[-1px]">
                  (Ratings {rating.total})
                </p>
              </div>
              <div>
                <p className="text-white">
                  Created by{" "}
                  <Link to="/" className="text-[#CEBBE7] underline">
                    {user.firstName + " " + user.lastName}
                  </Link>
                </p>
              </div>
              <div className="flex flex-row gap-3 justify-start">
                <div className="flex flex-row items-center gap-2">
                  <BsFillPatchExclamationFill className="text-white" />
                  <UpdateDate />
                </div>
                <div className="flex flex-row items-center gap-2">
                  <BsGlobe className="text-white" />
                  <p className="text-white">{course.language}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:block hidden">
            <img src={course.image} alt="courseImage" className="w-[320px]" />
          </div>
        </div>
        <div className="bg-white w-full py-[20px] px-[10px] md:pl-[105px] flex flex-col md:flex-row gap-3">
          <div className="w-full md:w-2/3 flex flex-col gap-3 p-[10px] border-[1px] border-gray-300">
            <h1 className="font-semibold text-[22px]">Description</h1>
            <p className="text-[15px] text-gray-600 text-justify">
              {course.description}
            </p>
          </div>
          <div className="bg-white px-[20px] py-[50px] shadow-lg md:w-[300px] border-[1px] flex flex-col gap-3">
            <p className="text-[28px] font-semibold">
              <FormattedPrice price={course.price} />
            </p>
            {!cartItems.find((item) => item._id === id) ? (
              <button
                onClick={() => {
                  if (token) {
                    dispatch({ type: "ADD_TO_CART", payload: course });
                  } else {
                    navigate("/login");
                  }
                }}
                className="bg-[#8710D8] text-white font-semibold py-[10px]"
              >
                Add To Cart
              </button>
            ) : (
              <button
                onClick={() => {
                  dispatch({ type: "REMOVE_FROM_CART", payload: course });
                }}
                className="bg-red-500 text-white font-semibold py-[10px]"
              >
                Remove
              </button>
            )}
          </div>
        </div>
        
      </div>
    </>
  );
};

export default ViewCourse;
