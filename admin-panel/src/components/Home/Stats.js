import React from "react";
import Chart from "react-apexcharts";

const Stats = ({ data }) => {
  const studentSeries = data?.students?.map(({ count, createdAt }) => ({
    x: new Date(createdAt).getTime(),
    y: count,
  }));
  const tutorSeries = data?.tutors?.map(({ count, createdAt }) => ({
    x: new Date(createdAt).getTime(),
    y: count,
  }));

  const chartOptions = {
    chart: {
      type: "line",
    },
    xaxis: {
      type: "datetime",
      labels: {
        style: {
          colors: "#FFFFFF", // set color of x-axis labels to white
        },
      },
      axisBorder: {
        show: true,
      },
    },
    yaxis: {
      title: {
        text: "Number of students/tutors",
        style:{
          color:'#ffffff'
        }
      },
      labels: {
        style: {
          colors: "#FFFFFF", // set color of x-axis labels to white
        },
      },
    
    },
    grid: {
      show: false,
    },
    stroke: {
      curve: "smooth",
      width: 4,
    },
  };

  const series = [
    {
      name: "Students",
      data: studentSeries,
    },
    {
      name: "Tutors",
      data: tutorSeries,
    },
  ];
  return (
    <>
      <div className="flex flex-row justify-between w-full my-[20px] gap-4">
        <div className="w-3/5 bg-[#39405a] rounded-[7px] h-auto relative overflow-hidden flex flex-col">
          <div className="border-b-[1px] p-[20px] border-b-gray-500">
            <p className="text-white text-[18px]  ">User Statistics</p>
          </div>
          <div>
            <Chart
              options={chartOptions}
              series={series}
              type="line"
              height={350}
            />
          </div>
        </div>
        <div className="w-2/5 flex flex-col gap-4"></div>
      </div>
    </>
  );
};

export default Stats;
