import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { http } from "../../Axios/config";

const WishList = () => {
  const { token } = useSelector((s) => s.AuthReducer);
  const [wishlist, setWishlist] = useState([]);
  const [defaultData, setDefault] = useState([]);

  useEffect(() => {
    if (token) {
      const getWishlist = async () => {
        try {
          const res = await http.get("wishlist/get-wishlist-userId");
          setWishlist(res.data);
          setDefault(res.data);
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

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    if (searchTerm === "") {
      setWishlist(defaultData);
    } else {
      const filterArray = wishlist.filter((val) => {
        return (
          val.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          val.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          val.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          val.subject.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setWishlist(filterArray);
    }
  };

  const Items = ({currentItems})=>{
    return(
        <>
        
        </>
    )
  }


  return (
    <div className=" px-[10px] md:px-[40px] pt-[20px] md:pt-[50px] ">
      <h2 className="text-[22px] font-semibold pb-[10px] border-b-[3px] mb-[20px]">
        My WishList
      </h2>
      <div className="p-[10px]">
        <div className="md:mt-0 mt-[20px]">
          <input
            type="text"
            placeholder="Search your wishlist here..."
            className="bg-gray-200 w-full px-[10px] py-[12px] focus:outline-none rounded-[5px]"
            onChange={handleSearch}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Items currentItems={currentItems} />
        </div>
      </div>
    </div>
  );
};

export default WishList;
