import React from 'react'
import Courses from './Courses';
import Payment from './Payment';
const index = () => {
  
  return (
    <>
      <div className='w-full  flex flex-col md:flex-row '>
        <div className='md:w-[70%]'>
            <Courses />
        </div>
        <div className='md:w-[30%] h-auto'>
            <Payment />
        </div>
      </div>
       
    </>
  );
};

export default index;