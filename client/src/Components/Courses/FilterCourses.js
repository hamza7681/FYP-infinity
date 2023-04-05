import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import FormattedPrice from "../../Reuseables/FormattedPrice";
import { useNavigate } from "react-router-dom";

const FilterCourses = ({ courses, inputFiltered, show1 }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = courses?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(courses?.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % courses?.length;
    setItemOffset(newOffset);
  };

  const Items = ({ currentItems }) => {

    return (
      <>
        {show1 ? (
          <>
            {inputFiltered.length === 0 ? (
              <>
                <p>No courses found!</p>
              </>
            ) : (
              <>
                {inputFiltered.map((val) => {
                  return (
                    <>
                      <div
                        className="w-full md:w-[280px] border-[1px] rounded-[5px] border-gray-200 shadow-xl"
                        key={val._id}
                      >
                        <img
                          src={val.image}
                          alt="tutor pic"
                          className="w-full h-[150px]"
                        />
                        <div className="px-[15px] py-[10px] h-[150px]">
                          <h1 className="text-[20px] font-semibold">
                            {val.title}
                          </h1>
                          <p className="text-[16px] mt-[20px] text-gray-500">
                            <FormattedPrice price={val.price} />
                          </p>
                        </div>
                        <div className="flex flex-row justify-start w-full items-center">
                          <div className="w-1/2 flex flex-row justify-center items-center gap-2 py-[10px] cursor-pointer border-t-[1px] border-r-[1px] border-t-gray-300 border-r-gray-300">
                            {/* <AiOutlineEye /> */}
                            {/* {courses.map((val) =>{
                              <span>
                                <button 
                                key={val._id}
                                onClick={() => console.log("hello")}>View</button></span>

                            }
                           ) } */}
                            {FilterCourses.map((val) => {
                              return (
                                <span>
                                  <button
                                    key={val._id}
                                    onClick={() => console.log("hello")}
                                  >
                                    View
                                  </button>
                                </span>
                              );
                            })}

                          </div>
                          <div className="w-1/2 flex flex-row justify-center items-center gap-2 py-[10px] cursor-pointer border-t-[1px] border-l-[1px] border-t-gray-300 border-l-gray-300">
                            Follow
                          </div>
                        </div>
                      </div>
                    </>

                  );
                })}
              </>
            )}
          </>
        ) : (
          <>
            {currentItems.length === 0 ? (
              <>
                <p>No Courses found!</p>
              </>
            ) : (
              <>
                {currentItems &&
                  currentItems.map((val) => {
                    return (
                      <>
                        <div
                          className="w-full md:w-[280px] border-[1px] rounded-[5px] border-gray-200 shadow-xl"
                          key={val._id}
                        >
                          <img
                            src={val.image}
                            alt="tutor pic"
                            className="w-full h-[150px]"
                          />
                          <div className="px-[15px] py-[10px] h-[150px]">
                            <h1 className="text-[20px] font-semibold">
                              {val.title}
                            </h1>
                            <p className="text-[16px] mt-[20px] text-gray-500">
                              <FormattedPrice price={val.price} />
                            </p>
                          </div>
                          <div className="flex flex-row justify-start w-full items-center">
                            <div className="w-1/2 flex flex-row justify-center items-center gap-2 py-[10px] cursor-pointer border-t-[1px] border-r-[1px] border-t-gray-300 border-r-gray-300">
                              {/* <AiOutlineEye /> */}
                              <span><button>View</button></span>
                            </div>
                            <div className="w-1/2 flex flex-row justify-center items-center gap-2 py-[10px] cursor-pointer border-t-[1px] border-l-[1px] border-t-gray-300 border-l-gray-300">
                              Follow
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </>
            )}
          </>
        )}
      </>
    );
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center md:flex-row w-full my-[20px] gap-2 flex-wrap">
        <Items currentItems={currentItems} />
      </div>
      {show1 ? (
        ""
      ) : (
        <div className="w-full flex justify-center items-center mt-[100px]">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< Previous"
            renderOnZeroPageCount={null}
            activeClassName="w-[25px] h-[25px]  bg-gray-500 w-fit text-white rounded-full"
            containerClassName="flex flex-row items-center gap-3  w-full justify-center py-[6px] rounded-full bg-gray-200"
            pageClassName="w-[25px] h-[25px] flex justify-center items-center rounded-full font-semibold"
            previousClassName="text-[#292a77] font-semibold"
            nextClassName="text-[#292a77] font-semibold"
            disabledClassName="text-gray-300 font-normal"
          />
        </div>
      )}
    </>
  );
};

export default FilterCourses;
