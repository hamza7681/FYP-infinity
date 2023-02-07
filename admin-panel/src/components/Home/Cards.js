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

function CustomTooltip({ payload, label, active }) {
  if (active) {
    return <div style={{ fontSize: "12px" }}>{payload[0].value}</div>;
  }
  return null;
}

const Cards = ({ data, newData }) => {
  return (
    <div className=" relative w-[400px] bg-gradient-to-r from-blue-500 to-blue-800 p-[15px] rounded-[7px] overflow-hidden">
      <div className="absolute top-[10px] ">
        <p className="text-white text-[22px] font-semibold">47</p>
        <p className="text-white text-[22px]" >Total {data.name}</p>
      </div>
      <div className="relative bottom-[-49px] left-[-80px] w-full">
        <ResponsiveContainer width={470} height={150}>
          <AreaChart data={newData}>
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
              fill="#3b8ff5"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Cards;
