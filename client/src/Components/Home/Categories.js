import React from 'react';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { FiLayers } from 'react-icons/fi';
import { BsCameraVideoFill } from 'react-icons/bs';
import { MdOutlineChangeCircle } from 'react-icons/md';

const cardData = [
  {
    title: 'Expert Teacher',
    description: 'Develop skills for a career in various majors including computer.',
    icon: FaChalkboardTeacher,
  },
  {
    title: 'Self Development',
    description: 'Develop skills for a career in various majors including computer.',
    icon: FiLayers,
  },
  {
    title: 'Remote Learning',
    description: 'Develop skills for a career in various majors including language.',
    icon: BsCameraVideoFill,
  },
  {
    title: 'Life Time Support',
    description: 'Develop skills for a career in various majors including language.',
    icon: MdOutlineChangeCircle,
  },
];

const Categories = () => {
  return (
    <>
      <h2 className="font-bold text-[25px]">Our Features</h2>
      <div className="mx-10 flex lg:flex-row flex-col mt-7">
        {cardData.map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={index}
              className="lg:w-1/4 w-full h-56 bg-white shadow-2xl flex flex-col items-center rounded p-4 mb-4 lg:mr-4 lg:mb-0"
            >
              <Icon className="text-6xl w-full text-[#03043b] flex items-center justify-center mt-5 text-center" />
              <h2 className="text-xl font-bold flex text-center justify-center mt-3">{card.title}</h2>
              <p className="text-gray-700 flex text-center justify-center mt-3">{card.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Categories;
