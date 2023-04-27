import { useState, useEffect } from "react";
import {
  FaUser,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaBuilding,
} from "react-icons/fa";

const CounterUp = () => {
  const [counters, setCounters] = useState([
    { icon: <FaUser className="text-white" />, count: 0, text: "Students" },
    {
      icon: <FaChalkboardTeacher className="text-white" />,
      count: 0,
      text: "Tutors",
    },
    {
      icon: <FaBuilding className="text-white" />,
      count: 0,
      text: "Languages",
    },
    {
      icon: <FaGraduationCap className="text-white" />,
      count: 0,
      text: "Courses",
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounters((prevCounters) =>
        prevCounters.map((counter) => ({
          ...counter,
          count:
            counter.count < getMaxCount(counter.text)
              ? counter.count + 1
              : counter.count,
        }))
      );
    }, 10);

    return () => clearInterval(interval);
  }, []);

  const getMaxCount = (text) => {
    switch (text) {
      case "Students":
        return 1000;
      case "Tutors":
        return 700;
      case "Languages":
        return 3;
      case "Courses":
        return 500;
      default:
        return 0;
    }
  };

  return (
    <div className="flex lg:flex-row w-full flex-col  lg:72 h-auto justify-center mt-20 mb-20 bg-[#03043b]">
      <div className="mx-20 w-auto gap-x-44 flex lg:flex-row flex-col lg:h-72 h-auto  justify-center items-center">
        {counters.map((counter, index) => (
          <div
            key={index}
            className="flex flex-col font-bold text-[40px] text-yellow items-center mx-4"
          >
            {counter.icon}
            <p className="text-[30px] text-white font-bold">{counter.count}</p>
            <p className="text-gray-300 font-bold text-[25px]">
              {counter.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CounterUp;
