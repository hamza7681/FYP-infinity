import React from 'react'
import Courses from './Courses';
import Payment from './Payment';
const index = () => {
  return (
    <>
      <div className='w-full h-full flex flex-col md:flex-row '>
        <div className='md:w-[65%]'>
            <Courses />
        </div>
        <div className='md:w-[35%]'>
            <Payment />
        </div>
      </div>
       
    </>
  );
};

export default index;