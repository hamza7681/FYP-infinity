import React from 'react';
import {FcReadingEbook, FcOnlineSupport, FcMoneyTransfer} from "react-icons/fc"
const cardData = [
  {
    title: 'Learn Remotely',
    description: 'Expand your skills and learn from the comfort of your home with unlimited number of courses.',
    icon: FcReadingEbook,
  },
  {
    title: 'Teach on Infinity',
    description: 'Teach from anywhere the world to all over the world to remote audiance.',
    icon: FcOnlineSupport,
  },
  {
    title: 'Mutli Role login system',
    description: 'Single account can be used as student and teacher user can learn and earn with same account',
    icon: FcMoneyTransfer,
  },
];

const Categories = () => {
  return (
    <div className="mx-10 flex lg:flex-row flex-col mt-7">
      {cardData.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className="lg:w-1/3 w-full h-56 bg-white shadow-2xl flex flex-col items-center rounded p-4 mb-4 lg:mr-4 lg:mb-0"
          >
            <Icon className="text-6xl w-full flex items-center justify-center mt-5 text-center"/>
            <h2 className="text-xl font-bold flex text-center justify-center mt-3">{card.title}</h2>
            <p className="text-gray-700 flex text-center justify-center mt-3">{card.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Categories;
