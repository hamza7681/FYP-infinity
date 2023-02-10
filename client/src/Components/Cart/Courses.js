import React from "react";
import { FaTrash } from "react-icons/fa";
import pic from "../../Assets/course.jpg";
const courses = [
  {
    image: "Image",
    title: "React",
    author: "Smith",
    price: "$300",
  },
  {
    image: "pic",
    title: "JavaScript",
    author: "Joe Dev",
    price: "$500",
  },
  {
    image: "pic",
    title: "CSS",
    author: "Joe Dev",
    price: "$300",
  },
  {
    image: "pic",
    title: "Node JS",
    author: "Smith",
    price: "$1000",
  },
  {
    image: "pic",
    title: "CSS",
    author: "Joe Dev",
    price: "$300",
  },
  {
    image: "pic",
    title: "Node JS",
    author: "Smith",
    price: "$1000",
  },
];
const Courses = () => {
  return (
    <>
      <div className="w-full flex justify-center  items-center relative">
        <div className="w-full px-[10px] md:px-[40px] pt-[20px] md:pt-[50px]  flex flex-col relative ">
          <h2 className="text-[22px] font-semibold pb-[10px] border-b-[3px] mb-[20px]">Cart</h2>

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
            {courses.map((val, index) => {
              return (
                <>
                  <div className="flex flex-row items-center border-b-2 gap-2">
                    <div className="w-1/5 py-[10px] border-b-2">
                      <img
                        src={pic}
                        alt="Course pic"
                        className="h-[70%] rounded-md"
                      />
                    </div>
                    <div className="w-1/5 text-[12px] md:text-[16px]">
                      {val.title}
                    </div>
                    <div className="w-1/5 text-[12px] md:text-[16px]">
                      {val.author}
                    </div>
                    <div className="w-1/5 text-[12px] md:text-[16px]">
                      {val.price}
                    </div>
                    <div className="w-1/5 text-[12px] md:text-[16px]">
                      <div className="bg-red-600 w-fit p-[7px] rounded-[4px]">
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
              <p className="text-[16px] md:text-[22px] text-gray-600">Total Courses</p>
              <p className="text-[16px] md:text-[22px] text-gray-600">Total Price</p>
            </div>
            <div className="flex flex-col gap-2 ">
              <p className="text-[16px] md:text-[22px] text-gray-600 text-right">
                {courses.length}
              </p>
              <p className="text-[16px] md:text-[22px] text-gray-600 text-right">PKR 10,000</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;
