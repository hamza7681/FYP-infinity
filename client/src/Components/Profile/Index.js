import React, { useState } from "react";
import Profile from "./Profile";
import Settings from "./Settings";
import Footer from "../Footer/Footer";
 import Navbar from "../Navbar/index";
import Whistlist from './Whishlist'
function Index({ user }) {
  const [pageIndex, setPageIndex] = useState(0);

  const pages = [<Profile user={user && user}/>, <Settings user={user && user}/>, <Whistlist/>];

  const handlePageChange = (index) => {
    setPageIndex(index);
  };

  let currentPage = pages[pageIndex];

  return (
    <>
    <div>
  {pageIndex === 0 || pageIndex === 1 ? <Navbar /> : null}
</div>
      <div className="flex flex-row ml-5 gap-7 shadow-md py-10">
        <p
          className={`border-b-[2px] ${
            pageIndex === 0 ? "border-black" : "border-white"
          } hover:border-b-[2px] font-semibold text-[20px] cursor-pointer`}
          onClick={() => handlePageChange(0)}
        >
          Profile
        </p>
        <p
          className={`border-b-[2px] ${
            pageIndex === 1 ? "border-black" : "border-white"
          } hover:border-b-[2px] font-semibold text-[20px] cursor-pointer`}
          onClick={() => handlePageChange(1)}
        >
          Settings
        </p>
        <p
          className={`border-b-[2px] ${
            pageIndex === 2 ? "border-black" : "border-white"
          } hover:border-b-[2px] font-semibold text-[20px] cursor-pointer`}
          onClick={() => handlePageChange(2)}
        >
          Whishlist
        </p>
      </div>
      {currentPage}
      <div>
      {pageIndex === 0 || pageIndex === 1 ? <Footer /> : null}
    </div>      
    </>
  );
}

export default Index;
