import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillStar } from "react-icons/ai";
import { BsArrowRight, BsCartDash, BsCartPlus } from "react-icons/bs";
import { BiHeart } from "react-icons/bi";
import FormattedPrice from "../../Reuseables/FormattedPrice";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

function Stars() {
  const stars = [];
  for (let i = 0; i < 4; i++) {
    stars.push(<AiFillStar key={i} />);
  }
  return <>{stars}</>;
}
function Courses() {
  const { courses, cartItems } = useSelector((s) => s.CourseReducer);
  const { token, user } = useSelector((s) => s.AuthReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <div className="py-[10px] px-[25px] mt-3">
        <h2 className="font-bold text-[25px] ">Courses</h2>
        <div className="w-full flex flex-col gap-3 md:flex-row flex-wrap items-center">
          {courses.slice(0, 4).map((val) => {
            return (
              <>
                <div
                  key={val._id}
                  className="mt-2 w-full md:w-1/5 border-2 drop-shadow-xl hover:cursor-pointer mb-2 flex flex-col rounded-lg"
                  onClick={() => navigate("/course/" + val._id)}
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
                    <div className="border-2 rounded-bl-lg gap-2 border-black flex flex-row  items-center justify-center w-full   py-[10px] text-[#fff] bg-[#03043b] hover:bg-white hover:text-black  ">
                      <BiHeart className="relative top-[-2px]" />
                      <div> Wishlist</div>
                    </div>
                    {user.role === 2 ? (
                      <div
                        onClick={() => {
                          navigate("/edit-course" + val._id);
                        }}
                        className="border-2 rounded-br-lg gap-2 border-black flex flex-row items-center justify-center w-full  py-[10px] text-[#fff] bg-[#03043b] hover:bg-white hover:text-black  "
                      >
                        <FaEdit className="relative top-[-2px]" />
                        <div>Edit</div>
                      </div>
                    ) : (
                      <>
                        {!cartItems.find((item) => item._id === val._id) ? (
                          <div
                            onClick={() => {
                              if (token) {
                                dispatch({ type: "ADD_TO_CART", payload: val });
                              } else {
                                navigate("/login");
                              }
                            }}
                            className="border-2 rounded-br-lg gap-2 border-black flex flex-row items-center justify-center w-full  py-[10px] text-[#fff] bg-[#03043b] hover:bg-white hover:text-black  "
                          >
                            <BsCartPlus className="relative top-[-2px]" />
                            <div>Cart</div>
                          </div>
                        ) : (
                          <div
                            onClick={() =>
                              dispatch({
                                type: "REMOVE_FROM_CART",
                                payload: val,
                              })
                            }
                            className="border-2 rounded-br-lg gap-2 border-black flex flex-row items-center justify-center w-full  py-[10px] text-[#fff] bg-red-500 hover:bg-white hover:text-black  "
                          >
                            <BsCartDash className="relative top-[-2px]" />
                            <div>Remove</div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </>
            );
          })}
          <div className="flex flex-col gap-2 rounded-[5px] justify-center items-center w-[200px] border-2 drop-shadow-xl mb-2 h-[300px]">
            <div
              className="w-[70px] h-[70px] bg-[#03043b] rounded-full flex justify-center items-center cursor-pointer"
              onClick={() => navigate("/courses")}
            >
              <BsArrowRight className="text-white text-[22px]" />
            </div>
            <p>Show More</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Courses;
