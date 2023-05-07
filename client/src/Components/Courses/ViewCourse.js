import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { http } from "../../Axios/config";
import Rating from "../../Reuseables/Rating";
import { BsFillPatchExclamationFill, BsGlobe } from "react-icons/bs";
import FormattedPrice from "../../Reuseables/FormattedPrice";
import { useDispatch, useSelector } from "react-redux";
import { IoStarSharp } from "react-icons/io5";
import GlobalButton from "../../Reuseables/GlobalButton";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-toastify";

const ViewCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [category, setCategory] = useState({});
  const [feedback, setFeedback] = useState([]);
  const [rating, setRating] = useState({});
  const [user, setUser] = useState({});
  const [text, setText] = useState("");
  const [ratingForm, setRatingForm] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fetchAgain, setFetchAgain] = useState(false);
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
  }, [id]);

  useEffect(() => {
    const getFeedback = async () => {
      try {
        const res = await http.get("/feedback/get-feedback-course/" + id);
        setFeedback(res.data);
        setFetchAgain(false);
      } catch (error) {
        console.log(error);
        setFetchAgain(false);
      }
    };
    getFeedback();
    const getRating = async () => {
      try {
        const res = await http.get("/feedback/get-rating/" + id);
        setRating(res.data);
        setFetchAgain(false);
      } catch (error) {
        console.log(error);
        setFetchAgain(false);
      }
    };
    getRating();
  }, [id, fetchAgain]);

  const UpdateDate = () => {
    const date = new Date(course.updatedAt);
    const options = {
      year: "numeric",
      month: "2-digit",
    };
    const formattedDate = date.toLocaleString("en-US", options);
    return <p className="text-white">Last Updated {formattedDate}</p>;
  };

  const handleClick = (value) => {
    setRatingForm(value);
  };

  const submitQuestion = async () => {
    setLoading(true);
    if (token) {
      try {
        const res = await http.post(
          "/feedback/add-feedback",
          {
            added_by: user._id,
            course: id,
            text: text,
            rating: ratingForm,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        toast.success(res.data.msg);
        setText("");
        setRatingForm(0);
        setFetchAgain(true);
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data.msg);
        setLoading(false);
      }
    } else {
      toast.warn("You need to login for adding comments");
      setLoading(false);
    }
  };

  const StarRating = () => {
    return (
      <>
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            onClick={() => handleClick(value)}
            style={{
              color: value <= ratingForm ? "gold" : "#d0cacc",
              border: "none",
              background: "none",
              fontSize: "30px",
              cursor: "pointer",
            }}
          >
            <IoStarSharp />
          </button>
        ))}
      </>
    );
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
                  <Link
                    to={"/tutor/" + user._id}
                    className="text-[#CEBBE7] underline"
                  >
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

      <div className="bg-white w-full py-[20px] px-[10px] md:pl-[105px] flex flex-col md:flex-row gap-3">
        <div className="w-full md:w-2/3 flex flex-col gap-3 p-[10px] border-[1px] border-gray-300">
          <h1 className="font-semibold text-[22px]">Add your feedback here</h1>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-3">
              <label>Rating</label>
              <div className="flex flex-row gap-2">
                <StarRating />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>Comments</label>
              <textarea
                className="w-full resize-none border-[2px] p-[10px]"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your comments here"
                rows={6}
              ></textarea>
            </div>
            <GlobalButton
              title={loading ? <PulseLoader color="#03043b" /> : "Add Comments"}
              click={submitQuestion}
              styleClass="bg-white border-[2px] cursor-pointer border-[#03043b] py-[10px] px-[30px] font-semibold mt-7"
            />
          </div>
        </div>
      </div>
      <div className="bg-white w-full py-[20px] px-[10px] md:pl-[105px] flex flex-col md:flex-row gap-3">
        <div className="w-full md:w-2/3 flex flex-col gap-3 p-[10px] border-[1px] border-gray-300">
          <h1 className="font-semibold text-[22px]">Feedbacks</h1>

          <div className="w-full flex flex-col md:flex-row justify-between flex-wrap">
            {feedback?.map((val) => {
              return (
                <>
                  <div
                    className="py-[30px] flex flex-col gap-7 w-full md:w-1/2 border-t-[1px]"
                    key={val._id}
                  >
                    <div className="flex flex-row gap-3 items-center">
                      <img
                        src={val?.added_by?.dp}
                        alt="dp"
                        className="w-[60px] rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-[18px]">
                          {val?.added_by?.firstName} {val?.added_by?.lastName}
                        </p>
                        <Rating rating={val?.rating} />
                      </div>
                    </div>
                    <div>
                      <p className="text-[15px] text-gray-500 text-justify">
                        {val?.text}
                      </p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCourse;
