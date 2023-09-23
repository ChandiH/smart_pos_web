import React, { useState, useEffect, useContext } from "react";
import Chart from "react-apexcharts";
import { getMonthlySale } from "../../services/reportService";
import UserContext from "./../../context/UserContext";

const MonthlySaleChart = ({ height, width, type = "area" }) => {
  const { currentUser } = useContext(UserContext);
  const [monthlySale, setMonthlySale] = useState([]);

  const saleChartOptions = {
    xaxis: {
      // categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      categories: new Array(31).fill(0).map((_, i) => i + 1),
    },
  };

  async function fetchMonthlySale(yearMonth) {
    try {
      const { data } = await getMonthlySale(yearMonth, currentUser.branch_id);
      let dayArray = Array.from({ length: 30 }, () => 0);
      data.forEach((item) => {
        dayArray[item.day.slice(8, 10) - 1] = item.total_sales;
      });
      return dayArray;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const august = await fetchMonthlySale("2023-08");
      const july = await fetchMonthlySale("2023-09");
      const june = await fetchMonthlySale("2023-06");
      setMonthlySale({ august, july, june });
    };
    fetchData();
  }, []);

  const saleSeries = [
    {
      name: "July",
      month: 7,
      data: monthlySale.july,
    },
    {
      name: "August",
      month: 8,
      data: monthlySale.august,
    },
    {
      name: "September",
      month: 9,
      data: monthlySale.september,
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
