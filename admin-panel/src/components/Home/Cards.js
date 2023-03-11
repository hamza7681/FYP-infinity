import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const Cards = ({ data, tooltipTitle,title,subTitle }) => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        type: "line",
        height: 140,
        colors:['#ffffff'],
        toolbar: {
          show: false,
        },
      },

      grid: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        show: false,
        type: "datetime",
        categories: [],
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          datetimeFormatter: {
            year: "yyyy",
            month: "MMM 'yy",
            day: "dd MMM",
          },
        },
      },
      yaxis: {
        show: false,
        title: {
          text: "Count",
        },
      },
      stroke: {
        curve: "smooth",
        width: 4,
        colors: ["#57f2cb"],
      },
    },

    series: [
      {
        name: tooltipTitle,
        data: [],
      },
    ],
  });

  useEffect(() => {
    const formattedData = data?.map((item) => ({
      x: new Date(item.createdAt).getTime(),
      y: item.count,
    }));

    const categories = [];

    let currentDate = new Date("2023-01-01");

    while (currentDate <= new Date()) {
      categories.push(currentDate.getTime());
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setChartData({
      ...chartData,
      dataLabels: { enabled: false },
      options: {
        ...chartData.options,
        xaxis: {
          ...chartData.options.xaxis,
          categories: categories,
        },
      },
      series: [
        {
          ...chartData.series[0],
          data: formattedData,
        },
      ],
    });
  }, [chartData, data]);

  return (
    <div className=" relative w-[400px] bg-gradient-to-r from-blue-500 to-blue-800 p-[15px] rounded-[7px] overflow-hidden">
      <div>
        <p className="text-white text-[24px]">{title}</p>
        <p className="text-gray-300 text-[14px]" >{subTitle}</p>
      </div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={140}
      />
    </div>
  );
};

export default Cards;
