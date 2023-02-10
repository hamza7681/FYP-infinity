import React, { useState, useEffect } from "react";
import CourseInput from "../../Reuseables/CourseInput";
import { http } from "../../Axios/config";
import { TbCameraPlus } from "react-icons/tb";
import { FaTimes } from "react-icons/fa";
import PulseLoader from "react-spinners/PulseLoader";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AddCourse = () => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState("");
  const [titleDesc, setTitleDesc] = useState("");
  const [lang, setLang] = useState("");
  const [price, setPrice] = useState(0);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, token } = useSelector((s) => s.AuthReducer);

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

  const handleImage = (event) => {
    const file = event.target.files[0];
    setImgFile(file);
    const reader = new FileReader();

    reader.onload = (e) => {
      setImg(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const add = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: title,
        title_desc: titleDesc,
        language: lang,
        price: Number(price),
        category: category,
        description: description,
        image: imgFile,
        created_by: user._id,
      })
    );
    formData.append("image", imgFile);
    try {
      const res = await http.post("/course/add-course", formData, {
        headers: { Authorization: token },
      });
      toast.success(res.data.msg);
      setTitle("");
      setTitleDesc("");
      setLang("");
      setPrice(0);
      setCategory("");
      setDescription("");
      setImgFile(null);
      setImg(null)
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.msg);
      setLoading(false);
    }
  };

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
              <select
                className="w-full focus:outline-none border-[1px] py-[7px] px-[15px] rounded-[4px] border-gray-400"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Select Category</option>
                {categories &&
                  categories.map((val) => {
                    return (
                      <option key={val._id} value={val.name}>
                        {val.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <CourseInput
              title="Course Description"
              titleStyle="text-purple-600 font-semibold text-[15px]"
              textarea2={true}
              value={description}
              setState={setDescription}
            />
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
              title="Title Description"
              titleStyle="text-purple-600 font-semibold text-[15px]"
              textarea1={true}
              count={count}
              value={titleDesc}
              setState={setTitleDesc}
              setCount={setCount}
            />

            <div>
              <label className="text-purple-600 font-semibold text-[15px]">
                Course Image
              </label>
              <div className="border-[1px] flex justify-center items-center rounded-[4px] border-gray-400 h-[340px] p-[30px]">
                {img === null ? (
                  <label
                    className="flex flex-col items-center justify-center bg-gray-200 p-[10px] rounded-[10px] cursor-pointer"
                    htmlFor="pic"
                  >
                    <TbCameraPlus className="text-[42px] text-gray-400" />
                    <p className="text-[26px] text-gray-400">Add Image</p>
                  </label>
                ) : (
                  <div className="relative">
                    <img src={img} alt="pic" className="h-[300px]" />
                    <div
                      className="absolute flex justify-center items-center bg-white p-[4px] top-[10px] right-[10px] rounded-full cursor-pointer"
                      onClick={() => {
                        setImgFile(null);
                        setImg(null);
                      }}
                    >
                      <FaTimes />
                    </div>
                  </div>
                )}
                <input
                  className="hidden"
                  id="pic"
                  type="file"
                  onChange={handleImage}
                />
              </div>
            </div>
          </div>
        </div>
        <button
          className="md:ml-[20px] bg-purple-600 text-white py-[10px] px-[30px] rounded-[3px] md:w-fit w-full my-[10px] "
          onClick={add}
        >
          {loading ? <PulseLoader color="#ffffff" /> : "Add"}
        </button>
      </div>
    </>
  );
};

export default AddCourse;
