import React from 'react'
import Courses from './Courses';
import Payment from './Payment';
const index = () => {
  return (
    <>
      <div className='w-full h-full flex flex-row '>
        <div className='md:w-[70%]'>
            <Courses />
        </div>
        <div className='md:w-[30%]'>
            <Payment />
        </div>
      </div>
       
    </>
  );
};

export default index;