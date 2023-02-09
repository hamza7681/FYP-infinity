import React, { useState, useEffect } from "react";
import CourseInput from "../../Reuseables/CourseInput";
import { http } from "../../Axios/config";

const AddCourse = () => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState("");
  const [titleDesc, setTitleDesc] = useState("");
  const [lang, setLang] = useState("");
  const [price, setPrice] = useState(0);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await http.get("/category/get-category");
        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <div className="w-full p-[20px]">
        <h1 className="text-[22px] font-semibold pb-[10px] border-b-[3px]">
          Add Course
        </h1>
        <div className="w-full flex flex-col md:flex-row md:p-[20px] pt-[30px] gap-6">
          <div className="flex flex-col md:w-1/2 gap-4">
            <CourseInput
              title="Course Title"
              type="text"
              titleStyle="text-purple-600 font-semibold text-[15px]"
              inputStyle="focus:outline-none border-[1px] py-[7px] px-[15px] rounded-[4px] border-gray-400"
              value={title}
              setState={setTitle}
            />
            <CourseInput
              title="Price"
              titleStyle="text-purple-600 font-semibold text-[15px]"
              inputStyle="focus:outline-none border-[1px] py-[7px] px-[15px] rounded-[4px] border-gray-400"
              type="number"
              value={price}
              setState={setPrice}
            />
            <div className="w-full">
              <label className="text-purple-600 font-semibold text-[15px]">
                Category
              </label>
              <select className="w-full focus:outline-none border-[1px] py-[7px] px-[15px] rounded-[4px] border-gray-400">
                <option>Select Category</option>
                {categories &&
                  categories.map((val) => {
                    return <option key={val._id}>{val.name}</option>;
                  })}
              </select>
            </div>
          </div>
          <div className="flex flex-col md:w-1/2 gap-6">
            <CourseInput
              title="Course Language"
              titleStyle="text-purple-600 font-semibold text-[15px]"
              value={lang}
              setState={setLang}
              type="text"
              inputStyle="focus:outline-none border-[1px] py-[7px] px-[15px] rounded-[4px] border-gray-400"
            />

            <CourseInput
              title="TItle Description"
              titleStyle="text-purple-600 font-semibold text-[15px]"
              textarea1={true}
              count={count}
              value={titleDesc}
              setState={setTitleDesc}
              setCount={setCount}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCourse;
