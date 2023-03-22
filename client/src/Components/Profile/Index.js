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
      <Navbar />
      <nav className="flex flex-row ml-5 gap-7 mt-10 shadow-md pb-[10px]">
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
      </nav>
      {currentPage}
      <Footer />
    </>
  );
}

export default Index;
