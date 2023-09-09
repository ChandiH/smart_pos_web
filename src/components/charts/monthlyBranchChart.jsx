import React from "react";
import Chart from "react-apexcharts";

const MonthlyBranchChart = ({ height, width, type = "bar" }) => {
  const branchChartOptions = {
    xaxis: {
      // categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      categories: ["Moratuwa", "Colombo-6", "Anuradhapura"],
    },
  };
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const branchSeries = [
    {
      name: "June",
      month: 6,
      data: Array.from({ length: 3 }, () => getRandomNumber(0, 10)),
    },
    {
      name: "July",
      month: 7,
      data: Array.from({ length: 3 }, () => getRandomNumber(0, 100)),
    },
    {
      name: "August",
      month: 8,
      data: Array.from({ length: 3 }, () => getRandomNumber(0, 100)),
    },
  ];
  return (
    <Chart
      options={branchChartOptions}
      series={branchSeries}
      type={type}
      height={height}
      width={width}
    />
  );
};

export default MonthlyBranchChart;
