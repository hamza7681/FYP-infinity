import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Sales, userStats } from "../../helpers/userStats";

function CustomTooltip({ payload, label, active }) {
  if (active) {
    return <div style={{ fontSize: "12px" }}>{payload[0].value}</div>;
  }
  return null;
}

const Stats = () => {
  let date = new Date();
  date.setDate(date.getDate() - 30);
  let newDateDay = date.getDate();
  let newDateMonth = date.toLocaleString("default", { month: "long" });
  let newYear = date.getFullYear();
  const final = newDateDay + " " + newDateMonth + " " + newYear;
  const { users, tutors } = userStats;
  const data = users.data.map((user, index) => ({
    date: user.date,
    users: user.qty,
    tutors: tutors.data[index].qty,
  }));

  

  return (
    <>
      <div className="flex flex-row justify-between w-full my-[20px] gap-4">
        <div className="w-3/5 bg-[#39405a] rounded-[7px] h-auto relative overflow-hidden flex flex-col">
          <div className="border-b-[1px] p-[20px] border-b-gray-500">
            <p className="text-white text-[18px]  ">User Statistics</p>
          </div>
          <div className="flex justify-center items-center relative left-[-30px] py-[20px]">
            <ResponsiveContainer width="100%" height={450}>
              <AreaChart data={data}>
                <CartesianGrid stroke="none" />
                <XAxis
                  dataKey="date"
                  tickSize={12}
                  tickLine={false}
                  tick={{ fill: "#d4cecb", fontSize: "12px" }}
                />
                <YAxis
                  tickSize={12}
                  tickLine={false}
                  tick={{ fill: "#d4cecb", fontSize: "12px" }}
                />
                <Tooltip
                  wrapperStyle={{
                    border: "none",
                    outline: "none",
                    opacity: 0.6,
                  }}
                  content={({ payload, label }) => (
                    <div
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                      }}
                    >
                      <p>{label}</p>
                      {payload.map((entry, index) => (
                        <p key={`item-${index}`} style={{ color: entry.color }}>
                          {entry.dataKey}: {entry.value}
                        </p>
                      ))}
                    </div>
                  )}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#3f83f2"
                  fill="#08419e"
                />
                <Area
                  type="monotone"
                  dataKey="tutors"
                  stroke="#faae7f"
                  fill="#e07736"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center items-center my-[20px]">
            <div className="flex flex-row justify-around w-[300px]">
              <div className="flex flex-row gap-3">
                <div className="bg-[#08419e] w-[20px] h-[20px] rounded-full "></div>
                <p className="text-white">Students</p>
              </div>
              <div className="flex flex-row gap-3">
                <div className="bg-[#e07736] w-[20px] h-[20px] rounded-full"></div>
                <p className="text-white">Tutors</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/5 flex flex-col gap-4">
          <div className="bg-[#9264e8] rounded-[7px] w-[482px] h-[250px] overflow-hidden">
            <div className="p-[15px]">
              <p className="text-white text-[18px]">
                Total Courses Sold Per Month
              </p>
              <span className="text-white text-[13px]">Today - {final}</span>
            </div>
            <div className="relative left-[-70px] top-[3px]  w-full">
              <ResponsiveContainer width={555} height={200}>
                <AreaChart data={Sales}>
                  <CartesianGrid stroke="none" />
                  <XAxis dataKey="date" tick={false} axisLine={false} />
                  <YAxis tick={false} axisLine={false} />
                  <Tooltip
                    wrapperStyle={{
                      border: "none",
                      outline: "none",
                      width: "20px",
                      height: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "white",
                      borderRadius: "25px",
                    }}
                    labelStyle={{ display: "none" }}
                    content={<CustomTooltip />}
                  />
                  <Area
                    type="monotone"
                    dataKey="qty"
                    stroke="#ffffff"
                    fill="#b392f0"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-600 to-blue-900 flex justify-center items-center py-[30px] rounded-[7px] flex-col">
            <p className="text-white text-[22px] font-semibold">
              Total Courses
            </p>
            <p className="text-[42px] text-white">1</p>
          </div>
          <div className="bg-gradient-to-r from-green-600 to-green-900 flex justify-center items-center py-[30px] rounded-[7px] flex-col">
            <p className="text-white text-[22px] font-semibold">
              Total Feedbacks
            </p>
            <p className="text-[42px] text-white">30+</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stats;
