import React from "react";
import Chart from "react-apexcharts";

const MonthlySaleChart = ({ height, width, type = "area" }) => {
  const saleChartOptions = {
    xaxis: {
      // categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      categories: new Array(30).fill(0).map((_, i) => i + 1),
    },
  };

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const saleSeries = [
    {
      name: "June",
      month: 6,
      data: Array.from({ length: 30 }, () => getRandomNumber(0, 100)),
    },
    {
      name: "July",
      month: 7,
      data: Array.from({ length: 30 }, () => getRandomNumber(0, 100)),
    },
    {
      name: "August",
      month: 8,
      data: Array.from({ length: 30 }, () => getRandomNumber(0, 100)),
    },
  ];
  return (
    <Chart
      options={saleChartOptions}
      series={saleSeries}
      type={type}
      height={height}
      width={width}
    />
  );
};

export default MonthlySaleChart;
