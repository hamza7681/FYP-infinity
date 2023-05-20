import React from "react";
import pic from "../../Assets/onlinelearning.jpg";
import { motion } from "framer-motion";
import { picAnimate } from "../../Animations";
import logo from "../../Assets/about.jpg";
import BreadCrumbs from "../../Reuseables/BreadCrumbs";
import Categories from "./Categories";
import { Link } from "react-router-dom";
import Image from "./Image";
const About = () => {
  return (
    <>
      <div>
        <BreadCrumbs
          parent="Home"
          parentPath="/"
          active="About Us"
          image={logo}
          pageName="About us"
        />
        <div className="flex lg:flex-row flex-col px-[20px] md:px-16 py-[40px] w-auto gap-x-40 mt-8 items-center">
          <div className="lg:w-2/4 md:w-2/4 w-full flex flex-col gap-4 ">
            <h2 className="text-[25px] font-bold">Our Vision</h2>
            <p className="w-full py-[5px] text-[15px] text-justify">
              Our vision is to provide education irrespective of boundries. Our
              vision is to provide an accessible, flexible, and high-quality
              education to students of all ages and backgrounds, regardless of
              their location or schedule. Our goal is to provide wider range of
              courses at one platform.
            </p>
            <p className="w-full py-[5px] text-[15px] text-justify">
              The courses are tailored to suit learners' needs, whether they are
              beginners or advanced learners. The website offers a wide range of
              courses in each language, covering different aspects of language
              learning, including game development, web development, IOT and lot
              more. The courses are delivered in a variety of formats, including
              video lectures, interactive exercises, and quizzes, which make
              learning engaging and enjoyable. They can access the courses
              anytime, anywhere, and on any device, making learning flexible and
              convenient.
            </p>
          </div>
          <div className="lg:w-2/4 w-full">
            <motion.img
              variants={picAnimate}
              initial="hidden"
              whileInView="show"
              src={pic}
              alt="pic"
              className="rounded-lg h-full"
            />
          </div>
        </div>
      </div>
      <Categories />
      <Image />
      <div className="w-full mt-5">
        <h2 className="flex text-center justify-center text-[30px] font-bold">
          Become an Instructor Today
        </h2>
        <p className="flex text-center justify-center mt-3">
          Join one of the world’s largest online learning marketplaces. Our
          Instructor
        </p>
        <p className="flex text-center justify-center">
          Support Team is ready to help you while our Teaching Center.
        </p>
        <div class="flex justify-center mt-4">
          <Link to="/switch-account">
            <button class="bg-[#03043b] text-white p-4 rounded">
              Get started now!
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default About;
