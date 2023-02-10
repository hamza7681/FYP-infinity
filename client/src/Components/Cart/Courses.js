import React from 'react'
import GlobalButton from '../../Reuseables/GlobalButton';
import {AiOutlineArrowLeft} from "react-icons/ai";
import pic from "../../Assets/course.jpg"
const courses=[
  {
    image: "Image",
    title: "React",
    author: "Smith",
    price: "$300",
  },
  {
    image: "pic",
    title: "JavaScript",
    author: "Joe Dev",
    price: "$500",
  },
  {
    image: "pic",
    title: "CSS",
    author: "Joe Dev",
    price: "$300",
  },
  {
    image: "pic",
    title: "Node JS",
    author: "Smith",
    price: "$1000",
  },
]
const Courses = () => {
  return (
    <>
      <div className='w-full flex justify-center h-screen items-center relative'>
        <div className='w-[80%] h-[80%]  flex flex-col relative '>
          <div className='h-[5%]'>
            <h2 className='text-[24px]'>Courses Details</h2>
          </div><br/>
          <div className='flex flex-col md:h-[500px] overflow-y-scroll scrollbar-hidden '>
            <div className='flex flex-row border-b-2'>
              <div className='w-1/4  font-bold'>Image</div>
              <div className='w-1/4 font-bold'>Title</div>
              <div className='w-1/4 font-bold'>Author</div>
              <div className='w-1/4 font-bold'>Price</div>
            </div>
            {courses.map((val, index) =>{
            return(
              <>
              <div className='flex flex-row items-center border-b-2'>
                <div className='w-1/4 p-[10px] border-b-2'>
                  <img
                    src={pic}
                    alt='Course pic'
                    className='h-[70%] rounded-md'
                  />
                </div>
                <div className='w-1/4'>
                  {val.title}
                </div>
                <div className='w-1/4'>
                  {val.author}
                </div>
                <div className='w-1/4 '>
                  {val.price}
                </div>
              </div>
              </>
            )
            })}
          </div><br/>
            <div className=" py-[7px] w-1/2 flex flex-row items-center bg-[#f5822a]  h-[10%]">
                <AiOutlineArrowLeft className="text-[28px]" />
                <GlobalButton
                click='Continue'
                title='Back to Courses'
                styleClass='bg-[#f5822a] w-full text-white rounded-[3px]'
              />
            </div>
              
            </div>
            </div>   
    </>
  )
}

export default Courses;