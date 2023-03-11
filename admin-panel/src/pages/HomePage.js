import React, { useEffect, useState } from "react";
import Intro from "../components/Home/Intro";
import Stats from "../components/Home/Stats";
import { useSelector } from "react-redux";
import { http } from "../axios/config";

const HomePage = () => {
  const { token } = useSelector((s) => s.AuthReducer);
  const [data, setData] = useState({});
  useEffect(() => {
    if (token) {
      const getDashboard = async () => {
        const res = await http.get("/auth/dashboard");
        setData(res.data);
      };
      getDashboard();
    }
  }, [token]);
  return (
    <>
      <div className=" w-full pl-[60px]">
        <Intro data={data && data} />
        <Stats data={data && data} />
      </div>
    </>
  );
};

export default HomePage;
