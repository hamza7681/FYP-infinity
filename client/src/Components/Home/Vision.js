import React from 'react'
import pic from "../../Assets/onlinelearning.png";
const Vision = () => {
  return (
    <>
        <div className='py-[10px] px-[25px] mt-3'>
            <h2 className='text-[25px] font-bold'>Our Vision</h2>
            <div className='flex flex-col md:flex-row'>
                <div className='w-full md:w-1/2'>
                <p className='w-full py-[5px] text-[20px]'>
                    Our vision is to provide education irrespective of boundries. Our vision is to provide an accessible, flexible, and high-quality education to students of all ages and backgrounds, regardless of their location or schedule.Our goal is  to provide wider range of courses at one plateform
                </p>
                </div>
                <div className='md:w-1/2 justify-center hidden sm:block'>
                <img src={pic} alt='pic' className='w-[70%]'/>
                </div>
            </div>
        </div>
    </>
  )
}

export default Vision