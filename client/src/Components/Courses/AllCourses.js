import React, {useState} from 'react'
import Navbar from '../Navbar/index'
import Footer from '../Footer/Footer'
import Filters from './Filters'
import Courses from './Courses'

const AllCourses = () => {


  return (
    <>
     <Navbar/> 
     <div className='mx-20  w-auto flex lg:flex-row flex-col mt-10 gap-x-7'>
        <div className='lg:w-1/4 w-full'>
          <Filters/>
        </div>
        <div className='lg:w-3/4 w-full'>
             <Courses/>
        </div>
     </div>
     <Footer/>
    </>
  )
}

export default AllCourses;
