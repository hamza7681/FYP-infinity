import React from "react";
import { FiHeadphones } from 'react-icons/fi'
import {AiOutlineMail} from 'react-icons/ai'
import {GrLocation} from 'react-icons/gr'
import GlobalButton from "../../Reuseables/GlobalButton";
const Contact = () => {
  return (
    <>
     <div>
      <h2 className='text-blue font-bold mt-7 text-[30px] text-center'>Feel free to contact with us</h2>
       </div>
      <div className='flex lg:flex-row flex-col  w-auto  mx-20 mt-7'>
        <div className='lg:w-1/2 md:w-1/2 w-full'>
        <h2 className='text-blue font-bold mt-7 text-[30px] text-left'> Contact info</h2>
        <div className='flex flex-col'>
        <div className='mt-7 flex flex-row'><FiHeadphones className='p-3 rounded-full text-blue bg-yellow-400 w-14 h-14 mt-1'/>
        <h2 className='font-bold block text-[20px] ml-5 mt-3'>Call us</h2>
        </div>
        <div className='block ml-14'>+92 311 7110211</div>
        </div>

        <div className='flex flex-col'>
        <div className='mt-7 flex flex-row'><AiOutlineMail className='p-3 rounded-full text-blue bg-yellow-400 w-14 h-14 mt-1'/>
        <h2 className='font-bold block text-[20px] ml-5 mt-3'>Email us</h2>
        </div>
        <div className='block ml-14'>infinity.institude010@gmail.com</div>
        </div>  <div className='flex flex-col'>
        <div className='mt-7 flex flex-row'><GrLocation className='p-3 rounded-full text-blue bg-yellow-400 w-14 h-14 mt-1'/>
        <h2 className='font-bold block text-[20px] ml-5 mt-3'>Location</h2>
        </div>
        <div className='block ml-14'>University of Agriculture, Faisalabad, Pakistan</div>
        </div>        
        </div>
        <div className='lg:w-1/2 md:w-1/2 w-full'>
        <h2 className='text-blue font-bold mt-7 text-[30px] text-left'>Do you have any Questions?</h2>
        <form action='#' method='POST'>
          <div className='flex flex-col w-full mt-5'>
            <div className='flex lg:flex-row md:flex-row flex-col gap-x-3 lg:gap-y-0 md:gap-y-0 gap-y-3'>
            <input type='text' className='border border-solid border-black p-4 lg:w-1/2 md:w-1/2 w-full' autoComplete='off' placeholder='Name' name='name' required/>
              <input type='email' className='lg:w-1/2 md:w-1/2 w-full p-4 border-black border-solid border' autoComplete='off' placeholder='email' name='email' required/>
            </div>
            <div className='mt-5'>
            <textarea name='text' className='border border-solid border-black w-full' cols='' rows='6' placeholder='Your message' autoComplete='off' required></textarea>
            </div>
          </div>
          <GlobalButton
              title="Submit"
              styleClass="bg-white border-[2px] cursor-pointer hover:bg-black hover:text-white border-black py-[10px] px-[30px] font-semibold mt-7"
            />
            </form>
        </div>
       </div>
       <div className="mt-10 mb-0">
       <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.5048558810436!2d73.07093244945777!3d31.42776548555192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3922421d9937f131%3A0x129b74d67c73a16d!2sUniversity%20of%20Agriculture%20-%20UAF!5e0!3m2!1sen!2s!4v1682018614582!5m2!1sen!2s"
        width="100%" height="450" style={{border:0}}  allowfullscreen="" loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade"></iframe> 
        </div>
    </>
  );
};

export default Contact;
