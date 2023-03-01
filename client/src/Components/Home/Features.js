import React from 'react'
import {AiOutlineClockCircle} from 'react-icons/ai'
import {BsChatLeftText} from 'react-icons/bs'
import {GrPersonalComputer} from  'react-icons/gr'
import {FiUser} from 'react-icons/fi'
const feature  = [
    {
        icon: <FiUser />,
        heading: "Expert Istructors",
        text: "You can access your course when you want",
    },
    {
        icon: <GrPersonalComputer />,
        heading: "50+ Courses",
        text: "You can access your course when you want",
    },
    {
        icon: <AiOutlineClockCircle />,
        heading: "life time access",
        text: "You can access your course when you want",
    },
    {
        icon: <BsChatLeftText />,
        heading: "Access to Chatox",
        text: "You can access your course when you want",
    },
];
const Features = () => {
  return (
    <>
    <div className="py-[10px] px-[25px] mt-3">
        <h2 className="font-bold text-[25px] ">Features</h2>
        <div className='flex flex-col md:flex-row gap-3 py-[15px] mx-[5px] px-[50px]'>

            {feature.map((val, index) => {
                return(
                    <>
                        <div className='w-full md:w-1/4 flex flex-row border-black border rounded-md py-[10px] px-[5px] '>
                            <div className='w-1/5 text-[50px] flex items-center'>{val.icon}</div>
                            <div className='w-4/5'>
                                <h2 className='font-bold'>{val.heading}</h2>
                                <p>{val.text}</p>
                            </div>
                        </div>
                    </>
                )
            })}
            </div>
        </div>
    </>
  )
}

export default Features