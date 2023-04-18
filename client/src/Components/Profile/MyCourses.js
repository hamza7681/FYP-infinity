import React, { useEffect, useState } from "react";
import { http } from "../../Axios/config";
import { useSelector } from "react-redux";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [defaultData, setDefault] = useState([]);
  const [categories, setCategories] = useState([]);
  const { token } = useSelector((s) => s.AuthReducer);
  const [show1, setShow1] = useState(false);
  const [inputFiltered, setInputFiltered] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await http.get("/course/courses-by-userId/" +id);
        setCourses(res.data);
        setDefault(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourses();
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    if (searchTerm === "") {
      setCourses(defaultData);
      setShow1(false);
    } else {
      setShow1(true);
      const filterArray = courses.filter((val) => {
        return val.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setInputFiltered(filterArray);
    }
  };

  const handleCategorySearch = (e) => {
    const searchItem = e.target.value;
    if (searchItem === "All Categories") {
      setCourses(defaultData);
      setShow1(false);
    } else {
      setShow1(true);
      const filterArray = courses.filter((val) => {
        return val.category._id === searchItem;
      });
      setInputFiltered(filterArray);
    }
  };

  const handlePriceRangeSearch = (e) => {
    const searchItem = e.target.value;
    const startValue = searchItem.slice(0, 5);
    const lastValue = searchItem.slice(6, 12);
    setShow1(true);
    const filterArray = courses.filter((val) => {
      return val.price >= Number(startValue) && val.price < Number(lastValue);
    });
    const newArray = filterArray.sort((a, b) => a.price - b.price);
    setInputFiltered(newArray);
  };

  const handleLanguageSearch = (e) => {
    const searchItem = e.target.value;
    setShow1(true);
    const filterArray = courses.filter((val) => {
      return val.language === searchItem;
    });
    setInputFiltered(filterArray);
  };

  return (
    <>
    </>
  );
};

export default MyCourses;
