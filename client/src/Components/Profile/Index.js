import React, { useState } from 'react';
import Profile from './Profile';
// import Courses from './My_Courses';
import Settings from './Settings';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/index'
function Index () {
  const [pageIndex, setPageIndex] = useState(0);

  const pages = [
    <Profile />,
    // <Courses />,
    <Settings />,
  ];

  const handlePageChange = (index) => {
    setPageIndex(index);
  };

  let currentPage = pages[pageIndex];

  return (
    <>
    <Navbar/>
      <nav className='flex flex-row ml-5 gap-7 mt-10 shadow-md'>
        <button className='hover:border-b border-black font-bold text-[20px]' onClick={() => handlePageChange(0)}>Profile</button>
        {/* <button className='hover:border-b border-black font-bold text-[20px]' onClick={() => handlePageChange(1)}>My-Courses</button> */}
        <button className='hover:border-b border-black font-bold text-[20px]' onClick={() => handlePageChange(2)}>Settings</button>
      </nav>
      {currentPage}
      <Footer/>
    </>
  );
}

export default Index;
