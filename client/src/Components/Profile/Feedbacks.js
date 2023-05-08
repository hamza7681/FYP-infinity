import React, { useEffect, useState } from "react";
import { http } from "../../Axios/config";
import Rating from "../../Reuseables/Rating";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

const Feedbacks = () => {
  const [feedback, setFeedback] = useState([]);
  const { user } = useSelector((s) => s.AuthReducer);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getFeedback = async () => {
      try {
        const res = await http.get("/feedback/get-feedback-user/" + user._id);
        setFeedback(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getFeedback();
  }, [user._id]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center py-[30px]">
          <ClipLoader color="#000000" />
        </div>
      ) : (
        <div className="w-full flex flex-col md:flex-row justify-between flex-wrap px-[30px]">
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
      )}
    </>
  );
};

export default Feedbacks;
