import React from "react";
import {
  AiOutlineCopyrightCircle,
  AiOutlineInstagram,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-[#03043b] to-[#35050c] text-white flex flex-col md:w-full border-bl-2 px-[10px] pt-[20px] rounded-tl-[70px] mt-[30px]">
      <div className="flex flex-col md:flex-row w-full py-[10px] px-[30px] border-b-2">
        <div className="flex flex-col w-full md:flex-row md:w-1/2">
          <div className="md:w-1/2">
            <h2 className="text-[20px] font-bold py-[5px] hover:underline">
              Infinity
            </h2>
            <p className="py-[5px]">
              INFINITY is a website which will make students to enhance their
              skills.
            </p>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-[20px] font-bold py-[5px] hover:underline">
              Contact Us
            </h2>
            <p className="py-[5px]">
              INFINITY is a website which will make students to enhance their
              skills
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full md:flex-row md:w-1/2">
          <div className="w-full md:w-1/2">
            <h2 className="text-[20px] font-bold py-[5px] hover:underline">
              Quick Links
            </h2>
            <div className="flex flex-col md:flex-row gap-5">
              <div className="flex flex-col">
                <p>Home</p>
                <p>Courses</p>
                <p>Chat Page</p>
                <p>Add to card</p>
              </div>
            </div>
          </div>

          <div className="w-full  md:w-1/2">
            <h2 className="text-[20px] font-bold py-[5px] hover:underline">
              About Us
            </h2>
            <p>
              INFINITY is a website which will help you in making yourself
              skillful by leaning different skills online.
            </p>
            <div className="flex flex-row px-[10px] py-[20px] justify-center space-x-8 ">
              <BsFacebook className="text-[25px]" />
              <AiOutlineInstagram className="text-[25px]" />
              <FaTwitter className="text-[25px]" />
              <AiOutlineWhatsApp className="text-[25px]" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-center py-[10px]">
        <p>Infinity Institute 2023</p>
        <AiOutlineCopyrightCircle className="text-[20px] ml-[2px]" />
        <p>-All rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
