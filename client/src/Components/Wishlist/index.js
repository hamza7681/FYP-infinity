import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { http } from "../../Axios/config";
import FormattedPrice from "../../Reuseables/FormattedPrice";
import { BsCart3, BsFillHeartFill } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import BreadCrumbs from "../../Reuseables/BreadCrumbs";
import logo from "../../Assets/wishlist.jpg";

const WishList = () => {
  const { token } = useSelector((s) => s.AuthReducer);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (token) {
      const getWishlist = async () => {
        try {
          const res = await http.get("/wishlist/get-wishlist-userId", {
            headers: { Authorization: token },
          });
          setWishlist(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      getWishlist();
    }
  }, [token]);

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = wishlist?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(wishlist?.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % wishlist?.length;
    setItemOffset(newOffset);
  };

  const Items = ({ currentItems }) => {
    return (
      <>
        {currentItems.length === 0 ? (
          <>
            <p>No wishlist found!</p>
          </>
        ) : (
          <>
            {currentItems &&
              currentItems.map((val) => {
                return (
                  <>
                    <div
                      key={val._id}
                      className="flex gap-3 md:gap-0 flex-col md:flex-row md:items-center justify-between border-b-[3px] pb-[10px]"
                    >
                      <img
                        src={val.course.image}
                        alt="image_course"
                        className="w-full md:w-[150px] rounded-[7px]"
                      />
                      <p>{val.course.title}</p>
                      <p>
                        <FormattedPrice price={val.course.price} />
                      </p>
                      <div className="flex flex-col gap-3">
                        <div className="bg-[#33040D] rounded-[4px] px-[20px] py-[7px] flex flex-row justify-center items-center gap-3">
                          <BsFillHeartFill className="text-red-500 text-[20px]" />
                          <span className="text-white text-[14px]">Remove</span>
                        </div>
                        <div className="bg-[#03043A] rounded-[4px] px-[20px] py-[7px] flex flex-row justify-center items-center gap-3">
                          <BsCart3 className="text-white text-[20px]" />
                          <span className="text-white text-[14px]">
                            Add to Cart
                          </span>
                        </div>
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

  return (
    <>
      <BreadCrumbs
        parent="Home"
        parentPath="/"
        active="Wishlist"
        image={logo}
        pageName="Your Courses Wishlist"
      />
      <div className=" px-[10px] md:px-[40px] pt-[20px] md:pt-[50px] ">
        <div className="p-[10px]">
          <div className="flex flex-col gap-4 py-[20px] px-[40px] border-[2px] my-[20px]">
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
    </>
  );
};

export default WishList;
