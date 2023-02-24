import React, { useEffect, useState } from "react";
import pic from "../../Assets/user-logo.jpg";
import { AiOutlineEye } from "react-icons/ai";
import { FiUserMinus, FiUserPlus } from "react-icons/fi";
import { http } from "../../Axios/config";
import ReactPaginate from "react-paginate";

const Items = ({ currentItems }) => {
  return (
    <>
      {currentItems.length === 0 ? (
        <>
          <p>No Tutors found!</p>
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
                    <img src={pic} alt="tutor pic" className="w-full" />
                    <div className="px-[15px] py-[10px]">
                      <h1 className="text-[22px] font-semibold">
                        {val.firstName} {val.lastName}
                      </h1>
                      <p className="text-[16px] text-gray-500">{val.subject}</p>
                    </div>
                    <div className="flex flex-row justify-start w-full items-center">
                      <div className="w-1/2 flex flex-row justify-center items-center gap-2 py-[10px] cursor-pointer border-t-[1px] border-r-[1px] border-t-gray-300 border-r-gray-300">
                        <AiOutlineEye />
                        <span>View</span>
                      </div>
                      <div className="w-1/2 flex flex-row justify-center items-center gap-2 py-[10px] cursor-pointer border-t-[1px] border-l-[1px] border-t-gray-300 border-l-gray-300">
                        <FiUserPlus />
                        <span>Follow</span>
                      </div>
                      {/* <div  className="w-1/2 flex flex-row justify-center items-center gap-2 py-[10px] cursor-pointer border-t-[1px] border-l-[1px] border-t-gray-300 border-l-gray-300">
                    <FiUserMinus />
                    <span>Unfollow</span>
                  </div> */}
                    </div>
                  </div>
                </>
              );
            })}
        </>
      )}
    </>
  );
};

const Tutors = () => {
  const [tutors, setTutors] = useState([]);
  const [defaultData, setDefault] = useState([]);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await http.get("/auth/get-tutors");
        setTutors(res.data);
        setDefault(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTutors();
  }, []);

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = tutors?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(tutors?.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % tutors?.length;
    setItemOffset(newOffset);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    if (searchTerm === "") {
      setTutors(defaultData);
    } else {
      const filterArray = tutors.filter((val) => {
        return (
          val.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          val.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          val.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          val.subject.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setTutors(filterArray);
    }
  };

  return (
    <>
      <div className="w-full p-[10px] md:p-[30px]">
        <div className="w-full border-b-[3px] pb-[10px]">
          <h1 className="text-[24px] font-semibold">Tutors</h1>
        </div>
        <div className="w-full flex flex-col md:flex-row mt-[30px]">
          <div className="w-full md:w-[30%] flex justify-center items-center md:border-r-gray-400 md:border-r-[1px]">
            <div className="flex flex-col justify-center items-center bg-gray-200 p-[50px] rounded-[5px] shadow-lg">
              <p className="text-[28px] font-semibold text-[#292a77]">
                Total Tutors
              </p>
              <p className="text-[28px] font-semibold text-[#292a77]">{tutors?.length}</p>
            </div>
          </div>
          <div className="w-full md:w-[70%] px-[10px]">
            <div className="md:mt-0 mt-[20px]">
              <input
                type="text"
                placeholder="Search tutors here..."
                className="bg-gray-200 w-full px-[10px] py-[15px] focus:outline-none rounded-[5px]"
                onChange={handleSearch}
              />
            </div>
            <div className="flex flex-col justify-center items-center md:flex-row w-full my-[20px] gap-2 flex-wrap">
              <Items currentItems={currentItems} />
            </div>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Tutors;
