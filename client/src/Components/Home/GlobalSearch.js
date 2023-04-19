import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { http } from "../../Axios/config";
import { useNavigate } from "react-router-dom";
import FormattedPrice from "../../Reuseables/FormattedPrice";
import { AiFillStar } from "react-icons/ai";
import {
  BsArrowRight,
  BsCartDash,
  BsCartPlus,
  BsEye,
  BsFillHeartFill,
} from "react-icons/bs";
import { FaEdit, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { BiHeart } from "react-icons/bi";

function Stars() {
  const stars = [];
  for (let i = 0; i < 4; i++) {
    stars.push(<AiFillStar key={i} />);
  }
  return <>{stars}</>;
}

const GlobalSearch = () => {
  const { searching, cartItems, globalSearch } = useSelector(
    (s) => s.CourseReducer
  );
  const { user, token } = useSelector((s) => s.AuthReducer);
  const [courses, setCourses] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [userCourses, setUserCourses] = useState([]);
  const navigate = useNavigate();
  const [fetchAgain, setFetchAgain] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searching) {
      const getCourses = async () => {
        try {
          const res = await http.get("/course/get-course");
          let filteredArray = res.data.filter((val) => {
            return val.title.toLowerCase().includes(globalSearch.toLowerCase());
          });
          setCourses(filteredArray);
        } catch (error) {
          console.log(error);
        }
      };
      getCourses();
      const getTutors = async () => {
        try {
          const res = await http.get("/auth/get-tutors");
          let filteredArray = res.data.filter((val) => {
            return (
              val.firstName
                .toLowerCase()
                .includes(globalSearch.toLowerCase()) ||
              val.lastName.toLowerCase().includes(globalSearch.toLowerCase()) ||
              val.email.toLowerCase().includes(globalSearch.toLowerCase()) ||
              val.subject.toLowerCase().includes(globalSearch.toLowerCase())
            );
          });
          setTutors(filteredArray);
        } catch (error) {
          console.log(error);
        }
      };
      getTutors();
      const getWishlist = async () => {
        try {
          const res = await http.get("/wishlist/get-wishlist-userId", {
            headers: { Authorization: token },
          });
          setWishlist(res.data);
          setFetchAgain(false);
        } catch (error) {
          setFetchAgain(false);
          console.log(error);
        }
      };
      getWishlist();
      const getUserCourses = async () => {
        try {
          const res = await http.get(`/course/courses-by-userId/${user._id}`, {
            headers: { Authorization: token },
          });
          setUserCourses(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      getUserCourses();
    }
  }, [searching, globalSearch, token, fetchAgain, user._id]);

  const addToWishlist = async (id) => {
    try {
      const res = await http.post(
        "/wishlist/add-wishlist",
        { added_by: user._id, course: id },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success(res.data.msg);
      setFetchAgain(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full p-[30px]">
      <div
        className="w-fit text-white py-[10px] rounded-[5px] px-[10px] flex flex-row gap-2 items-center bg-[#03043B] mb-[30px]"
        onClick={() => dispatch({ type: "CLOSE_SEARCH" })}
      >
        <p>Close</p> <FaTimes />
      </div>
      <h1 className="m-[10px] mb-[40px] pb-[15px] text-[22px] font-semibold border-b-[1px]">
        Searched Results for Courses:
      </h1>
      {courses.length === 0 ? (
        <p className="m-[10px] text-red-500">No courses found!</p>
      ) : (
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
                    {user.role === 2 ? (
                      <>
                        {userCourses.find((item) => item._id === val._id) ? (
                          <div
                            onClick={(e) => {
                              navigate("/edit-course/" + val._id);
                              e.stopPropagation();
                            }}
                            className="border-2 rounded-bl-lg gap-2 border-black flex flex-row  items-center justify-center w-full   py-[10px] text-[#fff] bg-[#03043b] hover:bg-white hover:text-black  "
                          >
                            <FaEdit className="relative top-[-2px]" />
                            <div> Edit</div>
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      <>
                        {!wishlist.find(
                          (item) => item.course._id === val._id
                        ) ? (
                          <div
                            onClick={(e) => {
                              addToWishlist(val._id);
                              e.stopPropagation();
                            }}
                            className="border-2 rounded-bl-lg gap-2 border-black flex flex-row  items-center justify-center w-full   py-[10px] text-[#fff] bg-[#03043b] hover:bg-white hover:text-black  "
                          >
                            <BiHeart className="relative top-[-2px]" />
                            <div> Wishlist</div>
                          </div>
                        ) : (
                          <div
                            onClick={(e) => {
                              addToWishlist(val._id);
                              e.stopPropagation();
                            }}
                            className="border-2 rounded-bl-lg gap-2 border-black flex flex-row  items-center justify-center w-full   py-[10px] text-[#fff] bg-[#03043b] hover:bg-white hover:text-black  "
                          >
                            <BsFillHeartFill className="text-red-500 relative top-[-2px]" />
                            <div> Remove</div>
                          </div>
                        )}
                      </>
                    )}

                    {user.role === 2 ? (
                      <div className="border-2 rounded-br-lg gap-2 border-black flex flex-row items-center justify-center w-full  py-[10px] text-[#fff] bg-[#03043b] hover:bg-white hover:text-black  ">
                        <BsEye className="relative top-[-2px]" />
                        <div>View</div>
                      </div>
                    ) : (
                      <>
                        {!cartItems.find((item) => item._id === val._id) ? (
                          <div
                            onClick={(e) => {
                              if (token) {
                                dispatch({ type: "ADD_TO_CART", payload: val });
                                e.stopPropagation();
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
                            onClick={(e) => {
                              dispatch({
                                type: "REMOVE_FROM_CART",
                                payload: val,
                              });
                              e.stopPropagation();
                            }}
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
      )}

      {user.role === 2 ? (
        ""
      ) : (
        <>
          <h1 className="m-[10px] mb-[40px] py-[15px] text-[22px] font-semibold border-b-[1px]">
            Searched Results for Tutors:
          </h1>

          {tutors.length === 0 ? (
            <p className="m-[10px] text-red-500">No Tutors found!</p>
          ) : (
            <div className="w-full flex flex-col gap-3 md:flex-row flex-wrap items-center">
              {tutors.slice(0, 4).map((val) => {
                return (
                  <>
                    <div
                      key={val._id}
                      className="mt-2 w-full md:w-1/5 border-2 drop-shadow-xl hover:cursor-pointer mb-2 flex flex-col rounded-lg"
                      onClick={() => navigate("/course/" + val._id)}
                    >
                      <div className="w-full flex justify-center items-center py-[10px]">
                        <div className="w-[150px]">
                          <img
                            src={val.dp}
                            alt="Course_Pic"
                            className=" border w-full rounded-full"
                          />
                        </div>
                      </div>
                      <div className="gap-2 px-[16px] h-[180px] flex flex-col py-[20px]">
                        <h2 className="text-[18px] font-bold mt-2">
                          {val.firstName} {val.lastName}
                        </h2>
                        <p>{val.email}</p>
                        <div className="flex flex-col gap-2 w-full">
                          <p className="font-bold">
                            <p>{val.subject}</p>
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-row justify-between w-full">
                        <div className="border-2 rounded-bl-lg gap-2 border-black flex flex-row  items-center justify-center w-full   py-[10px] text-[#fff] bg-[#03043b] hover:bg-white hover:text-black  ">
                          <BsEye className="relative top-[-2px]" />
                          <div> View</div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
              <div className="flex flex-col gap-2 rounded-[5px] justify-center items-center w-[200px] border-2 drop-shadow-xl mb-2 h-[300px]">
                <div
                  className="w-[70px] h-[70px] bg-[#03043b] rounded-full flex justify-center items-center cursor-pointer"
                  onClick={() => navigate("/tutors")}
                >
                  <BsArrowRight className="text-white text-[22px]" />
                </div>
                <p>Show More</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GlobalSearch;
