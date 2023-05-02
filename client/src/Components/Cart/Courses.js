import React from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import FormattedPrice from "../../Reuseables/FormattedPrice";

const Courses = () => {
  const { cartItems, totalPrice } = useSelector((s) => s.CourseReducer);
  const dispatch = useDispatch();

  return (
    <>
      <div className="w-full flex justify-center  items-center relative">
        <div className="w-full px-[10px] md:px-[40px] pt-[20px] md:pt-[50px]  flex flex-col relative ">
          {cartItems.length === 0 ? (
            <p>Your cart is empty!</p>
          ) : (
            <>
              <div className="flex flex-col h-[350px] md:h-[500px] overflow-y-scroll scrollbar-hidden pt-[30px] ">
                <div className="flex flex-row border-b-2 pb-[10px]">
                  <div className="w-1/5  font-bold text-[12px] md:text-[16px]">
                    Image
                  </div>
                  <div className="w-1/5 font-bold text-[12px] md:text-[16px]">
                    Title
                  </div>
                  <div className="w-1/5 font-bold text-[12px] md:text-[16px]">
                    Author
                  </div>
                  <div className="w-1/5 font-bold text-[12px] md:text-[16px]">
                    Price
                  </div>
                  <div className="w-1/5 font-bold text-[12px] md:text-[16px]">
                    Remove
                  </div>
                </div>
                {cartItems.map((val) => {
                  return (
                    <>
                      <div
                        key={val._id}
                        className="flex flex-row items-center border-b-2 gap-2"
                      >
                        <div className="w-1/5 py-[10px] border-b-2">
                          <img
                            src={val.image}
                            alt="Course pic"
                            className="h-[70%] rounded-md"
                          />
                        </div>
                        <div className="w-1/5 text-[12px] md:text-[16px]">
                          {val.title}
                        </div>
                        <div className="w-1/5 text-[12px] md:text-[16px]">
                          {val.created_by.firstName} {val.created_by.lastName}
                        </div>
                        <div className="w-1/5 text-[12px] md:text-[16px]">
                          <FormattedPrice price={val.price} />
                        </div>
                        <div className="w-1/5 text-[12px] md:text-[16px]">
                          <div
                            className="bg-red-600 w-fit p-[7px] rounded-[4px] cursor-pointer"
                            onClick={() => {
                              dispatch({
                                type: "REMOVE_FROM_CART",
                                payload: val,
                              });
                            }}
                          >
                            <FaTrash className="text-white" />
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
              <div className="border-b-[2px] border-b-gray-500 mt-[20px]"></div>
              <div className="flex flex-row justify-between py-[20px]">
                <div className="flex flex-col gap-2">
                  <p className="text-[16px] md:text-[22px] text-gray-600">
                    Total Courses
                  </p>
                  <p className="text-[16px] md:text-[22px] text-gray-600">
                    Total Price
                  </p>
                </div>
                <div className="flex flex-col gap-2 ">
                  <p className="text-[16px] md:text-[22px] text-gray-600 text-right">
                    {cartItems.length}
                  </p>
                  <p className="text-[16px] md:text-[22px] text-gray-600 text-right">
                    <FormattedPrice price={totalPrice} />
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Courses;
