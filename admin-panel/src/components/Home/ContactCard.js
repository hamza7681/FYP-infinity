import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const ContactCard = ({ data }) => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        type: "line",
        height: 140,
        colors: ["#ffffff"],
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
        name: "Courses",
        data: [],
      },
    ],
  });

  useEffect(() => {
    const formattedData = data?.contacts?.map((item) => ({
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

  const TotalCount = () => {
    const totalCount = data?.contacts?.reduce((total, currentValue) => {
      return total + currentValue.count;
    }, 0);
    return totalCount;
  };

  return (
    <div className=" relative w-full bg-gradient-to-r from-green-500 to-green-800 p-[15px] rounded-[7px] overflow-hidden">
      <div className="flex flex-row justify-between items-center">
        <div>
          <p className="text-white text-[24px]">Total visitors contacted us</p>
          <p className="text-gray-300 text-[14px]">Contacts per year</p>
        </div>
        <p className="text-[32px] text-white pr-[30px]">
          <TotalCount />
        </p>
      </div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={100}
      />
    </div>
  );
};

export default ContactCard;
